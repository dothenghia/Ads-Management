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
        } else {
            if (Obj[idQuan] != undefined && Obj[idQuan] != null)
                address = Obj[idQuan].name;
            else address = "Quận Không Xác Định";
        }
    }
    else {
        if (Array.isArray(Obj)) {
            let quan = Obj.filter((district) => district.idQuan == idQuan)[0];
            let phuong = quan.wards.filter((ward) => ward.idPhuong == idPhuong)[0];
            address = phuong.name + ", " + quan.name;
        } else {
            if (Obj[idQuan] != undefined && Obj[idQuan] != null)
                address = Obj[idQuan].name;
            else address = "Quận Không Xác Định";

            if (Obj[idQuan].wards[idPhuong] != undefined && Obj[idQuan].wards[idPhuong] != null) 
                address = Obj[idQuan].wards[idPhuong].name + ", " + address;
            else
                address = "Phường Không Xác Định" + ", " + address;
        }
    }
    return address;
}

module.exports.translateAgentArea = translateAgentArea;