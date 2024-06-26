// @ Hàm lấy thông tin bảng Quảng cáo theo locationId và adId ##########

async function getAdInfoById(locationId, adId) {

    let localStorageReportList = JSON.parse(localStorage.getItem('reportIdList')) || [];
    
    const response = await fetch(`https://adsmap-group07.onrender.com/dan/qc?locationId=${locationId}&adId=${adId}`, {
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

export default getAdInfoById;
