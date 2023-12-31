
const mappingRegion = require('../../mappingRegion.js')
const reverseGeocoding = require('../../reverseGeocoding.js')
const { client } = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

const controller = {}


// ========== Lấy danh sách ĐỊA ĐIỂM QUẢNG CÁO tại Phường đó (Dạng GeoJSON)
controller.ddqc = async (req, res) => {
    let { idQuanQuery } = req.query; // Lấy tham số từ URL query string

    try {
        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');
        const adsCollection = db.collection('ads');

        // Lấy tất cả các documents trong collection 'adLocations'
        const adLocationDocs = await adLocationsCollection.find({ idQuan: idQuanQuery }).toArray();

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


module.exports = controller;


// ! ========== NHỮNG HÀM HỖ TRỢ ==========
// ========== Hàm chuyển đổi adLocation thành dạng GeoJSON
function convertAdToGeoJSON(adLocation) {
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

// ========== Hàm chuyển đổi dữ liệu Report thành dạng GeoJSON
async function convertReportToGeoJSON(report) {
    try {
        const reverseLocation = await reverseGeocoding(report.longitude, report.latitude);

        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [report.longitude, report.latitude]
            },
            properties: {
                reportId: report.reportId,
                reportForm: report.reportForm,
                status: report.status,
                name: reverseLocation.name,
                phuong: reverseLocation.phuong,
                quan: reverseLocation.quan,

                markerType: 'Report' // Thêm cái này để filter marker trên map
            }
        };
    }
    catch (error) {
        console.error('Error in reverseGeocoding:', error);
        return null;
    }
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

// ========== Hàm format ngày tháng năm
function formatDate(mongoDate) {
    const date = new Date(mongoDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();

    return `Ngày ${day} tháng ${month} năm ${year}`;
}

// ========== Hàm lấy thông tin của ad theo adId
async function getAdInfo(adId) {
    try {
        const db = client.db('Ads-Management');
        const adsCollection = db.collection('ads');

        // Truy vấn đến document có adId tương ứng
        const adQuery = { adId: adId };
        const adData = await adsCollection.findOne(adQuery);

        if (!adData) {
            console.log("Không tìm thấy ad với adId:", adId);
            return null;
        }

        return adData;
    } catch (error) {
        console.error("Error getting ad information:", error);
        return null;
    }
}
