// Config logic for chuc vu and khu vuc
document.getElementById('newAccountButton').addEventListener("click", (e) => {
    // Set every things back to default value
    document.getElementById('newAccountRole').value = "";
    document.getElementById('newAccountDistrict').value = "";
    document.getElementById('newAccountWard').value = "";

    // Disable "disable" attribute
    document.getElementById('newAccountDistrict').disabled = false;
    document.getElementById('newAccountWard').disabled = false;
});

// Add logic to role selection
document.getElementById('newAccountRole').addEventListener("change", (e) => {
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

// Add data phuong base on Quan
document.getElementById("newAccountDistrict").addEventListener("change", (e) => {
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