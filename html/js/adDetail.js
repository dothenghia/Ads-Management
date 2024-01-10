const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with class 'adDetailBtn'
    var adDetailButtons = document.querySelectorAll('.table-detail-button');

    // Iterate over each button and add a click event listener
    adDetailButtons.forEach(function (button) {
        button.addEventListener('click', async function () {
            // Get the data-ad-details attribute containing the specific data as a string

            // Parse the string into a JavaScript object
            var adDetails = JSON.parse(button.dataset.adDetails)[0];
            var adLocationDetails = JSON.parse(button.dataset.adLocationDetails);
            var adAddress = button.dataset.adAddress;

            let areaInfo = await getAreaInfo(adLocationDetails.longitude, adLocationDetails.latitude);

            // Update the modal content with the specific data
            $i('adDetailAddress').textContent = adLocationDetails.address + ", " + areaInfo;
            $i('adDetailName').textContent = adDetails.name;
            $i('adDetailType').textContent = adLocationDetails.adType;
            $i('adDetailForm').textContent = adLocationDetails.adForm;
            $i('adDetailLocationType').textContent = adLocationDetails.locationType;

            let startDateObject = new Date(adDetails.contractStartDate);
            let startDate = "Ngày " + startDateObject.getDate().toString().padStart(2, 0) + " tháng " + (startDateObject.getMonth() + 1).toString().padStart(2, 0) + " năm " + startDateObject.getFullYear();
            $i('adDetailContractDate').querySelector('#adDetailContractDateStart').textContent = startDate;

            let endDateObject = new Date(adDetails.contractEndDate);
            let endDate = "Ngày " + endDateObject.getDate().toString().padStart(2, 0) + " tháng " + (endDateObject.getMonth() + 1).toString().padStart(2, 0) + " năm " + endDateObject.getFullYear();
            $i('adDetailContractDate').querySelector('#adDetailContractDateEnd').textContent = endDate;

            $i('adDetailSize').textContent = adDetails.size;
            let adThumbnails = $i('adDetailThumbnails').querySelector(".carousel-inner");
            // Destroy old children first
            while (adThumbnails.firstChild) {
                adThumbnails.removeChild(adThumbnails.lastChild);
            }
            if (adDetails.thumbnails.length > 0 && adDetails.thumbnails[0].url != "") {
                adThumbnails.style.display = "block";
                $i("adDetailNoThumbnails").style.display = "none"

                let i = 0;
                adDetails.thumbnails.forEach((thumbnail) => {
                    let slide = document.createElement("div");
                    if (i == 0) {
                        slide.classList.add("carousel-item", "active");
                    }
                    else {
                        slide.classList.add("carousel-item");
                    }

                    let slideImg = document.createElement("img");
                    slideImg.classList.add("d-block");
                    slideImg.src = thumbnail.url;
                    slide.appendChild(slideImg);

                    adThumbnails.appendChild(slide);

                    i++;
                });
            }
            else {
                adThumbnails.style.display = "none";
                $i("adDetailNoThumbnails").style.display = "block"
            }

            // Show the modal
            $('#adDetailModal').modal('show');
        });
    });

    /* View permission request detail button */
    let newPermissionReqButton = document.querySelector('#newPermissionReqButton');
    if (newPermissionReqButton != null) {
        newPermissionReqButton.addEventListener('click', function() {
            // Adjust location selector's data
            let idQuan = newPermissionReqButton.dataset.idQuan;
            if (idQuan != undefined) {
                let districtChooser = document.querySelector('#newPermissionReqDistrict');
                districtChooser.value = idQuan;
                districtChooser.disabled = true;
                districtChooser.style.backgroundColor = "#d6d6d6";
                districtChooser.dispatchEvent(new Event("change"));

                let idPhuong = newPermissionReqButton.dataset.idPhuong;
                if (idPhuong != undefined) {
                    let wardChooser = document.querySelector('#newPermissionReqWard');
                    wardChooser.value = idPhuong;
                    wardChooser.disabled = true;
                    wardChooser.style.backgroundColor = "#d6d6d6";
                    wardChooser.dispatchEvent(new Event("change"));
                }
            }

            // Show the modal
            $('#newPermissionReqModal').modal('show');
        });
    }
    

    // Change filter buttons to match current filters
    let urlParams = (new URL(window.location.href)).searchParams;
    if (urlParams.has("adTypeId"))
        document.querySelector('#adTypeFilter').value = urlParams.get("adTypeId");
    if (urlParams.has("adFormId"))
        document.querySelector('#adFormFilter').value = urlParams.get("adFormId");
    if (urlParams.has("locationTypeId"))
        document.querySelector('#locationTypeFilter').value = urlParams.get("locationTypeId");
    if (urlParams.has("wardId"))
        document.querySelector('#wardFilter').value = urlParams.get("wardId");
    if (urlParams.has("idQuan"))
        document.querySelector('#filterAdLocationDistrict').value = urlParams.get("idQuan");
    if (urlParams.has("locationPlanningState"))
        document.querySelector('#locationPlanningFilter').value = urlParams.get("locationPlanningState");

    // Style Drop area and allow to drop files
    var fileStorage = [];

    // Handling file input change
    document.getElementById('fileInput').addEventListener('change', function () {
        var files = this.files;
        handleFiles(files);
    });

    // Additional handling for clicking the drop area to trigger file input
    document.getElementById('click-span').addEventListener('click', function () {
        document.getElementById('fileInput').click();
    });

    function handleFiles(files) {
        var fileList = document.getElementById('file-list');
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
    
    // Add data phuong base on Quan to filter select
    var filteradLocationDistrict = document.getElementById("filterAdLocationDistrict");
    if (filteradLocationDistrict != null) {
        
            // Lấy value của option quận đang chọn (e.target)
            var selectedOption = filteradLocationDistrict.options[filteradLocationDistrict.selectedIndex];
        
            // console.log("Quan",selectedOption);
            // console.log("Phuong",selectedOption.dataset.wards);
            // Lọc ra những phường theo quận đang chọn
            var newPhuongOptions = [];
            // Access the data-wards attribute using dataset
            if (selectedOption != null && selectedOption != undefined && selectedOption.dataset.wards != undefined) {
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
        
            var phuongElement = document.getElementById("filterAdLocationWard");
            // Clear existing options (optional)
            phuongElement.innerHTML = '<option value="">Phường</option>';
        
            // Add new options
            newPhuongOptions.forEach(function (optionData) {
                var option = document.createElement('option');
                option.value = optionData.value;
                option.text = optionData.text;
                phuongElement.appendChild(option);
            });
    }

    if (urlParams.has("idPhuong"))
        document.querySelector('#filterAdLocationWard').value = urlParams.get("idPhuong");


    var resetImageBtn = document.getElementById("imageResetBtn");
    if (resetImageBtn) {
        resetImageBtn.addEventListener("click", function () {
            fileStorage = [];
            document.getElementById('fileInput').value = "";
            document.getElementById('file-list').innerHTML = "";
            document.getElementById('file-list').outerHTML = '<ul id="file-list" class="list-unstyled d-none"></ul>';
        });
    }
});

