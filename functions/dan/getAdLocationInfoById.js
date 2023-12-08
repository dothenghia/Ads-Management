// @ Hàm lấy Thông tin địa điểm quảng cáo theo locationId ##########

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

async function getAdInfo(adId) {
    const adsCollection = collection(db, "ads");
    const adQuery = query(adsCollection, where("adId", "==", adId));
    const adDocs = await getDocs(adQuery);

    if (adDocs.empty) { console.log("Không tìm thấy ad với adId:", adId); return null; }

    const adData = adDocs.docs[0].data();
    return adData;
}

async function getAdLocationInfoById(locaId) {
    const adLocationsCollection = collection(db, "adLocations");

    try {
        const adLocationQuery = query(adLocationsCollection, where("locationId", "==", locaId));
        const adLocationDocs = await getDocs(adLocationQuery);

        if (adLocationDocs.empty) { console.log("Không tìm thấy địa điểm quảng cáo với locationId:", locaId); return null; }

        const adLocationData = adLocationDocs.docs[0].data();
        adLocationData.numberOfReports = adLocationData.reportId == "" ? 0 : 1;
        adLocationData.locationStatus = "";
        let {quan, phuong} = mappingRegion(adLocationData.idQuan, adLocationData.idPhuong);
        adLocationData.quan = quan;
        adLocationData.phuong = phuong;

        if (adLocationData.reportId != "") {
            adLocationData.locationStatus = await getReportStatus(adLocationData.reportId);
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

        // console.log("Location Data:", adLocationData);
        return adLocationData;
    }
    catch (error) {
        console.error("Error getting documents:", error);
    }
}

export default getAdLocationInfoById;
