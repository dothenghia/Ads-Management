// @ Hàm lấy Danh sách báo cáo ##########

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

    const { phuong, quan } = mappingRegion(adLocationData.idQuan, adLocationData.idPhuong);

    return {
        name: adData.name,
        address: adLocationData.address,
        phuong: phuong,
        quan: quan,
        longitude: adLocationData.longitude,
        latitude: adLocationData.latitude,
    }
}

async function ddqcReportInfo(locationId) {
    const adLocationsCollection = collection(db, "adLocations");
    const adLocationQuery = query(adLocationsCollection, where("locationId", "==", locationId));
    const adLocationDocs = await getDocs(adLocationQuery);

    if (adLocationDocs.empty) { console.log("Không tìm thấy địa điểm quảng cáo với locationId:", locationId); return null; }

    const adLocationData = adLocationDocs.docs[0].data();

    const { phuong, quan } = mappingRegion(adLocationData.idQuan, adLocationData.idPhuong);

    return {
        name: adLocationData.address,
        address: "",
        phuong: phuong,
        quan: quan,
        longitude: adLocationData.longitude,
        latitude: adLocationData.latitude,
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


async function getReportList() {
    try {
        const reportsCollection = collection(db, "reports");
        const reportDocs = await getDocs(reportsCollection);

        const detailedReports = await Promise.all(reportDocs.docs.map(async (reportDoc) => {
            const reportData = reportDoc.data();

            if (reportData.reportType === 'qc') {
                return {
                    ...reportData,
                    ...(await qcReportInfo(reportData.locationId, reportData.adId)),
                };
            } else if (reportData.reportType === 'ddqc') {
                return {
                    ...reportData,
                    ...(await ddqcReportInfo(reportData.locationId)),
                };
            } else if (reportData.reportType === 'ddbk') {
                return {
                    ...reportData,
                    ...(await ddbkReportInfo(reportData.longitude, reportData.latitude)),
                };
            }

            return reportData;
        }));

        // console.log("Danh sách chi tiết reports:", detailedReports);
        return detailedReports;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách chi tiết reports:", error);
        return null;
    }
}

export default getReportList;