// Filter functions
const filters = (new URL(window.location.href)).searchParams;
function adTypeFilter(adTypeId) {
    if (adTypeId != "all")
        filters.set("adTypeId", adTypeId);
    else
        filters.delete("adTypeId");
    window.location.href = "?" + filters.toString();
}
function adFormFilter(adFormId) {
    if (adFormId != "all")
        filters.set("adFormId", adFormId);
    else
        filters.delete("adFormId");
    window.location.href = "?" + filters.toString();
}
function locationTypeFilter(locationTypeId) {
    if (locationTypeId != "all")
        filters.set("locationTypeId", locationTypeId);
    else
        filters.delete("locationTypeId");
    window.location.href = "?" + filters.toString();
}
function wardFilter(wardId) {
    if (wardId != "all")
        filters.set("wardId", wardId);
    else
        filters.delete("wardId");
    window.location.href = "?" + filters.toString();
}
function idQuanFilter(idQuan) {
    if (idQuan != "all")
        filters.set("idQuan", idQuan);
    else {
        filters.delete("idQuan");
        filters.delete("idPhuong");
    }
    window.location.href = "?" + filters.toString();
}
function idPhuongFilter(idPhuong) {
    if (idPhuong != "all")
        filters.set("idPhuong", idPhuong);
    else
        filters.delete("idPhuong");
    window.location.href = "?" + filters.toString();
}
function locationPlanningFilter(locationPlanningState) {
    if ( locationPlanningState != "all")
        filters.set("locationPlanningState", locationPlanningState );
    else
        filters.delete("locationPlanningState");
    window.location.href = "?" + filters.toString();
}

// Create new reqs functions
function displayWards(selectElement) {
    let selectedOptions = selectElement.selectedOptions[0];
    console.log(selectElement.selectedOptions);
    let wardSelect = document.querySelector("#newPermissionReqWard");
    wardSelect.addEventListener('change', () => displayAddresses(document.querySelector('#newPermissionReqWard')));
    if (selectedOptions.value == "") {
        while (wardSelect.children.length > 1) {
            wardSelect.removeChild(wardSelect.lastChild);
        }
    }
    else {
        let districtWards = JSON.parse(selectedOptions.dataset.wards)
        // Destroy old children (except the first one) first
        while (wardSelect.children.length > 1) {
            wardSelect.removeChild(wardSelect.lastChild);
        }
        districtWards.forEach((ward) => {
            let option = document.createElement("option");
            option.value = ward.idPhuong;
            option.text = ward.name;
            option.dataset.addresses = JSON.stringify(ward.adLocations);
            wardSelect.appendChild(option);
        })
    }
    
    // Reset address selector as well
    let addressSelect = document.querySelector("#newPermissionReqAddress");
    addressSelect.value = ""
    while (addressSelect.children.length > 1) {
        addressSelect.removeChild(addressSelect.lastChild);
    }
}
function displayAddresses(selectElement) {
    let selectedOptions = selectElement.selectedOptions[0];
    let addressSelect = document.querySelector("#newPermissionReqAddress");
    if (selectedOptions.value == "") {
        while (addressSelect.children.length > 1) {
            addressSelect.removeChild(addressSelect.lastChild);
        }
    }
    else {
        let wardAddresses = JSON.parse(selectedOptions.dataset.addresses)
        // Destroy old children (except the first one) first
        while (addressSelect.children.length > 1) {
            addressSelect.removeChild(addressSelect.lastChild);
        }
        wardAddresses.forEach((address) => {
            let option = document.createElement("option");
            option.value = address.locationId;
            option.innerText = address.address;
            addressSelect.appendChild(option);
        })
    }
}

// Process address
async function getAreaInfo(longitude, latitude) {
    const token = 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ';
    let fetchResult = await (await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${token}`)).json();
    
    return fetchResult.features[1].text + ", " + fetchResult.features[3].text;
}