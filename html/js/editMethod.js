
document.querySelectorAll(".edit-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let page = btn.dataset.page;
        let accountRole = btn.dataset.accountRole;

        // Employee account
        let accId = btn.dataset.id;
        let accName = btn.dataset.name;
        let accPhone = btn.dataset.phone;
        let accRole = btn.dataset.role;
        let accArea = btn.dataset.area;
        let accUsername = btn.dataset.userName;
        let accPassword = btn.dataset.password;

        var areaDetail = accArea.split("-"); 
        // Admin account
        document.getElementById("id").value = accId;
        document.getElementById("hotenEdit").value = accName;
        document.getElementById("phoneEdit").value = accPhone;
        document.getElementById("roleEdit").value = accRole;
        document.getElementById("areaEdit").value = translateArea(areaDetail[0], areaDetail[1]);
        document.getElementById("quanID").value = areaDetail[0];
        document.getElementById("phuongID").value = areaDetail[1];
        document.getElementById("usernameEdit").value = accUsername;
        document.getElementById("passwordEdit").value = accPassword;

        const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
        modal.show();

        document.getElementById("roleEdit").addEventListener("change", (e) => {
            let SelectedRole = document.getElementById("roleEdit").value;
            
            console.log(SelectedRole);
            if (SelectedRole != "3") {
                
                var quanSelect = $("#quanID");

                function dynamicPhuongSelect(){
                    var SelectedQuan = document.getElementById("quanID").value;
                    
                    var phuongSelect = $("#phuongID");
                    
                    var phuong = {
                        "1" : [
                            {
                                id: "bennghe",
                                name: "Bến Nghé"
                            },
                            {
                                id: "benthanh",
                                name: "Bến Thành"
                            },
                            {
                                id: "cogiang",
                                name: "Cô Giang"
                            },
                            {
                                id: "caukho",
                                name: "Cầu Kho"
                            },
                            {
                                id : "cauonglanh",
                                name: "Cầu Ông Lãnh"
                            },
                            {
                                id: "daKao",
                                name: "Đa Kao"
                            },
                            {
                                id: "nguyenthaibinh",
                                name: "Nguyễn Thái Bình"
                            },
                            {
                                id: "nguyenthaichin",
                                name: "Nguyễn Thái Bình"
                            },
                            {
                                id: "phamngulao",
                                name: "Phạm Ngũ Lão"
                            },
                            {
                                id: "tanDinh",
                                name: "Tân Định"
                            }
                        ],
                        "2" : [
                            {
                                id: 'ankhanh',
                                name: 'An Khánh'
                            },
                            {
                                id: 'anloiDong',
                                name: 'An Lợi Đông'
                            },
                            {
                                id: 'anphu',
                                name: 'An Phú'
                            },
                            {
                                id: 'binhan',
                                name: 'Bình An'
                            },
                            {
                                id: 'binhKhanh',
                                name: 'Bình Khánh'
                            },
                            {
                                id: 'binhTrungDong',
                                name: 'Bình Trưng Đông'
                            },
                            {
                                id: 'binhTrungTay',
                                name: 'Bình Trưng Tây'
                            },
                            {
                                id: 'catlai',
                                name: 'Cát Lái'
                            },
                            {
                                id: 'thaodien',
                                name: 'Thảo Điền'
                            },
                            {
                                id: 'thanhMyLoi',
                                name: 'Thạnh Mỹ Lợi'
                            },
                            {
                                id: 'thuthiem',
                                name: 'Thủ Thiêm'
                            }
                        ],
                    }

                    // Clear existing options
                    phuongSelect.empty();

                    phuong[SelectedQuan].forEach(function (phuong) {
                        phuongSelect.append($('<option></option>').attr('value', phuong.id).text(phuong.name));
                    });

                    phuongSelect.prop("hidden", false);
                    phuongSelect.prop("disabled", false);
                }
                
                quanSelect.change(dynamicPhuongSelect);
                dynamicPhuongSelect();

                quanSelect.prop("hidden", false);
                $("areaEdit").prop("hidden", true);
            }

        });
    });
});


async function editAcc(e) {
    e.preventDefault()

    const formData = new FormData(document.getElementById("editAccForm"))
    const data = Object.fromEntries(formData.entries())

    console.log(data)
    let res = await fetch('/so/nhansu', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    location.reload();
}

async function accSettings(e) {
    e.preventDefault()

    const formData = new FormData(document.getElementById("formAccountSettings"))
    const data = Object.fromEntries(formData.entries())

    console.log(data)
    let res = await fetch('/chung/thongtincanhan', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    location.reload();
}

function translateArea(idQuan, idPhuong) {
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
