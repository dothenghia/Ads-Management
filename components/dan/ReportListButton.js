const $ = document.querySelector.bind(document);

import ReportSidebar from './sidebar/ReportSidebar.js';
import { getAllReportList } from "/functions/dan/getReportLocationInfo.js";

export default function ReportListButton() {

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'report-list-btn';

    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`;

    button.onclick = function () {

        // Nên Fetch data trước
        // ròi mới truyền vào Component để render thoi nhe 👌
        const fetchData = async () => {
            var data = await getAllReportList();
            console.log(data);

            $('.sidebar-root').innerHTML = ReportSidebar(data)
        }

        fetchData();
    }

    document.querySelector('.report-list-button-root').appendChild(button);
}
