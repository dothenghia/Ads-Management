
const { client } = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

const { convertAdToGeoJSON, convertReportToGeoJSON } = require('./sideFunctions.js')

const controller = {}

// Danh sách các địa điểm quảng cáo và chuyền về dạng GeoJSON
controller.getAdLocationGeoJSONList = async (req, res) => {

    try {
        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');
        const adsCollection = db.collection('ads');

        // Lấy tất cả document của collection "adLocations"
        const adLocationDocs = await adLocationsCollection.find().toArray();

        // Lượt qua từng document
        const adLocationPromises = adLocationDocs.map(async (adLocationData) => {
            let numberOfReports = adLocationData.reportId == "" ? 0 : 1;

            // Nếu adLocationData.adList có dữ liệu
            if (adLocationData.adList && adLocationData.adList.length > 0) {
                // Thì Check reportId của của adId tương ứng
                // Sử dụng Promise.all để đợi tất cả các promise được giải quyết
                const adPromises = adLocationData.adList.map(async (ad) => {
                    const adDoc = await adsCollection.findOne({ adId: ad.adId });
                    // Nếu reportId != "" thì tăng numberOfReports
                    numberOfReports += adDoc && adDoc.reportId !== "" ? 1 : 0;
                });

                await Promise.all(adPromises);
            }

            return { ...adLocationData, numberOfReports };
        });

        const results = await Promise.all(adLocationPromises);

        // Chuyển đổi toàn bộ dữ liệu về định dạng JSON
        const adLocationGeoJSONList = results.map(ad => convertAdToGeoJSON(ad));
        res.json(adLocationGeoJSONList);
    } catch (error) {
        console.error("Error getting documents:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
























controller.getReportGeoJSONList = async (req, res) => {
    res.json({
        message: "getReportGeoJSONList 🐭"
    })
}


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
