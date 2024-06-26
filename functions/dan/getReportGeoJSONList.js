// @ Hàm lấy danh sách các địa điểm bị báo cáo và chuyền về dạng GeoJSON ##########
// ~ Done

async function getReportGeoJSONList() {

    let localStorageReportList = JSON.parse(localStorage.getItem('reportIdList')) || [];

    const response = await fetch('https://adsmap-group07.onrender.com/dan/ddbcbkgeojson');
    const data = await response.json();
    // console.log(data);

    const filteredReports = data.filter(report => {
        let str = report.properties.reportId.toString();
        return (
            localStorageReportList.includes(str)
        );
    });
    // console.log(filteredReports);

    return filteredReports;
}

export default getReportGeoJSONList;
