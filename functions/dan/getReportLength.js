// @ Hàm lấy số lượng báo cáo ##########
// ~ Done

async function getReportLength() {

    let localStorageReportList = JSON.parse(localStorage.getItem('reportIdList')) || [];

    return localStorageReportList.length;
}

export default getReportLength;
