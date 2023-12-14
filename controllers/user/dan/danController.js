
const { client } = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

const { convertAdToGeoJSON, convertReportToGeoJSON, getReportStatus, getAdInfo } = require('./sideFunctions.js')
const mappingRegion = require('../../mappingRegion.js')
const reverseGeocoding = require('../../reverseGeocoding.js')

const controller = {}

// Hàm lấy danh sách các địa điểm quảng cáo và chuyền về dạng GeoJSON
controller.getAdLocationGeoJSONList = async (req, res) => {
    try {
        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');
        const adsCollection = db.collection('ads');

        const adLocationDocs = await adLocationsCollection.find().toArray();

        const adLocationPromises = adLocationDocs.map(async (adLocationData) => {
            let numberOfReports = adLocationData.reportId == "" ? 0 : 1;

            if (adLocationData.adList && adLocationData.adList.length > 0) {
                const adPromises = adLocationData.adList.map(async (ad) => {
                    const adDoc = await adsCollection.findOne({ adId: ad.adId });
                    numberOfReports += adDoc && adDoc.reportId !== "" ? 1 : 0;
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
controller.getReportGeoJSONList = async (req, res) => {
    try {
        const db = client.db(dbName);
        const reportsCollection = db.collection('reports');

        const reportQuery = { reportType: 'ddbk' };
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
            console.log("Location status:", adLocationData.locationStatus);
        }

        if (adLocationData.adList && adLocationData.adList.length > 0) {
            // Sử dụng Promise.all để thực hiện nhiều truy vấn cùng một lúc
            const adListPromises = adLocationData.adList.map(async (ad, i) => {
                adLocationData.adList[i] = await getAdInfo(ad.adId);
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
    res.json({
        message: "getAdInfoById 🐭"
    })
}

controller.getReportInfoById = async (req, res) => {
    res.json({
        message: "getReportInfoById 🐭"
    })
}

controller.getReportLength = async (req, res) => {
    res.json({
        message: "getReportLength 🐭"
    })
}

controller.getReportList = async (req, res) => {
    res.json({
        message: "getReportList 🐭"
    })
}

module.exports = controller;
