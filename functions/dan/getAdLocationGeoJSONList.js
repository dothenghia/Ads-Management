// @ Hàm lấy danh sách các địa điểm quảng cáo và chuyền về dạng GeoJSON ##########
// ~ Done

async function getAdLocationGeoJSONList() {

    let localStorageReportList = JSON.parse(localStorage.getItem('reportIdList')) || [];

    const response = await fetch('http://localhost:3000/dan/ddqcgeojson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(localStorageReportList),
    });

    const data = await response.json();
    // console.log(data);


    return data;
}

export default getAdLocationGeoJSONList;
