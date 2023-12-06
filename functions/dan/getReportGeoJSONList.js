// @ Hàm lấy danh sách các địa điểm bị báo cáo và chuyền về dạng GeoJSON ##########

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import reverseGeocoding from "./reverseGeocoding.js";

// ========== Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCwBk70gZo4XITye1w7ffkjbkFbeRBHw8",
    authDomain: "firstproject-90f9e.firebaseapp.com",
    projectId: "firstproject-90f9e",
    storageBucket: "firstproject-90f9e.appspot.com",
    messagingSenderId: "502907593610",
    appId: "1:502907593610:web:6971222eb80fc8f4225e73",
    measurementId: "G-YNQP3S54HB"
};

// ========== Initialize Firebase 
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Hàm chuyển đổi dữ liệu Report thành GeoJSON
async function convertToGeoJSON(report) {
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

async function getReportGeoJSONList() {

    // Lấy collection "reports" và "ads"
    let reportsCollection = collection(db, "reports");

    try {
        // Lấy tất cả document của collection "reports"
        let reportQuery = query(reportsCollection, where("reportType", "==", 'ddbk'));
        let reportDocs = await getDocs(reportQuery);

        // Chuyển đổi toàn bộ dữ liệu về định dạng JSON
        const reportLocationGeoJSONList = []

        for (const reportDoc of reportDocs.docs) {
            const reportData = reportDoc.data();
            const geoJSON = await convertToGeoJSON(reportData);

            geoJSON && reportLocationGeoJSONList.push(geoJSON);
        }

        // console.log(reportLocationGeoJSONList);
        return reportLocationGeoJSONList;
    }
    catch (error) {
        console.error("Error getting documents: ", error);
    }
}

export default getReportGeoJSONList;