// @ Hàm lấy số lượng báo cáo ##########

async function getReportLength() {

    const response = await fetch('http://localhost:3000/dan/bclength');
    const data = await response.json();
    // console.log(data);

    return data.reportLength;
}

export default getReportLength;
