function translateReportType(text) {
    if (text == "qc") return "Bảng Quảng Cáo";
    else if (text == "ddqc") return "Địa Điểm Quảng Cáo";
    else if (text == "ddbk") return "Địa Điểm Bất Kì";
    else return "Không xác định";
}

module.exports.translateReportType = translateReportType;