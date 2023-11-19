
import ReportPopup from '../popup/ReportPopup.js';
import DetailReportModal from "../modal/DetailReportModal.js";
import { getReportInfoById } from '/functions/dan/getReportLocationInfo.js';

export default function ReportMarker(map, reportInfo) {
    const mk = document.createElement('div');

    if (reportInfo.type == 'qc' || reportInfo.type == 'ddqc') {return}
    
    switch (reportInfo.form) {
        case 'Tố giác sai phạm':
            mk.className = `marker marker-tgsp report-marker report-marker-${reportInfo.reportId}`;
            mk.innerHTML = `
            <div class="report-marker-popup-root report-marker-popup-root-${reportInfo.reportId}">${ReportPopup(reportInfo)}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-octagon"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            `;
            break;
        case 'Đăng ký nội dung':
            mk.className = `marker marker-dknd report-marker report-marker-${reportInfo.reportId}`;
            mk.innerHTML = `
            <div class="report-marker-popup-root report-marker-popup-root-${reportInfo.reportId}">${ReportPopup(reportInfo)}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            `;
            break;
        case 'Đóng góp ý kiến':
            mk.className = `marker marker-dgyk report-marker report-marker-${reportInfo.reportId}`;
            mk.innerHTML = `
            <div class="report-marker-popup-root report-marker-popup-root-${reportInfo.reportId}">${ReportPopup(reportInfo)}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            `;
            break;
        case 'Giải đáp thắc mắc':
            mk.className = `marker marker-gdtm report-marker report-marker-${reportInfo.reportId}`;
            mk.innerHTML = `
            <div class="report-marker-popup-root report-marker-popup-root-${reportInfo.reportId}">${ReportPopup(reportInfo)}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            `;
            break;
        default:
            console.error('ReportMarker: Invalid Report Type');
            break;
    }


    // make a marker for each feature and add to the map
    var marker = new mapboxgl.Marker(mk)
        .setLngLat([reportInfo.longitude, reportInfo.latitude])
        .addTo(map);


    // Add Event Handler
    document.querySelector(`.report-marker-${reportInfo.reportId}`).onclick = function () {
        getReportInfoById(reportInfo.reportId).then(reportInfo => {
            document.querySelector('.modal-root').innerHTML = DetailReportModal(reportInfo);
        })
    }


    document.querySelector(`.report-marker-${reportInfo.reportId}`).onmouseover = function () {
        document.querySelector(`.report-marker-popup-root-${reportInfo.reportId}`).classList.add('hover');
    }
    document.querySelector(`.report-marker-${reportInfo.reportId}`).onmouseout = function () {
        document.querySelector(`.report-marker-popup-root-${reportInfo.reportId}`).classList.remove('hover');
    }
}
