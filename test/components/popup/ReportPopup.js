
import StatusTag from "../tag/StatusTag.js"

export default function ReportPopup(reportInfo) {


    return `
    <div class="report-popup">
        <div class="report-popup__title">
            <h1>
                ${reportInfo.reportForm}
            </h1>
        </div>
        <div class="report-popup__info">
            <h2>Địa điểm: ${reportInfo.name} (${reportInfo.phuong}, ${reportInfo.quan})</h2>
        </div>
        <div class="report-popup__status ">
            ${StatusTag(reportInfo.status)}
        </div>
    </div>
    `
}
