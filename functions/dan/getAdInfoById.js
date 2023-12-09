// @ Hàm lấy thông tin bảng Quảng cáo theo locationId và adId ##########

import { db } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import mappingRegion from "./mappingRegion.js";

async function getReportStatus(reportId) {
    const reportsCollection = collection(db, "reports");
    const reportQuery = query(reportsCollection, where("reportId", "==", reportId));
    const reportDocs = await getDocs(reportQuery);

    if (reportDocs.empty) { console.log("Không tìm thấy report với reportId:", reportId); return null; }

    const reportData = reportDocs.docs[0].data();
    return reportData.status;
}

async function getAdInfoById(locationId, adId) {
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

    if (adData.reportId != "") {
        adData.adStatus = await getReportStatus(adData.reportId);
    }

    const { phuong, quan } = mappingRegion(adLocationData.idQuan, adLocationData.idPhuong);

    return {
        adId: adData.adId,
        locationId: adLocationData.locationId,
        address: adLocationData.address,
        quan: quan,
        phuong: phuong,
        name: adData.name,
        adType: adLocationData.adType,
        adForm: adLocationData.adForm,
        locationType: adLocationData.locationType,
        contractStartDate: adData.contractStartDate,
        contractEndDate: adData.contractEndDate,
        size: adData.size,
        thumbnails: adData.thumbnails,
        adStatus: adData.adStatus,
        reportId: adData.reportId,
    }
}

export default getAdInfoById;