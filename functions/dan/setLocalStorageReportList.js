

function setLocalStorageReportList(reportId) {
    // Lấy danh sách reportId từ localStorage
    const existingReportList = JSON.parse(localStorage.getItem('reportIdList')) || [];

    // Thêm reportId mới vào danh sách
    existingReportList.push(reportId);

    // Lưu danh sách mới vào localStorage
    localStorage.setItem('reportIdList', JSON.stringify(existingReportList));

    console.log('ReportId added to local storage:', reportId);
}

export default setLocalStorageReportList;

