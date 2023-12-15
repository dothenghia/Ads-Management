function translateAgentArea(Obj, idQuan, idPhuong) {
    var address = "";
    
    if (idQuan == "" && idPhuong == "") {
        return "Sở Văn hóa và Thể thao TP.HCM";
    }
    else if (idQuan != "" && idPhuong == "") {
        address = Obj[idQuan].name;
    }
    else {
        address = Obj[idQuan].wards[idPhuong].name + ", " + Obj[idQuan].name;
    }
    return address;
}

module.exports.translateAgentArea = translateAgentArea;