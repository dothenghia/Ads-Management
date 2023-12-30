// @ Hàm lấy danh sách các địa điểm bị báo cáo và chuyền về dạng GeoJSON ##########
// ~ Done

async function getReportGeoJSONList() {

    let localStorageReportList = JSON.parse(localStorage.getItem('reportIdList')) || [];

    const response = await fetch('http://localhost:3000/dan/ddbcbkgeojson');
    const data = await response.json();
    // console.log(data);

    const filteredReports = data.filter(report => {
        let str = report.properties.reportId.toString();
        return (
            localStorageReportList.includes(str) ||
            ['Từ chối', 'Đã xử lý'].includes(report.properties.status)
        );
    });
    // console.log(filteredReports);

    return filteredReports;
}

export default getReportGeoJSONList;
