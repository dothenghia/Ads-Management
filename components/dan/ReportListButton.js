
import ReportSidebar from './sidebar/ReportSidebar.js';
import getReportList from "/functions/dan/getReportList.js";
import getReportLength from "/functions/dan/getReportLength.js";

export default function ReportListButton() {

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'report-list-button';

    button.innerHTML = `
        <p class="report-list-button__length"></p>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
    `;

    document.querySelector('.report-list-button-root').appendChild(button);

    getReportLength().then(data => {
        document.querySelector('.report-list-button__length').innerHTML = data;
    })


    button.onclick = function () {
        getReportList().then(data => {
            console.log(data);
            document.querySelector('.sidebar-root').innerHTML = ReportSidebar(data)
        })
    }
}
