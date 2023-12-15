const { client } = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

const mappingRegion = require('../../mappingRegion.js')
const reverseGeocoding = require('../../reverseGeocoding.js')

// Hàm chuyển đổi dữ liệu Ad thành GeoJSON
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
            numberOfAds: adLocation.adList.length,
            locationType: adLocation.locationType,
            quan,
            phuong,

            numberOfReports: adLocation.numberOfReports,

            markerType: 'Ad' // Thêm cái này để filter marker trên map
        }
    };
}

// Hàm chuyển đổi dữ liệu Report thành GeoJSON
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


async function getReportStatus(reportId) {
    try {
        const db = client.db('Ads-Management');
        const reportsCollection = db.collection('reports');

        // Truy vấn đến document có reportId tương ứng
        const reportQuery = { reportId: reportId };
        const reportData = await reportsCollection.findOne(reportQuery);

        if (!reportData) {
            console.log("Không tìm thấy report với reportId:", reportId);
            return null;
        }

        return reportData.status;
    } catch (error) {
        console.error("Error getting report status:", error);
        return null;
    }
}

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


async function qcReportInfo(locationId, adId) {
    try {
        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');
        const adsCollection = db.collection('ads');

        const adLocationQuery = { locationId: locationId };
        const adLocationData = await adLocationsCollection.findOne(adLocationQuery);

        if (!adLocationData) {
            console.log("Không tìm thấy địa điểm quảng cáo với locationId:", locationId);
            return null;
        }

        const adQuery = { adId: adId };
        const adData = await adsCollection.findOne(adQuery);

        if (!adData) {
            console.log("Không tìm thấy ad với adId:", adId);
            return null;
        }

        const { phuong, quan } = mappingRegion(adLocationData.idQuan, adLocationData.idPhuong);

        return {
            name: adData.name,
            address: adLocationData.address,
            phuong: phuong,
            quan: quan,
            longitude: adLocationData.longitude,
            latitude: adLocationData.latitude,
        };
    }
    catch (error) {
        console.error("Error getting QC report information:", error);
        return null;
    }
}

async function ddqcReportInfo(locationId) {
    try {
        const db = client.db(dbName);
        const adLocationsCollection = db.collection('adLocations');

        const adLocationQuery = { locationId: locationId };
        const adLocationData = await adLocationsCollection.findOne(adLocationQuery);

        if (!adLocationData) {
            console.log("Không tìm thấy địa điểm quảng cáo với locationId:", locationId);
            return null;
        }

        const { phuong, quan } = mappingRegion(adLocationData.idQuan, adLocationData.idPhuong);

        return {
            name: adLocationData.address,
            address: "",
            phuong: phuong,
            quan: quan,
            longitude: adLocationData.longitude,
            latitude: adLocationData.latitude,
        };
    }
    catch (error) {
        console.error("Error getting DDQC report information:", error);
        return null;
    }
}

async function ddbkReportInfo(longitude, latitude) {
    const reverseLocation = await reverseGeocoding(longitude, latitude);

    return {
        name: reverseLocation.name,
        address: "",
        phuong: reverseLocation.phuong,
        quan: reverseLocation.quan,
    }
}

module.exports = {
    convertAdToGeoJSON,
    convertReportToGeoJSON,
    getReportStatus,
    getAdInfo,
    qcReportInfo,
    ddqcReportInfo,
    ddbkReportInfo
}