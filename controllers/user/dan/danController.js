
const { client } = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

const { convertAdToGeoJSON,
    convertReportToGeoJSON,
    getReportStatus,
    getAdInfo,
    qcReportInfo,
    ddqcReportInfo,
    ddbkReportInfo } = require('./sideFunctions.js')
const mappingRegion = require('../../mappingRegion.js')
const reverseGeocoding = require('../../reverseGeocoding.js')
const formatDate = require('./formatDate.js')

const controller = {}

// ~ ============== Done
controller.uploadData = async (req, res) => {
    try {
        let jsonData = req.body;

        // Chuyển đổi reportId, latitude, longitude thành kiểu số
        jsonData.reportId = parseInt(jsonData.reportId);
        jsonData.latitude = parseFloat(jsonData.latitude);
        jsonData.longitude = parseFloat(jsonData.longitude);

        // Chuyển đổi time thành kiểu date
        jsonData.time = new Date(jsonData.time);

        await client.db(dbName).collection("reports").updateOne(
            { _id: jsonData.reportId },
            { $set: jsonData },
            { upsert: true }
        );

        res.status(200).send(jsonData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


// ~ ============== Done
// Hàm lấy danh sách các địa điểm quảng cáo và chuyền về dạng GeoJSON
controller.getAdLocationGeoJSONList = async (req, res) => {
    try {
        let localStorageReportList = req.body.map(item => parseFloat(item));
        // console.log("localStorageReportList:", localStorageReportList);


        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');
        const adsCollection = db.collection('ads');

        // Lấy tất cả các documents trong collection 'adLocations'
        const adLocationDocs = await adLocationsCollection.find().toArray();

        // Sử dụng Promise.all để thực hiện nhiều truy vấn cùng một lúc
        const adLocationPromises = adLocationDocs.map(async (adLocationData) => {
            // Đếm số lượng reports của adLocation
            let numberOfReports = 0;
            let adLocationStatus = await getReportStatus(adLocationData.reportId, localStorageReportList)
            if (adLocationStatus !== null) {
                numberOfReports = 1;
            }

            if (adLocationData.adList && adLocationData.adList.length > 0) {
                const adPromises = adLocationData.adList.map(async (ad) => {
                    const adDoc = await adsCollection.findOne({ adId: ad.adId });
                    let adStatus = await getReportStatus(adDoc.reportId, localStorageReportList)
                    if (adStatus !== null) {
                        numberOfReports++;
                    }
                });

                await Promise.all(adPromises);
            }

            return { ...adLocationData, numberOfReports };
        });

        const results = await Promise.all(adLocationPromises);

        const adLocationGeoJSONList = results.map(ad => convertAdToGeoJSON(ad));
        res.json(adLocationGeoJSONList);

    }
    catch (error) {
        console.error("Error getting documents:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Hàm lấy danh sách các địa điểm bị báo cáo và chuyền về dạng GeoJSON
// => Khi fetch về thì chỉ lấy những cái là 'Từ chối' & 'Đã xử lý'
// & Những cái có delete = false
// & những cái reportId trong local storage đã gửi
// ~ ============== Done
controller.getReportGeoJSONList = async (req, res) => {
    try {
        const db = client.db(dbName);
        const reportsCollection = db.collection('reports');

        const reportQuery = {
            reportType: 'ddbk',
        };

        const reportDocs = await reportsCollection.find(reportQuery).toArray();

        const reportLocationGeoJSONList = [];

        for (const reportData of reportDocs) {
            const geoJSON = await convertReportToGeoJSON(reportData);
            geoJSON && reportLocationGeoJSONList.push(geoJSON);
        }

        res.json(reportLocationGeoJSONList);
    }
    catch (error) {
        console.error("Error getting documents:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


controller.getAdLocationInfoById = async (req, res) => {
    const locaId = parseInt(req.params.locaId);

    try {
        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');

        // Truy vấn đến document có locationId tương ứng
        const adLocationQuery = { locationId: locaId };
        const adLocationData = await adLocationsCollection.findOne(adLocationQuery);

        if (!adLocationData) {
            console.log("Không tìm thấy địa điểm quảng cáo với locationId:", locaId);
            return res.status(404).json({ error: "Không tìm thấy địa điểm quảng cáo." });
        }

        adLocationData.numberOfReports = adLocationData.reportId == "" ? 0 : 1;
        adLocationData.locationStatus = "";
        const { quan, phuong } = mappingRegion(adLocationData.idQuan, adLocationData.idPhuong);
        adLocationData.quan = quan;
        adLocationData.phuong = phuong;

        if (adLocationData.reportId != "") {
            adLocationData.locationStatus = await getReportStatus(adLocationData.reportId);
        }

        if (adLocationData.adList && adLocationData.adList.length > 0) {
            // Sử dụng Promise.all để thực hiện nhiều truy vấn cùng một lúc
            const adListPromises = adLocationData.adList.map(async (ad, i) => {
                adLocationData.adList[i] = await getAdInfo(ad.adId);
                adLocationData.adList[i].contractStartDate = formatDate(adLocationData.adList[i].contractStartDate);
                adLocationData.adList[i].contractEndDate = formatDate(adLocationData.adList[i].contractEndDate);
                adLocationData.adList[i].adStatus = "";
                if (adLocationData.adList[i].reportId != "") {
                    adLocationData.numberOfReports++;
                    adLocationData.adList[i].adStatus = await getReportStatus(adLocationData.adList[i].reportId);
                }
            });

            await Promise.all(adListPromises);
        }

        return res.status(200).json(adLocationData);
    }
    catch (error) {
        console.error("Error getting ad location information:", error);
        return res.status(500).json({ error: "Lỗi khi lấy thông tin địa điểm quảng cáo." });
    }
}

controller.getAdInfoById = async (req, res) => {
    let { locationId, adId } = req.query; // Lấy tham số từ URL query string
    locationId = parseInt(locationId);
    adId = parseInt(adId);

    try {
        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');
        const adsCollection = db.collection('ads');

        // Truy vấn đến document của adLocation có locationId tương ứng
        const adLocationQuery = { locationId: locationId };
        const adLocationData = await adLocationsCollection.findOne(adLocationQuery);

        if (!adLocationData) {
            console.log("Không tìm thấy địa điểm quảng cáo với locationId:", locationId);
            return res.status(404).json({ error: "Không tìm thấy địa điểm quảng cáo." });
        }

        // Truy vấn đến document của ad có adId tương ứng
        const adQuery = { adId: adId };
        const adData = await adsCollection.findOne(adQuery);

        if (!adData) {
            console.log("Không tìm thấy ad với adId:", adId);
            return res.status(404).json({ error: "Không tìm thấy quảng cáo." });
        }

        if (adData.reportId != "") {
            adData.adStatus = await getReportStatus(adData.reportId);
        }

        const { phuong, quan } = mappingRegion(adLocationData.idQuan, adLocationData.idPhuong);

        const result = {
            adId: adData.adId,
            locationId: adLocationData.locationId,
            address: adLocationData.address,
            quan: quan,
            phuong: phuong,
            name: adData.name,
            adType: adLocationData.adType,
            adForm: adLocationData.adForm,
            locationType: adLocationData.locationType,
            contractStartDate: formatDate(adData.contractStartDate),
            contractEndDate: formatDate(adData.contractEndDate),
            size: adData.size,
            thumbnails: adData.thumbnails,
            adStatus: adData.adStatus || "",
            reportId: adData.reportId,
        };

        return res.status(200).json(result);
    }
    catch (error) {
        console.error("Error getting ad information by Id:", error);
        return res.status(500).json({ error: "Lỗi khi lấy thông tin quảng cáo." });
    }
}

controller.getReportInfoById = async (req, res) => {
    const rpId = parseInt(req.params.rpId);

    try {
        const db = client.db(dbName);
        const reportsCollection = db.collection('reports');
        const reportQuery = { reportId: rpId };
        const reportDocs = await reportsCollection.findOne(reportQuery);

        if (!reportDocs) {
            console.log("Không tìm thấy report với reportId:", rpId);
            return res.status(404).json({ message: "Report not found" });
        }

        const reportData = reportDocs;

        // Nếu là báo cáo về QUẢNG CÁO
        if (reportData.reportType == 'qc') {
            const { name, address, phuong, quan } = await qcReportInfo(reportData.locationId, reportData.adId);

            return res.json({
                ...reportData,
                time: formatDate(reportData.time),
                name,
                address,
                phuong,
                quan,
            });
        }
        // Nếu là báo cáo về ĐỊA ĐIỂM QUẢNG CÁO
        else if (reportData.reportType == 'ddqc') {
            const { name, address, phuong, quan } = await ddqcReportInfo(reportData.locationId);

            return res.json({
                ...reportData,
                time: formatDate(reportData.time),
                name,
                address,
                phuong,
                quan,
            });
        }
        // Nếu là báo cáo về ĐỊA ĐIỂM BẤT KỲ
        else if (reportData.reportType == 'ddbk') {
            const { name, address, phuong, quan } = await ddbkReportInfo(reportData.longitude, reportData.latitude);

            return res.json({
                ...reportData,
                time: formatDate(reportData.time),
                name,
                address,
                phuong,
                quan,
            });
        }

        return res.json(reportData);
    }
    catch (error) {
        console.error("Error getting report information:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// ~ ============== Done
controller.getReportLength = async (req, res) => {
    try {
        const db = client.db(dbName);
        const reportsCollection = db.collection('reports');

        // Lấy số lượng documents trong collection 'reports'
        const reportLength = await reportsCollection.countDocuments();

        return res.json({ reportLength });
    }
    catch (error) {
        console.error("Lỗi khi lấy số lượng documents:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// ~ ============== Done
controller.getReportList = async (req, res) => {
    try {
        const db = client.db(dbName);
        const reportsCollection = db.collection('reports');

        const reportQuery = {};

        const reportDocs = await reportsCollection.find(reportQuery).toArray();

        const detailedReports = await Promise.all(reportDocs.map(async (reportData) => {
            if (reportData.reportType === 'qc') {
                return {
                    ...reportData,
                    time: formatDate(reportData.time),
                    ...(await qcReportInfo(reportData.locationId, reportData.adId)),
                };
            } else if (reportData.reportType === 'ddqc') {
                return {
                    ...reportData,
                    time: formatDate(reportData.time),
                    ...(await ddqcReportInfo(reportData.locationId)),
                };
            } else if (reportData.reportType === 'ddbk') {
                return {
                    ...reportData,
                    time: formatDate(reportData.time),
                    ...(await ddbkReportInfo(reportData.longitude, reportData.latitude)),
                };
            }

            return reportData;
        }));

        return res.json(detailedReports);
    }
    catch (error) {
        console.error("Lỗi khi lấy danh sách chi tiết reports:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = controller;
