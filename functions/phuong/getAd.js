function getLocation(adLocation, id, resultType) {
    // 0: trả về địa chỉ đầy đủ - 1: trả về phường, đường - 2: trả về đường
    let obj = adLocation.filter(pos => pos.locationId == id);
    
    if (obj.length == 0) {
        return "Không tìm thấy";
    } else {
    var address = "";
    switch (obj[0].idDuong) {
        case "nvc":
            address += "Nguyễn Văn Cừ";
            break;
        case "tp":
            address += "Trần Phú";
            break;
        case "nt":
            address += "Nguyễn Trãi";
            break;
        case "ltb":
            address += "Lê Thị Bạch Cát";
            break;
        case "ltt":
            address += "Lê Thị Tấn";
            break;
        case "lt":
            address += "Lê Thánh Tôn";
            break;
        case "lq":
            address += "Lê Quý Đôn";
            break;
        case "lq2":
            address += "Lê Quang Định";
            break;
        case "ltb2":
            address += "Lê Thị Bạch Cát";
            break;
        case "ltt2":
            address += "Lê Thị Tấn";
            break;
        case "lt2":
            address += "Lê Thánh Tôn";
            break;
        case "lq2":
            address += "Lê Quý Đôn";
            break;
        case "lq3":
            address += "Lê Quang Định";
            break;
        case "ltb3":
            address += "Lê Thị Bạch Cát";
            break;
        case "ltt3":
            address += "Lê Thị Tấn";
            break;
        case "lt3":
            address += "Lê Thánh Tôn";
            break;
        case "lq3":
            address += "Lê Quý Đôn";
            break;
        case "lq4":
            address += "Lê Quang Định";
            break;
        case "ltb4":
            address += "Lê Thị Bạch Cát";
            break;
        case "ltt4":
            address += "Lê Thị Tấn";
            break;
        case "lt4":
            address += "Lê Thánh Tôn";
            break;
        case "lq4":
            address += "Lê Quý Đôn";
            break;
    }
    if (resultType == 2) return address;

    address += ", ";
    switch (obj[0].idPhuong) {
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

function getAdInfo(ad, id) {
    let obj = ad.filter(loc => loc.adId == id);
    return obj;
}

module.exports = {
    getLocation: getLocation,
    getAdInfo: getAdInfo
}