
const adLocationsModel = require("../../../models/adLocationsModel.js");
const reportsModel = require("../../../models/reportsModel.js");
const adsModel = require("../../../models/adsModel.js");

const mappingRegion = require('../../mappingRegion.js')
const reverseGeocoding = require('../../reverseGeocoding.js')
const { client } = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

const controller = {}


// ========== Lấy danh sách ĐỊA ĐIỂM QUẢNG CÁO tại Phường đó (Dạng GeoJSON)
controller.ddqc = async (req, res) => {
    let { idQuanQuery } = req.query; // Lấy tham số từ URL query string

    try {
        const adLocationDocs = await adLocationsModel.find({ idQuan: idQuanQuery });

        const adLocationPromises = adLocationDocs.map(async (adLocationData) => {
            let numberOfAds = 0;

            if (adLocationData.adList && adLocationData.adList.length > 0) {
                await Promise.all(adLocationData.adList.map(async (ad) => {
                    const adDoc = await adsModel.findOne({ adId: ad.adId });

                    if (adDoc.contractStartDate <= new Date() && adDoc.contractEndDate >= new Date()) {
                        numberOfAds++;
                    }
                }));
            }
            return { ...adLocationData._doc, numberOfAds };
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
