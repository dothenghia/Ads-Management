
import ReportCard from "../card/ReportCard.js"

export default function ReportSidebar() {

    return (
        `<div class="report-sidebar-container">

            <div class="report-sidebar">
                <div class="report-sidebar__header">
                    <h1>Danh sách báo cáo đã gửi</h1>
                    <button type="button" onclick="document.querySelector('.sidebar-root').innerHTML = ''">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                
                <div class="report-sidebar__tabs">
                    <button type="button" class="report-sidebar__tab active">Quảng cáo (0)</button>
                    <button type="button" class="report-sidebar__tab">Địa điểm (0)</button>
                </div>


                ${ReportCard()}
                ${ReportCard()}

            </div>
        </div>`
    )
}
