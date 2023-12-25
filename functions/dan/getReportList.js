// @ Hàm lấy Danh sách báo cáo ##########

async function getReportList() {

    let localStorageReportList = JSON.parse(localStorage.getItem('reportIdList')) || [];

    const response = await fetch('http://localhost:3000/dan/dsbc');
    const data = await response.json();
    // console.log(data);

    const filteredReports = data.filter(report => {
        let str = report.reportId.toString();
        return (
            localStorageReportList.includes(str)
        );
    });
    console.log(filteredReports);

    return filteredReports;
}

export default getReportList;
