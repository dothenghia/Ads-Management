
const { client } = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

const { convertAdToGeoJSON,
    convertReportToGeoJSON,
    getAdLocationStatus,
    getAdStatus,
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
        jsonData.latitude = jsonData.latitude == "" ? "" : parseFloat(jsonData.latitude);
        jsonData.longitude = jsonData.longitude == "" ? "" : parseFloat(jsonData.longitude);
        jsonData.locationId = jsonData.locationId == "" ? "" : parseFloat(jsonData.locationId);
        jsonData.adId = jsonData.adId == "" ? "" : parseFloat(jsonData.adId);

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


// ~ ============== DONE
// Hàm lấy danh sách các địa điểm quảng cáo và chuyền về dạng GeoJSON
controller.getAdLocationGeoJSONList = async (req, res) => {
    try {
        const localStorageReportList = req.body.map(item => parseFloat(item));
        // console.log("localStorageReportList:", localStorageReportList);

        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');
        const adsCollection = db.collection('ads');
        const adLocationDocs = await adLocationsCollection.find().toArray();

        const adLocationPromises = adLocationDocs.map(async (adLocationData) => {
            let numberOfReports = 0;
            let numberOfAds = 0;

            const info = await getAdLocationStatus(adLocationData.locationId, localStorageReportList);
            const adLocationStatus = info ? info.status : null;
            if (adLocationStatus !== null) numberOfReports++;

            if (adLocationData.adList && adLocationData.adList.length > 0) {
                await Promise.all(adLocationData.adList.map(async (ad) => {
                    const adDoc = await adsCollection.findOne({ adId: ad.adId });

                    if (adDoc.contractStartDate <= new Date() && adDoc.contractEndDate >= new Date()) {
                        numberOfAds++;
                        const adInfo = await getAdStatus(adLocationData.locationId, ad.adId, localStorageReportList);
                        const adStatus = adInfo ? adInfo.status : null;
                        if (adStatus !== null) numberOfReports++;
                    }
                }));
            }

            return { ...adLocationData, numberOfReports, numberOfAds };
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
// ~ ============== DONE
controller.getReportGeoJSONList = async (req, res) => {
    try {
        const db = client.db(dbName);
        const reportsCollection = db.collection('reports');

        const reportDocs = await reportsCollection.find({ reportType: 'ddbk' }).toArray();

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
    const localStorageReportList = req.body.map(item => parseFloat(item));
    // console.log("localStorageReportList:", localStorageReportList);

    try {
        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');
        const adLocationData = await adLocationsCollection.findOne({ locationId: locaId });

        if (!adLocationData) { console.log("Không tìm thấy địa điểm quảng cáo với locationId:", locaId); return res.status(404).json({ error: "Không tìm thấy địa điểm quảng cáo." }); }

        const info = await getAdLocationStatus(adLocationData.locationId, localStorageReportList);
        adLocationData.locationStatus = info ? info.status : '';
        adLocationData.reportId = info ? info.reportId : '';

        const { phuong, quan } = mappingRegion(adLocationData.idQuan, adLocationData.idPhuong);
        adLocationData.phuong = phuong;
        adLocationData.quan = quan;

        adLocationData.newAdList = [];
        if (adLocationData.adList && adLocationData.adList.length > 0) {
            const adListPromises = adLocationData.adList.map(async (ad, i) => {
                adLocationData.adList[i] = await getAdInfo(ad.adId);

                // Kiểm tra hợp lệ của contractStartDate và contractEndDate
                if (adLocationData.adList[i].contractStartDate <= new Date() && adLocationData.adList[i].contractEndDate >= new Date()) {
                    adLocationData.adList[i].contractStartDate = formatDate(adLocationData.adList[i].contractStartDate);
                    adLocationData.adList[i].contractEndDate = formatDate(adLocationData.adList[i].contractEndDate);
                    let adInfo = await getAdStatus(adLocationData.locationId, ad.adId, localStorageReportList);
                    adLocationData.adList[i].adStatus = adInfo ? adInfo.status : '';
                    adLocationData.adList[i].reportId = adInfo ? adInfo.reportId : '';
                    adLocationData.newAdList.push(adLocationData.adList[i]);  // Thêm vào newAdList
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
    const localStorageReportList = req.body.map(item => parseFloat(item));

    try {
        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');
        const adsCollection = db.collection('ads');

        const adLocationData = await adLocationsCollection.findOne({ locationId: locationId });

        if (!adLocationData) { console.log("Không tìm thấy địa điểm quảng cáo với locationId:", locationId); return res.status(404).json({ error: "Không tìm thấy địa điểm quảng cáo." }); }

        const adData = await adsCollection.findOne({ adId: adId });

        if (!adData) { console.log("Không tìm thấy ad với adId:", adId); return res.status(404).json({ error: "Không tìm thấy quảng cáo." }); }

        const { phuong, quan } = mappingRegion(adLocationData.idQuan, adLocationData.idPhuong);

        const adInfo = await getAdStatus(adLocationData.locationId, adData.adId, localStorageReportList);

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
            adStatus: adInfo ? adInfo.status : '',
            reportId: adInfo ? adInfo.reportId : '',
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
