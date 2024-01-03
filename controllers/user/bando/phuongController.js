
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
        const adLocationDocs = await adLocationsCollection.find({ idPhuong: idPhuongQuery, idQuan: idQuanQuery }).toArray();

        const adLocationPromises = adLocationDocs.map(async (adLocationData) => {
            let numberOfAds = 0;

            if (adLocationData.adList && adLocationData.adList.length > 0) {
                await Promise.all(adLocationData.adList.map(async (ad) => {
                    const adDoc = await adsCollection.findOne({ adId: ad.adId });

                    if (adDoc.contractStartDate <= new Date() && adDoc.contractEndDate >= new Date()) {
                        numberOfAds++;
                    }
                }));
            }
            return { ...adLocationData, numberOfAds };
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
// Cứ lấy về hết, Bên phía client sẽ filter theo tọa độ boundary của Phường đó
controller.ddbcbk = async (req, res) => {
    try {
        const db = client.db(dbName);
        const reportsCollection = db.collection('reports');

        const reportDocs = await reportsCollection.find({ reportType: 'ddbk', status: 'Đang xử lý' }).toArray();

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
}


// ========== Lấy thông tin ĐỊA ĐIỂM QUẢNG CÁO theo locationId
controller.getAdLocationInfoById = async (req, res) => {
    const locaId = parseInt(req.params.locaId);

    try {
        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');
        const adLocationData = await adLocationsCollection.findOne({ locationId: locaId });

        if (!adLocationData) { console.log("Không tìm thấy địa điểm quảng cáo với locationId:", locaId); return res.status(404).json({ error: "Không tìm thấy địa điểm quảng cáo." }); }

        const { quan, phuong } = mappingRegion(adLocationData.idQuan, adLocationData.idPhuong);
        adLocationData.quan = quan;
        adLocationData.phuong = phuong;
        
        adLocationData.newAdList = [];
        if (adLocationData.adList && adLocationData.adList.length > 0) {
            const adListPromises = adLocationData.adList.map(async (ad, i) => {
                adLocationData.adList[i] = await getAdInfo(ad.adId);

                // Kiểm tra hợp lệ của contractStartDate và contractEndDate
                if (adLocationData.adList[i].contractStartDate <= new Date() && adLocationData.adList[i].contractEndDate >= new Date()) {
                    adLocationData.adList[i].contractStartDate = formatDate(adLocationData.adList[i].contractStartDate);
                    adLocationData.adList[i].contractEndDate = formatDate(adLocationData.adList[i].contractEndDate);
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

    try {
        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');
        const adsCollection = db.collection('ads');

        const adLocationData = await adLocationsCollection.findOne({ locationId: locationId });

        if (!adLocationData) { console.log("Không tìm thấy địa điểm quảng cáo với locationId:", locationId); return res.status(404).json({ error: "Không tìm thấy địa điểm quảng cáo." }); }

        const adData = await adsCollection.findOne({ adId: adId });

        if (!adData) { console.log("Không tìm thấy ad với adId:", adId); return res.status(404).json({ error: "Không tìm thấy quảng cáo." }); }

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
        };

        return res.status(200).json(result);
    }
    catch (error) {
        console.error("Error getting ad information by Id:", error);
        return res.status(500).json({ error: "Lỗi khi lấy thông tin quảng cáo." });
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
