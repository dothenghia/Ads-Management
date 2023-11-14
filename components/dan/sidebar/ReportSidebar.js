
import ReportCard from "../card/ReportCard.js"

export default function ReportSidebar(reportData) {

    const qcReports = reportData.filter(report => report.type === 'qc');
    const ddReports = reportData.filter(report => report.type === 'dd');

    function switchTab(tabType) {
        const tabs = document.querySelectorAll('.report-sidebar__tab');
        tabs.forEach(tab => tab.classList.remove('active'));

        const contentContainers = document.querySelectorAll('.report-sidebar__content');
        contentContainers.forEach(container => container.style.display = 'none');

        const activeTab = document.querySelector(`.report-sidebar__tab[data-type="${tabType}"]`);
        const activeContent = document.querySelector(`.report-sidebar__content[data-type="${tabType}"]`);

        activeTab.classList.add('active');
        activeContent.style.display = 'block';
    }

    // Gọi hàm switchTab khi tạo HTML để đảm bảo nó thuộc phạm vi toàn cục
    window.switchTab = switchTab;

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
                    <button type="button" class="report-sidebar__tab active" onclick="switchTab('qc')" data-type="qc">
                        Quảng cáo (${qcReports.length})
                    </button>
                    <button type="button" class="report-sidebar__tab" onclick="switchTab('dd')" data-type="dd">
                        Địa điểm (${ddReports.length})
                    </button>
                </div>
                
                <div class="report-sidebar__content" data-type="qc">
                    ${qcReports.map(rp => ReportCard(rp)).join('')}
                </div>
                
                <div class="report-sidebar__content" data-type="dd" style="display: none;">
                    ${ddReports.map(rp => ReportCard(rp)).join('')}
                </div>

            </div>
        </div>`
    )
}
