
const mappingRegion = require('../../mappingRegion.js')
const reverseGeocoding = require('../../reverseGeocoding.js')
const { client } = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

const controller = {}


// ========== Lấy danh sách ĐỊA ĐIỂM QUẢNG CÁO tại Phường đó (Dạng GeoJSON)
controller.ddqc = async (req, res) => {
    let { idPhuongQuery, idQuanQuery } = req.query; // Lấy tham số từ URL query string

    try {
        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');
        const adsCollection = db.collection('ads');

        // Lấy tất cả các documents trong collection 'adLocations'
        const adLocationDocs = await adLocationsCollection.find({ idPhuong: idPhuongQuery, idQuan: idQuanQuery }).toArray();

        // Sử dụng Promise.all để thực hiện nhiều truy vấn cùng một lúc
        const adLocationPromises = adLocationDocs.map(async (adLocationData) => {
            // Đếm số lượng reports của adLocation
            let numberOfReports = 0;
            let numberOfAds = 0;
            let adLocationStatus = await getReportStatus(adLocationData.reportId)
            if (adLocationStatus !== null) {
                numberOfReports = 1;
            }

            if (adLocationData.adList && adLocationData.adList.length > 0) {
                const adPromises = adLocationData.adList.map(async (ad) => {
                    const adDoc = await adsCollection.findOne({ adId: ad.adId });

                    // Kiểm tra hợp lệ của contractStartDate và contractEndDate
                    if (adDoc.contractStartDate <= new Date() && adDoc.contractEndDate >= new Date()) {
                        numberOfAds++;
                        let adStatus = await getReportStatus(adDoc.reportId);
                        if (adStatus !== null) {
                            numberOfReports++;
                        }
                    }
                });

                await Promise.all(adPromises);
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


// ========== Lấy danh sách ĐỊA ĐIỂM BÁO CÁO BẤT KỲ tại Phường đó (Dạng GeoJSON)
controller.ddbcbk = async (req, res) => {
    res.json({
        message: "ddbcbk"
    })
}

module.exports = controller;


// ========== Hàm chuyển đổi adLocation thành dạng GeoJSON
function convertAdToGeoJSON(adLocation) {
    // console.log(adLocation)
    let { quan, phuong } = mappingRegion(adLocation.idQuan, adLocation.idPhuong);

    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [adLocation.longitude, adLocation.latitude]
        },
        properties: {
            locationId: adLocation.locationId,
            planning: adLocation.planning,
            address: adLocation.address,
            idQuan: adLocation.idQuan,
            idPhuong: adLocation.idPhuong,
            adType: adLocation.adType,
            numberOfAds: adLocation.numberOfAds,
            locationType: adLocation.locationType,
            quan,
            phuong,

            numberOfReports: adLocation.numberOfReports,

            markerType: 'Ad' // Thêm cái này để filter marker trên map
        }
    };
}


// ========== Hàm lấy status của report theo reportId
async function getReportStatus(reportId) {
    try {
        if (!reportId) return null;

        const db = client.db(dbName);
        const reportsCollection = db.collection('reports');
        const reportData = await reportsCollection.findOne({ reportId: reportId });

        if (!reportData) { console.log("Không tìm thấy report với reportId:", reportId); return null; }

        return reportData.status;
    }
    catch (error) {
        console.error("Lỗi lấy report status:", error);
        return null;
    }
}
