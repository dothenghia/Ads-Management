var editBtn = document.querySelectorAll(".edit-button");
if (editBtn != null) {
    editBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            console.log("Edit button clicked");
            // Page, account role
            let page = btn.dataset.page;
            let accountRole = btn.dataset.accountRole;

            // Get data
            let locationId = btn.dataset.id;
            let idQuan = btn.dataset.quanId;
            let idPhuong = btn.dataset.phuongId;
            let address = btn.dataset.address;
            let latitude = btn.dataset.latitude;
            let longitude = btn.dataset.longitude;
            let locationType = btn.dataset.locationType;
            let adForm = btn.dataset.adForm;
            let adType = btn.dataset.adType;

            // Set data
            document.getElementById("EditAdLocationId").value = locationId;
            document.getElementById("EditAdType").value = adType;
            document.getElementById("EditAdLocationForm").value = adForm;
            document.getElementById("EditLocationType").value = locationType;
            document.getElementById("EditAdLocationAddrs").value = address;
            document.getElementById("EditAdLocationLattitude").value = latitude;
            document.getElementById("EditAdLocationLongtitude").value = longitude;

            // Special
            var adLocationDistrict = document.getElementById("EditAdLocationDistrict");
            adLocationDistrict.value = idQuan; // Set district
            // Lấy value của option quận đang chọn (e.target)
            var selectedOption = adLocationDistrict.options[adLocationDistrict.selectedIndex];
        
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
        
            var phuongElement = document.getElementById("EditAdLocationWard");
            // Clear existing options (optional)
            phuongElement.innerHTML = '<option value="">Phường</option>';
        
            // Add new options
            newPhuongOptions.forEach(function (optionData) {
                var option = document.createElement('option');
                option.value = optionData.value;
                option.text = optionData.text;
                phuongElement.appendChild(option);
            });
            document.getElementById("EditAdLocationWard").value = idPhuong;

            // Set map to display none
            document.querySelector('#mapDisplay').style.display = 'none';

            // open the modal
            const modal = new bootstrap.Modal(document.getElementById('EditAdLocationModal'));
            modal.show();
        });
    });
}

// Add data phuong base on Quan
var adLocationDistrict = document.getElementById("EditAdLocationDistrict");
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
    
        var phuongElement = document.getElementById("EditAdLocationWard");
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

var adLocationWard = document.getElementById("EditAdLocationWard");
if (adLocationWard != null) {
    adLocationWard.addEventListener("change", (e) => {
        var adLocationAddrs = document.getElementById("EditAdLocationAddrs");
        adLocationAddrs.value = "";
    });
}


async function editAdLocation(e) {
    e.preventDefault()

    // Remove disable attribute
    document.getElementById('EditAdLocationLattitude').disabled = false;
    document.getElementById('EditAdLocationLongtitude').disabled = false;
    const formData = new FormData(document.getElementById("EditAdLocationCreateForm"))
    const data = Object.fromEntries(formData.entries())

    console.log(data);
    let res = await fetch('/so/thongtindiadiemquangcao', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    location.reload();
}