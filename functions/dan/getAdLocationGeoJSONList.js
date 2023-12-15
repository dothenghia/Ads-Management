// @ Hàm lấy danh sách các địa điểm quảng cáo và chuyền về dạng GeoJSON ##########

async function getAdLocationGeoJSONList() {

    const response = await fetch('http://localhost:3000/dan/ddqcgeojson');
    const data = await response.json();
    // console.log(data);

    return data;
}

export default getAdLocationGeoJSONList;
