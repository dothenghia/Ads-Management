// @ Hàm lấy Thông tin báo cáo theo reportId ##########

async function getReportInfoById(rpId) {

    const response = await fetch(`https://adsmap-group07.onrender.com/dan/bc/${rpId}`);
    const data = await response.json();
    // console.log(data);

    return data;
}

export default getReportInfoById;
