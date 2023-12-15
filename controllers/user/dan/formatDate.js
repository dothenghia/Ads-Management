
function formatDate(mongoDate) {
    const date = new Date(mongoDate);
    console.log(date);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

module.exports = formatDate;