// @ Hàm lấy Danh sách báo cáo ##########

async function getReportList() {

    const response = await fetch('http://localhost:3000/dan/dsbc');
    const data = await response.json();
    // console.log(data);

    return data;
}

export default getReportList;
