var editBtn = document.querySelectorAll(".edit-button");
if (editBtn != null) {
    editBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
    
            // Page, account role
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
            document.getElementById("areaEdit").value = "Sở Văn hóa và Thể thao TP.HCM";
            document.getElementById("quanID").value = areaDetail[0] ? areaDetail[0] : "";
            
            // Assuming you have a reference to the <select> element with id "quanID"
            var selectElement = document.getElementById('quanID');
    
            // Get the selected option
            var selectedOption = selectElement.options[selectElement.selectedIndex];
    
            // Lọc ra phường tương ứng với quận
            var newPhuongOptions = [];
            // Access the data-wards attribute using dataset
            if (selectedOption.dataset.wards != null && selectedOption.dataset.wards != undefined) {
                // Các phường của quận đang chọn
                var dataWardsValue = JSON.parse(selectedOption.dataset.wards); // Có thể chưa chọn j
                if (dataWardsValue != undefined || dataWardsValue != null)
                    // Loop qua các key để add vào newPhuongOptions
                    Object.keys(dataWardsValue).forEach(function (phuong) {
                        newPhuongOptions.push({value: phuong, text: dataWardsValue[phuong].name});
                    });
            }
    
            var phuongElement = document.getElementById("phuongID");
            // Clear existing options (optional)
            phuongElement.innerHTML = '<option value="">Phường</option>';
    
            // Add new options
            newPhuongOptions.forEach(function (optionData) {
                var option = document.createElement('option');
                option.value = optionData.value;
                option.text = optionData.text;
                phuongElement.appendChild(option);
            });
    
            
            document.getElementById("phuongID").value = areaDetail[1];
            document.getElementById("usernameEdit").value = accUsername;
            document.getElementById("passwordEdit").value = accPassword;
    
            const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
            modal.show();
    
            // Make sure the dropdown options are hidden when the modal is closed
            if (accRole == "3") {
                $("#areaEdit").prop("hidden", false);
                resetQuanandPhuong();
            } else if (accRole == "2") {
                $("#areaEdit").prop("hidden", true);
                $("#quanID").prop("hidden", false);
                resetPhuong();
            } else {
                $("#areaEdit").prop("hidden", true);
                $("#quanID").prop("hidden", false);
                $("#phuongID").prop("hidden", false);
            }
    
            // Listen to the change event of the role dropdown
            document.getElementById("roleEdit").addEventListener("change", (e) => {
                let SelectedRole = e.target.value;
                console.log("SelectedRole: ", SelectedRole);
                // If not Phuong or Quan
                if (SelectedRole != "3") {
                    resetPhuong(); // Hide the phuong dropdown if the role is Quan
                    
                    $("#quanID").prop("hidden", false);
                    if (SelectedRole == "1") {
                        
                        $("#phuongID").prop("hidden", false);
                    }
                    hideTextArea();
                }
                else {
                    $("#areaEdit").value = "Sở Văn hóa và Thể thao TP.HCM";
                    $("#areaEdit").prop("hidden", false);
                    resetQuanandPhuong();
                }
    
            });
    
            // Listen to the change event of the Quan dropdown
            document.getElementById("quanID").addEventListener("change", (e) => {
                
                // Lấy value của option quận đang chọn (e.target)
                var selectedOption = e.target.options[e.target.selectedIndex];
    
                // Lọc ra những phường theo quận đang chọn
                var newPhuongOptions = [];
                // Access the data-wards attribute using dataset
                if (selectedOption != null && selectedOption != undefined) {
                    // Các phường của quận đang chọn
                    var dataWardsValue = JSON.parse(selectedOption.dataset.wards); // Có thể chưa chọn j
                    if (dataWardsValue != undefined || dataWardsValue != null)
                        // Loop qua các key để add vào newPhuongOptions
                        Object.keys(dataWardsValue).forEach(function (phuong) {
                            newPhuongOptions.push({value: phuong, text: dataWardsValue[phuong].name});
                        });
                }
    
                var phuongElement = document.getElementById("phuongID");
                // Clear existing options (optional)
                phuongElement.innerHTML = '<option value="">Phường</option>';
    
                // Add new options
                newPhuongOptions.forEach(function (optionData) {
                    var option = document.createElement('option');
                    option.value = optionData.value;
                    option.text = optionData.text;
                    phuongElement.appendChild(option);
                });
            });
        });
    });
}

function resetQuanandPhuong() {
    $("#quanID").prop("hidden", true);
    $("#phuongID").prop("hidden", true);
}

function resetPhuong() {
    $("#phuongID").prop("hidden", true);
}

function hideTextArea() {
    $("#areaEdit").prop("hidden", true);
}


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

async function accNamePhoneSettings(e) {
    e.preventDefault()

    const formData = new FormData(document.querySelector(".formInfoSettings"))
    const data = Object.fromEntries(formData.entries())

    console.log(data);
    let res = await fetch('/so/thongtincanhan', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    location.reload();
}

async function accPassSettings(e) {
    e.preventDefault()

    const formData = new FormData(document.querySelector(".formPassSettings"))
    const data = Object.fromEntries(formData.entries())

    console.log(data);
    if (data.newPassword != data.confirmPassword) {
        $("#passWarn").prop("hidden", false)
        return;
    }
    let res = await fetch('/so/thongtincanhan', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    location.reload();
}

/* 
    Note: 
        - Đầu tiên ta sẽ append những options cho phường với tên quận tương ứng, rồi gán giá trị cho phường
        - Mỗi lần mở edit modal cần check cái role ( Sở, quận, phường ) để hiển thị dropdown hay text area (với sở). 
        => Với mỗi role sẽ tắt mở các dropdown/text area tương ứng
        * Lưu ý role ban đầu sẽ k thay đổi nếu k nhấn lưu
        - Thêm sự kiện vào cái dropdown Role, nếu là Sở thì hiển thị text area, nếu là quận thì hiển thị dropdown quận, nếu là phường thì hiển thị dropdown phường + quận
        - Mỗi lần role dropdown thay đổi thì cần check role đang chọn là gì
        - Nhớ tắt mở các text area, dropdown tương ứng với role. Quận thì tắt text và phường drop, phường thì tắt text, sở thì tắt quận và phường drop
*/ 