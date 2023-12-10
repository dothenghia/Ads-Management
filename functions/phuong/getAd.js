function getLocation(adLocation, id, resultType) {
    // 0: trả về địa chỉ đầy đủ - 1: trả về phường, đường - 2: trả về đường
    let obj = adLocation.filter(pos => pos.locationId == id);
    
    if (obj.length == 0) {
        return "Không tìm thấy";
    } else {

    var address = obj[0].address;
    if (resultType == 2) return address;

    address += ", ";
    switch (obj[0].idPhuong.split("_")[1]) {
        case "1":
            address += "Phường 1";
            break;
        case "2":
            address += "Phường 2";
            break;
        case "3":
            address += "Phường 3";
            break;
        case "4":
            address += "Phường 4";
            break;
        case "5":
            address += "Phường 5";
            break;
        case "6":
            address += "Phường 6";
            break;
        case "7":
            address += "Phường 7";
            break;
        case "8":
            address += "Phường 8";
            break;
        case "9":
            address += "Phường 9";
            break;
        case "10":
            address += "Phường 10";
            break;
        case "11":
            address += "Phường 11";
            break;
        case "12":
            address += "Phường 12";
            break;
        case "13":
            address += "Phường 13";
            break;
        case "14":
            address += "Phường 14";
            break;
        case "15":
            address += "Phường 15";
            break;
    }
    if (resultType == 1) return address;

    address += ", ";
    switch (obj[0].idQuan) {
        case "1":
            address += "Quận 1 ";
            break;
        case "2":
            address += "Quận 2 ";
            break;
        case "3":
            address += "Quận 3 ";
            break;
        case "4":
            address += "Quận 4 ";
            break;
        case "5":
            address += "Quận 5 ";
            break;
        case "6":
            address += "Quận 6 ";
            break;
        case "7":
            address += "Quận 7 ";
            break;
        case "8":
            address += "Quận 8 ";
            break;
        case "9":
            address += "Quận 9 ";
            break;
        case "10":
            address += "Quận 10 ";
            break;
        case "11":
            address += "Quận 11 ";
            break;
        case "12":
            address += "Quận 12 ";
            break;
        case "BTH":
            address += "Quận Bình Thạnh ";
            break;
        case "GV":
            address += "Quận Gò Vấp ";
            break;
    }

    return address;
    }
}

function getAdInfo(ad, adId) {
    let obj = ad.filter(loc => loc.adId == adId);
    return obj;
}

function getAdLocationInfo(adLocation, locationId) {
    let obj = adLocation.filter(loc => loc.locationId == locationId);
    return obj;
}

function getReportInfo(report, reportId) {
    let obj = report.filter(rep => rep.reportId == reportId);
    return obj;
}

module.exports = {
    getLocation: getLocation,
    getAdInfo: getAdInfo,
    getAdLocationInfo: getAdLocationInfo,
    getReportInfo: getReportInfo
}