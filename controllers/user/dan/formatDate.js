
function formatDate(mongoDate) {
    const date = new Date(mongoDate);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();

    return `Ngày ${day} tháng ${month} năm ${year}`;
}

module.exports = formatDate;