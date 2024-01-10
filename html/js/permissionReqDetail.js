const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    /* View permission request detail button */
    // Get all elements with class 'adDetailBtn'
    var adDetailButtons = document.querySelectorAll('.table-detail-button');

    // Iterate over each button and add a click event listener
    adDetailButtons.forEach(function (button) {
    button.addEventListener('click', async function () {
        // Parse the string into a JavaScript object
        // console.log(button.dataset.permissionReqDetails);
        var permissionReqDetails = JSON.parse(button.dataset.permissionReqDetails);
        var adLocationDetails = JSON.parse(button.dataset.adLocationDetails)[0];
        var permissionReqId = button.dataset.permissionReqId;
        var status = button.dataset.status;
        var accountRole = button.dataset.accountRole;
        console.log(accountRole,permissionReqId, status);
        let areaInfo = await getAreaInfo(adLocationDetails.longitude, adLocationDetails.latitude);

        // Update the modal content with the specific data
        $i('permissionReqDetailAddress').textContent = adLocationDetails.address + ", " + areaInfo;
        $i('permissionReqDetailCoName').textContent = "Công ty " + permissionReqDetails.co.name;
        $i('permissionReqDetailCoPhone').textContent = permissionReqDetails.co.phone;
        $i('permissionReqDetailCoEmail').textContent = permissionReqDetails.co.email;
        $i('permissionReqDetailName').textContent = permissionReqDetails.name;
        $i('permissionReqDetailSize').textContent = permissionReqDetails.size;

        let startDateObject = new Date(permissionReqDetails.startdate);
        let startDate = "Ngày " + startDateObject.getDate().toString().padStart(2, 0) + " tháng " + (startDateObject.getMonth() + 1).toString().padStart(2, 0) + " năm " + startDateObject.getFullYear();
        $i('permissionReqDetailContractDate').querySelector('#permissionReqDetailContractDateStart').textContent = startDate;
        let endDateObject = new Date(permissionReqDetails.enddate);
        let endDate = "Ngày " + endDateObject.getDate().toString().padStart(2, 0) + " tháng " + (endDateObject.getMonth() + 1).toString().padStart(2, 0) + " năm " + endDateObject.getFullYear();
        $i('permissionReqDetailContractDate').querySelector('#permissionReqDetailContractDateEnd').textContent = endDate;

        $i('permissionReqDetailContent').textContent = permissionReqDetails.content;
        let permissionReqThumbnails = $i('permissionReqDetailThumbnails').querySelector(".carousel-inner");
        // Destroy old children first
        while (permissionReqThumbnails.firstChild) {
            permissionReqThumbnails.removeChild(permissionReqThumbnails.lastChild);
        }
        if (permissionReqDetails.thumbnails.length > 0 && permissionReqDetails.thumbnails[0].url != "") {
            permissionReqThumbnails.style.display = "block";
            $i("permissionReqDetailNoThumbnails").style.display = "none"

            let i = 0;
            permissionReqDetails.thumbnails.forEach((thumbnail) => {
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

                permissionReqThumbnails.appendChild(slide);

                i++;
            });
        }
        else {
            permissionReqThumbnails.style.display = "none";
            $i("permissionReqDetailNoThumbnails").style.display = "block"
        }

        var accept = document.getElementById('permissionReqDetailChoiceAccept');
        var deny = document.getElementById('permissionReqDetailChoiceDeny');
        if (accept != null && deny != null) {
            // Update the modal's button's event
            if (permissionReqDetails.status == 0) {
                document.getElementById('permissionReqDetailChoiceAccept').style.display = "block";
                document.getElementById('permissionReqDetailChoiceDeny').style.display = "block";
            } else {
                document.getElementById('permissionReqDetailChoiceAccept').style.display = "none";
                document.getElementById('permissionReqDetailChoiceDeny').style.display = "none";
            }

            document.getElementById('permissionReqDetailChoiceAccept').addEventListener('click', () => {
                acceptChange(accountRole, permissionReqId);
                updateAdsInfoData(accountRole, adLocationDetails.locationId, "", permissionReqDetails.size, permissionReqDetails.startdate, permissionReqDetails.enddate, permissionReqDetails.name, permissionReqDetails.thumbnails)
            });
            document.getElementById('permissionReqDetailChoiceDeny').addEventListener('click', () => {
                denyChange(accountRole, permissionReqId);
            });
        }
        

        // Show the modal
        $('#permissionReqDetailModal').modal('show');

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
    if (urlParams.has("coId"))
        document.querySelector('#coFilter').value = urlParams.get("coId");
    if (urlParams.has("statusId"))
        document.querySelector('#statusFilter').value = urlParams.get("statusId");
    if (urlParams.has("addressId"))
        document.querySelector('#addressFilter').value = urlParams.get("addressId");
    if (urlParams.has("wardId"))
        document.querySelector('#wardFilter').value = urlParams.get("wardId");


    // Set default location selectors' value to "all"
    var newPermissionReqDistrict = document.querySelector("#newPermissionReqDistrict");
    if (newPermissionReqDistrict != null) newPermissionReqDistrict.value = "";

    // Style Drop area and allow to drop files
    var fileStorage = [];
    
    // JavaScript for handling drag-and-drop functionality
    document.getElementById('drop-area').addEventListener('dragover', function (e) {
        e.preventDefault();
        this.classList.add('hover');
    });

    document.getElementById('drop-area').addEventListener('dragleave', function (e) {
        e.preventDefault();
        this.classList.remove('hover');
    });

    document.getElementById('drop-area').addEventListener('drop', function (e) {
        e.preventDefault();
        this.classList.remove('hover');

        var files = e.dataTransfer.files;
        handleFiles(files);
    });

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


});

// Filter functions
const filters = (new URL(window.location.href)).searchParams;

function coFilter(coId) {
    if (coId != "all")
        filters.set("coId", coId);
    else
        filters.delete("coId");
    window.location.href = "?" + filters.toString();
}

function addressFilter(addressId) {
    if (addressId != "all")
        filters.set("addressId", addressId);
    else
        filters.delete("addressId");
    window.location.href = "?" + filters.toString();
}

function statusFilter(statusId) {
    if (statusId != "all")
        filters.set("statusId", statusId);
    else
        filters.delete("statusId");
    window.location.href = "?" + filters.toString();
}

function wardFilter(wardId) {
    if (wardId != "all")
        filters.set("wardId", wardId);
    else
        filters.delete("wardId");
    window.location.href = "?" + filters.toString();
}

// Process address
async function getAreaInfo(longitude, latitude, type = 0) {
    const token = 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ';
    let fetchResult = await (await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${token}`)).json();
    
    if (type == 0)  // Return only wards and districts
        return fetchResult.features[1].text + ", " + fetchResult.features[3].text;
    else        // Return all details
        return fetchResult.features[0].text + ", " + fetchResult.features[1].text + ", " + fetchResult.features[3].text;
}

// Create new reqs functions
function displayWards(selectElement) {
    let selectedOptions = selectElement.selectedOptions[0];
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


// Accept request for so
async function acceptChange(accountRole, id) {
    let res = await fetch(`/${accountRole}/capphep/chapnhan/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    });
    
    location.reload();
}

async function denyChange(accountRole, id) {
    let res = await fetch(`/${accountRole}/capphep/tuchoi/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    });
    
    location.reload();
}


async function updateAdsInfoData(accountRole, locationId, reportId, size, contractStartDate, contractEndDate, adName, thumbnails) {
    var formData = new FormData();
    
    formData.append('reportId', reportId);
    formData.append('size', size);
    formData.append('contractStartDate', contractStartDate);
    formData.append('contractEndDate', contractEndDate);
    formData.append('adName', adName);
    const data = Object.fromEntries(formData.entries())

    var res_IdHighest = await fetch(`/${accountRole}/thongtinquangcao`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            data: data,
            thumbnails: thumbnails,
        }),
    });

    console.log("LocationID: ", locationId);
    if (res_IdHighest.ok) {
        let idHighest = parseInt(await res_IdHighest.text());
        console.log("Id Highest: ",idHighest);
        var res = await fetch(`/${accountRole}/thongtindiadiemquangcao/${locationId}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                adId: idHighest,
            }),
        });
    }
}