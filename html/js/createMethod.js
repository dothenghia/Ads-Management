/* For Nhan Su */
// Config logic for chuc vu and khu vuc
var accountBtn = document.getElementById('newAccountButton');
if (accountBtn != null){
    accountBtn.addEventListener("click", (e) => {
        // Set every things back to default value
        document.getElementById('newAccountRole').value = "";
        document.getElementById('newAccountDistrict').value = "";
        document.getElementById('newAccountWard').value = "";

        // Disable "disable" attribute
        document.getElementById('newAccountDistrict').disabled = false;
        document.getElementById('newAccountWard').disabled = false;
    });
}
    

// Add logic to role selection
var accountRole = document.getElementById('newAccountRole');
if (accountRole != null) {
    accountRole.addEventListener("change", (e) => {
        // e target value để lấy giá trị mình đang chọn
        let SelectedRole = e.target.value;
        console.log("SelectedRole: ", e.target.value);
        
        // If null
        if (SelectedRole == "") {
            // Set every things back to default value
            document.getElementById('newAccountDistrict').value = "";
            document.getElementById('newAccountWard').value = "";
            // Disable "disable" attribute
            document.getElementById('newAccountDistrict').disabled = false;
            document.getElementById('newAccountWard').disabled = false;
            return;
        }
    
        // Phuong or quan or So
        if (SelectedRole != "3") {
            document.getElementById('newAccountDistrict').disabled = false;
            document.getElementById('newAccountWard').disabled = true;
            if (SelectedRole == "1") {
                document.getElementById('newAccountWard').disabled = false;
            }
        }
        else {
            document.getElementById('newAccountDistrict').disabled = true;
            document.getElementById('newAccountWard').disabled = true;
        }
    });
}


// Add data phuong base on Quan
var accountDistrict = document.getElementById("newAccountDistrict");
if (accountDistrict != null) {
    accountDistrict.addEventListener("change", (e) => {
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
    
        var phuongElement = document.getElementById("newAccountWard");
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
}


async function createAcc(e) {
    e.preventDefault()

    const formData = new FormData(document.getElementById("newAccountCreateForm"))
    const data = Object.fromEntries(formData.entries())

    console.log(data);
    //newAccountName, newAccountPhone, newAccountUserName, newAccountPass, newAccountRole, newAccountDistrict, newAccountWard
    let res = await fetch('/so/nhansu', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    location.reload();
}

/* For Địa Điểm quảng cáo */
// Config logic for chuc vu and khu vuc
var adLocationBtn = document.getElementById('newAdLocationButton');
if (adLocationBtn != null) {
    adLocationBtn.addEventListener("click", (e) => {
        // Set every things back to default value
        document.getElementById('newAdLocationForm').value = "";
        document.getElementById('newLocationType').value = "";
        document.getElementById('newAdLocationDistrict').value = "";
        document.getElementById('newAdLocationWard').value = "";
    
    });
}

// Add data phuong base on Quan
var adLocationDistrict = document.getElementById("newAdLocationDistrict");
if (adLocationDistrict != null) {
    adLocationDistrict.addEventListener("change", (e) => {
        // Lấy value của option quận đang chọn (e.target)
        var selectedOption = e.target.options[e.target.selectedIndex];
    
        // console.log("Quan",selectedOption);
        // console.log("Phuong",selectedOption.dataset.wards);
        // Lọc ra những phường theo quận đang chọn
        var newPhuongOptions = [];
        // Access the data-wards attribute using dataset
        if (selectedOption != null && selectedOption != undefined) {
            // Các phường của quận đang chọn
            var dataWardsValue = JSON.parse(selectedOption.dataset.wards); // Có thể chưa chọn j
            // console.log("dataWardsValue", dataWardsValue)
            if (dataWardsValue != undefined || dataWardsValue != null)
                // Loop qua các key để add vào newPhuongOptions
                Object.values(dataWardsValue).forEach(function (phuong) {
                    // console.log("phuong", phuong);
                    newPhuongOptions.push({value: phuong.idPhuong, text: phuong.name});
                });
        }
    
        var phuongElement = document.getElementById("newAdLocationWard");
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
}

async function createAdLocation(e) {
    e.preventDefault()

    const formData = new FormData(document.getElementById("newAdLocationCreateForm"))
    const data = Object.fromEntries(formData.entries())

    console.log(data);
    //newAdLocationForm, newLocationType, newAdLocationDistrict, newAdLocationWard, newAdLocationAddress
    let res = await fetch('/so/thongtindiadiemquangcao', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    location.reload();
}