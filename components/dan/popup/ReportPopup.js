
import StatusTag from "../tag/StatusTag.js"

export default function ReportPopup(reportInfo) {


    return `
    <div class="report-popup">
        <div class="report-popup__title">
            <h1>
                ${reportInfo.form}
            </h1>
        </div>
        <div class="report-popup__info">
            <h2>${reportInfo.address} (Sở Văn hóa - Thể thao), ${reportInfo.region}</h2>
        </div>
        <div class="report-popup__status ">
            ${StatusTag(reportInfo.status)}
        </div>
    </div>
    `
}
