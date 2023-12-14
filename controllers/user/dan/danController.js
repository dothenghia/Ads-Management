
const { client } = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

const { convertAdToGeoJSON, convertReportToGeoJSON } = require('./sideFunctions.js')

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
    res.json({
        message: "getAdLocationInfoById 🐭"
    })
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
