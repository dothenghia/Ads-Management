// @ Hàm lấy danh sách các địa điểm bị báo cáo và chuyền về dạng GeoJSON ##########

async function getReportGeoJSONList() {

    const response = await fetch('http://localhost:3000/dan/ddbcbkgeojson');
    const data = await response.json();
    // console.log(data);

    return data;
}

export default getReportGeoJSONList;
