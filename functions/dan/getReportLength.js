// @ Hàm lấy số lượng báo cáo ##########

import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

async function getReportLength() {
    try {
        const reportsCollection = collection(db, "reports");
        const reportDocs = await getDocs(reportsCollection);
        
        // Lấy số lượng documents trong collection 'reports'
        const reportLength = reportDocs.size;

        return reportLength;
    } catch (error) {
        console.error("Lỗi khi lấy số lượng documents:", error);
        return 0;
    }
}

export default getReportLength;