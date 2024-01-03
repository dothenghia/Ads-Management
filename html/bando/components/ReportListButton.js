
import ReportSidebar from './sidebar/ReportSidebar.js';
// import getReportList from "/functions/dan/getReportList.js";

export default function ReportListButton(map, boundary) {

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'report-list-button';

    button.innerHTML = `
        <p class="report-list-button__length"></p>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
    `;

    document.querySelector('.report-list-button-root').appendChild(button);

    fetch('http://localhost:3000/dan/dsbc')
        .then(response => response.json())
        .then(data => {
            const filteredReportMarkers = data.filter(point => isPointInsideBoundary(point, boundary));

            document.querySelector('.report-list-button__length').innerHTML = filteredReportMarkers.length;
        })



    button.onclick = function () {
        fetch('http://localhost:3000/dan/dsbc')
        .then(response => response.json())
        .then(data => {
            const filteredReportMarkers = data.filter(point => isPointInsideBoundary(point, boundary));
            // console.log(filteredReportMarkers);

            document.querySelector('.sidebar-root').innerHTML = ReportSidebar(map, filteredReportMarkers)
        })
    }
}

function isPointInsideBoundary(point, boundary) {
    let lng = point.longitude
    let lat = point.latitude
    const [longitude, latitude] = [lng, lat];

    let isInside = false;

    for (let i = 0, j = boundary.length - 1; i < boundary.length; j = i++) {
        const xi = boundary[i][0], yi = boundary[i][1];
        const xj = boundary[j][0], yj = boundary[j][1];
        const intersect = ((yi > latitude) != (yj > latitude)) &&
            (longitude < (xj - xi) * (latitude - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }

    return isInside;
}
