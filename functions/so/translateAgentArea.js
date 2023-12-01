function translateAgentArea(idQuan, idPhuong) {
    var address = "";

    if (idPhuong == "" && idQuan == "") {
        address = "Sở Văn hóa và Thể thao TP.HCM";
        return address;
    }
    
    if (idPhuong != "") {
        switch (idPhuong) {
            case "1":
                address += "Phường 1, ";
                break;
            case "2":
                address += "Phường 2, ";
                break;
            case "3":
                address += "Phường 3, ";
                break;
            case "4":
                address += "Phường 4, ";
                break;
            case "5":
                address += "Phường 5, ";
                break;
            case "6":
                address += "Phường 6, ";
                break;
            case "7":
                address += "Phường 7, ";
                break;
            case "8":
                address += "Phường 8, ";
                break;
            case "9":
                address += "Phường 9, ";
                break;
            case "10":
                address += "Phường 10, ";
                break;
            case "11":
                address += "Phường 11, ";
                break;
            case "12":
                address += "Phường 12, ";
                break;
            case "13":
                address += "Phường 13, ";
                break;
            case "14":
                address += "Phường 14, ";
                break;
        }
    }

    switch (idQuan) {
        case "1":
            address += "Quận 1";
            break;
        case "2":
            address += "Quận 2";
            break;
        case "3":
            address += "Quận 3";
            break;
        case "4":
            address += "Quận 4";
            break;
        case "5":
            address += "Quận 5";
            break;
        case "6":     
            address += "Quận 6";
            break;
        case "7":
            address += "Quận 7";
            break;
        case "8":
            address += "Quận 8";
            break;
        case "9":
            address += "Quận 9";
            break;
        case "10":
            address += "Quận 10";
            break;
        case "11":
            address += "Quận 11";
            break;
        case "12":
            address += "Quận 12";
            break;
        case "GV": 
            address += "Quận Gò Vấp";
            break;
        case "BT":
            address += "Quận Bình Thạnh";
            break;
    }

    return address;
}

module.exports.translateAgentArea = translateAgentArea;