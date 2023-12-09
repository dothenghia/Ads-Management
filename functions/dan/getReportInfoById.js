// @ Hàm lấy Thông tin báo cáo theo reportId ##########

import { db } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import mappingRegion from "./mappingRegion.js";
import reverseGeocoding from "./reverseGeocoding.js";

async function qcReportInfo(locationId, adId) {
    const adLocationsCollection = collection(db, "adLocations");
    const adLocationQuery = query(adLocationsCollection, where("locationId", "==", locationId));
    const adLocationDocs = await getDocs(adLocationQuery);
    
    const adsCollection = collection(db, "ads");
    const adQuery = query(adsCollection, where("adId", "==", adId));
    const adDocs = await getDocs(adQuery);

    if (adLocationDocs.empty) { console.log("Không tìm thấy địa điểm quảng cáo với locationId:", locationId); return null; }
    if (adDocs.empty) { console.log("Không tìm thấy ad với adId:", adId); return null; }

    const adLocationData = adLocationDocs.docs[0].data();
    const adData = adDocs.docs[0].data();

    const {phuong, quan} = mappingRegion(adLocationData.idQuan, adLocationData.idPhuong);

    return {
        name: adData.name,
        address: adLocationData.address,
        phuong: phuong,
        quan: quan,
    }
}

async function ddqcReportInfo(locationId) {
    const adLocationsCollection = collection(db, "adLocations");
    const adLocationQuery = query(adLocationsCollection, where("locationId", "==", locationId));
    const adLocationDocs = await getDocs(adLocationQuery);

    if (adLocationDocs.empty) { console.log("Không tìm thấy địa điểm quảng cáo với locationId:", locationId); return null; }

    const adLocationData = adLocationDocs.docs[0].data();

    const {phuong, quan} = mappingRegion(adLocationData.idQuan, adLocationData.idPhuong);

    return {
        name: 'Chi tiết báo cáo địa điểm',
        address: adLocationData.address,
        phuong: phuong,
        quan: quan,
    }
}

async function ddbkReportInfo(longitude, latitude) {
    const reverseLocation = await reverseGeocoding(longitude, latitude);

    return {
        name: 'Chi tiết báo cáo địa điểm',
        address: reverseLocation.name,
        phuong: reverseLocation.phuong,
        quan: reverseLocation.quan,
    }
}

async function getReportInfoById(rpId) {
    const reportsCollection = collection(db, "reports");
    const reportQuery = query(reportsCollection, where("reportId", "==", rpId));
    const reportDocs = await getDocs(reportQuery);

    if (reportDocs.empty) { console.log("Không tìm thấy report với reportId:", rpId); return null; }

    const reportData = reportDocs.docs[0].data();

    // Nếu là báo cáo về QUẢNG CÁO
    if (reportData.reportType == 'qc') {
        const {name, address, phuong, quan} = await qcReportInfo(reportData.locationId, reportData.adId);

        return {
            ...reportData,
            name,
            address,
            phuong,
            quan,
        }
    }
    // Nếu là báo cáo về ĐỊA ĐIỂM QUẢNG CÁO
    else if (reportData.reportType == 'ddqc') {
        const {name, address, phuong, quan} = await ddqcReportInfo(reportData.locationId);

        return {
            ...reportData,
            name,
            address,
            phuong,
            quan,
        }
    }
    // Nếu là báo cáo về ĐỊA ĐIỂM BẤT KỲ
    else if (reportData.reportType == 'ddbk') {
        const {name, address, phuong, quan} = await ddbkReportInfo(reportData.longitude, reportData.latitude);

        return {
            ...reportData,
            name,
            address,
            phuong,
            quan,
        }
    }
    return reportData;
}

export default getReportInfoById;