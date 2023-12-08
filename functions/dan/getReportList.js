// @ Hàm lấy Danh sách báo cáo ##########

import { db } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

async function getReportList() {
    try {
        const reportsCollection = collection(db, "reports");
        const reportDocs = await getDocs(reportsCollection);

        // Chuyển đổi danh sách documents thành mảng dữ liệu
        const reports = reportDocs.docs.map(doc => doc.data());

        return reports;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách documents:", error);
        return null;
    }
}

export default getReportList;