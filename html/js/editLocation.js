
// Style Drop area and allow to drop files
var fileStorage = [];

var editBtn = document.querySelectorAll(".edit-button");
if (editBtn != null) {
    editBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            console.log("Edit button clicked");
            // Clear fileStorage and restore initial state
            fileStorage = [];
            document.getElementById('editfileInput').value = "";
            document.getElementById('edit-file-list').innerHTML = "";
            document.getElementById('edit-file-list').outerHTML = '<ul id="edit-file-list" class="list-unstyled d-none"></ul>';
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

            console.log("locationId", locationId);

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
    // JavaScript for handling drag-and-drop functionality
    if (document.getElementById('edit-drop-area') != null) {
        document.getElementById('edit-drop-area').addEventListener('dragover', function (e) {
            e.preventDefault();
            this.classList.add('hover');
        });
    
        document.getElementById('edit-drop-area').addEventListener('dragleave', function (e) {
            e.preventDefault();
            this.classList.remove('hover');
        });
    
        document.getElementById('edit-drop-area').addEventListener('drop', function (e) {
            e.preventDefault();
            this.classList.remove('hover');
    
            var files = e.dataTransfer.files;
            handleFiles(files);
        });
    
        // Handling file input change
        document.getElementById('editfileInput').addEventListener('change', function () {
            var files = this.files;
            handleFiles(files);
        });
    
        // Additional handling for clicking the drop area to trigger file input
        document.getElementById('edit-click-span').addEventListener('click', function () {
            document.getElementById('editfileInput').click();
        });
    
        function handleFiles(files) {
            var fileList = document.getElementById('edit-file-list');
            fileList.classList.remove('d-none');
    
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var listItem = document.createElement('li');
                listItem.className = 'file-item';
                listItem.textContent = file.name;
                fileList.appendChild(listItem);
    
                fileStorage.push(file);
            }
        }
    } 
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

// // Add data phuong base on Quan to filter select
// var filteradLocationDistrict = document.getElementById("filterAdLocationDistrict");
// if (filteradLocationDistrict != null) {
//     filteradLocationDistrict.addEventListener("change", (e) => {
//         // Lấy value của option quận đang chọn (e.target)
//         var selectedOption = e.target.options[e.target.selectedIndex];
    
//         // console.log("Quan",selectedOption);
//         // console.log("Phuong",selectedOption.dataset.wards);
//         // Lọc ra những phường theo quận đang chọn
//         var newPhuongOptions = [];
//         // Access the data-wards attribute using dataset
//         if (selectedOption != null && selectedOption != undefined) {
//             // Các phường của quận đang chọn
//             var dataWardsValue = JSON.parse(selectedOption.dataset.wards); // Có thể chưa chọn j
//             // console.log("dataWardsValue", dataWardsValue)
//             if (dataWardsValue != undefined || dataWardsValue != null)
//                 // Loop qua các key để add vào newPhuongOptions
//                 Object.values(dataWardsValue).forEach(function (phuong) {
//                     // console.log("phuong", phuong);
//                     newPhuongOptions.push({value: phuong.idPhuong, text: phuong.name});
//                 });
//         }
    
//         var phuongElement = document.getElementById("filterAdLocationWard");
//         // Clear existing options (optional)
//         phuongElement.innerHTML = '<option value="">Phường</option>';
    
//         // Add new options
//         newPhuongOptions.forEach(function (optionData) {
//             var option = document.createElement('option');
//             option.value = optionData.value;
//             option.text = optionData.text;
//             phuongElement.appendChild(option);
//         });
//     });
// }

async function editAdLocation(e) {
    e.preventDefault()

    // Remove disable attribute
    document.getElementById('EditAdLocationLattitude').disabled = false;
    document.getElementById('EditAdLocationLongtitude').disabled = false;
    var formData = new FormData(document.getElementById("EditAdLocationCreateForm"))
    
    // const data = Object.fromEntries(formData.entries())

    let res = await fetch('/so/thongtindiadiemquangcao', {
        method: 'PUT',
        body: formData
    })

    location.reload();
}