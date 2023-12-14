// @ Hàm lấy thông tin bảng Quảng cáo theo locationId và adId ##########

async function getAdInfoById(locationId, adId) {

    const response = await fetch(`http://localhost:3000/dan/qc?locationId=${locationId}&adId=${adId}`);
    const data = await response.json();
    // console.log(data);

    return data;
}

export default getAdInfoById;
