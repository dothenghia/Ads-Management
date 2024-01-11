// @ Hàm lấy số lượng báo cáo ##########
// ~ Done

async function getReportLength() {

    let localStorageReportList = JSON.parse(localStorage.getItem('reportIdList')) || [];
    const response = await fetch('https://adsmap-group07.onrender.com/dan/dsbc');
    const data = await response.json();

    const filteredReports = data.filter(report => {
        let str = report.reportId.toString();
        return (
            localStorageReportList.includes(str)
        );
    });
    
    return filteredReports.length;
}

export default getReportLength;
