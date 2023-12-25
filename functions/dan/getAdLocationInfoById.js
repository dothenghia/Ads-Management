// @ Hàm lấy Thông tin địa điểm quảng cáo theo locationId ##########

async function getAdLocationInfoById(locaId) {

    let localStorageReportList = JSON.parse(localStorage.getItem('reportIdList')) || [];

    const response = await fetch(`http://localhost:3000/dan/ddqc/${locaId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(localStorageReportList),
    });
    
    const data = await response.json();
    console.log(data);

    return data;
}

export default getAdLocationInfoById;
