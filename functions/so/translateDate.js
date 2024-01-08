function translateDate(Date) {
    var date_arr = Date.split('/');
    return "Ngày " + date_arr[0] + " tháng " + date_arr[1] + " năm " + date_arr[2];
}

module.exports.translateDate = translateDate;