// @ Hàm lấy Thông tin báo cáo theo reportId ##########

async function getReportInfoById(rpId) {

    const response = await fetch(`http://localhost:3000/dan/bc/${rpId}`);
    const data = await response.json();
    // console.log(data);

    return data;
}

export default getReportInfoById;
