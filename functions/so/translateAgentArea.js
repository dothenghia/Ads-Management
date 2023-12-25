function translateAgentArea(Obj, idQuan, idPhuong) {
    var address = "";
    // console.log(idQuan);
    // console.log(idPhuong);
    // console.log(Obj);
    if (idQuan == "" && idPhuong == "") {
        return "Sở Văn hóa và Thể thao TP.HCM";
    }
    else if (idQuan != "" && idPhuong == "") {
        if (Array.isArray(Obj)) {
            address = Obj.filter((district) => district.idQuan == idQuan)[0].name;
        } else address = Obj[idQuan].name;
    }
    else {
        if (Array.isArray(Obj)) {
            let quan = Obj.filter((district) => district.idQuan == idQuan)[0];
            let phuong = quan.wards.filter((ward) => ward.idPhuong == idPhuong)[0];
            address = phuong.name + ", " + quan.name;
        } else address = Obj[idQuan].wards[idPhuong].name + ", " + Obj[idQuan].name;
    }
    return address;
}

module.exports.translateAgentArea = translateAgentArea;