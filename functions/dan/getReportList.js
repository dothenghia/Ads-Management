// @ Hàm lấy Danh sách báo cáo ##########
// ~ Done

async function getReportList() {

    let localStorageReportList = JSON.parse(localStorage.getItem('reportIdList')) || [];

    const response = await fetch('https://adsmap-group07.onrender.com/dan/dsbc');
    const data = await response.json();
    // console.log(data);

    const filteredReports = data.filter(report => {
        let str = report.reportId.toString();
        return (
            localStorageReportList.includes(str)
        );
    });
    // console.log(filteredReports);

    return filteredReports;
}

export default getReportList;
