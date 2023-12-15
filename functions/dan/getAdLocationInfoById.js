// @ Hàm lấy Thông tin địa điểm quảng cáo theo locationId ##########

async function getAdLocationInfoById(locaId) {

    const response = await fetch(`http://localhost:3000/dan/ddqc/${locaId}`);
    const data = await response.json();
    // console.log(data);

    return data;
}

export default getAdLocationInfoById;
