const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with class 'adDetailBtn'
    var adDetailButtons = document.querySelectorAll('.table-detail-button');

    // Iterate over each button and add a click event listener
    adDetailButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // Get the data-ad-details attribute containing the specific data as a string
        // Parse the string into a JavaScript object
        var adOldDetails = JSON.parse(button.dataset.adOldDetails)[0];
        var adNewDetails = JSON.parse(button.dataset.adNewDetails);
        var changeReqId = button.dataset.changeReqId;
        console.log(changeReqId);
        var accountRole = button.dataset.accountRole;
        var status = button.dataset.status;
        var reason = button.dataset.reason;

        // Update the modal content with the specific data
        $i('changeReqDetailOldName').textContent = adOldDetails.name;
        $i('changeReqDetailNewName').textContent = adNewDetails.name;
        $i('changeReqDetailOldSize').textContent = adOldDetails.size;
        $i('changeReqDetailNewSize').textContent = adNewDetails.size;
        $i('changeReqDetailReason').textContent = reason;

        let changeReqDetailOldThumbnails = $i('changeReqDetailOldThumbnails').querySelector(".carousel-inner");
        // Destroy old children first
        while (changeReqDetailOldThumbnails.firstChild) {
            changeReqDetailOldThumbnails.removeChild(changeReqDetailOldThumbnails.lastChild);
        }
        // Add new children
        if (adOldDetails.thumbnails.length > 0 && adOldDetails.thumbnails[0].url != "") {
            changeReqDetailOldThumbnails.style.display = "block";
            $i("changeReqDetailOldNoThumbnails").style.display = "none";

            let i = 0;
            adOldDetails.thumbnails.forEach((thumbnail) => {
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

                changeReqDetailOldThumbnails.appendChild(slide);

                i++;
            });
        }
        else {
            changeReqDetailOldThumbnails.style.display = "none";
            $i("changeReqDetailOldNoThumbnails").style.display = "block"
        }

        let changeReqDetailNewThumbnails = $i('changeReqDetailNewThumbnails').querySelector(".carousel-inner");
        // Destroy old children first
        while (changeReqDetailNewThumbnails.firstChild) {
            changeReqDetailNewThumbnails.removeChild(changeReqDetailNewThumbnails.lastChild);
        }
        // Add new children
        if (adNewDetails.thumbnails.length > 0 && adNewDetails.thumbnails[0].url != "") {
            changeReqDetailNewThumbnails.style.display = "block";
            $i("changeReqDetailNewNoThumbnails").style.display = "none";

            let i = 0;
            adNewDetails.thumbnails.forEach((thumbnail) => {
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

                changeReqDetailNewThumbnails.appendChild(slide);

                i++;
            });
        }
        else {
            changeReqDetailNewThumbnails.style.display = "none";
            $i("changeReqDetailNewNoThumbnails").style.display = "block"
        }

        // Show confirm /cancel btn
        if (status == 0) {
            document.getElementById('changeReqDetailChoiceAccept').style.display = "block";
            document.getElementById('changeReqDetailChoiceDeny').style.display = "block";
        } else {
            document.getElementById('changeReqDetailChoiceAccept').style.display = "none";
            document.getElementById('changeReqDetailChoiceDeny').style.display = "none";
        }

        // Update the modal's button's event
        document.getElementById('changeReqDetailChoiceAccept').addEventListener('click', () => {
            acceptChange(accountRole, changeReqId);
            updateAdsInfoData(accountRole, adOldDetails.adId, adNewDetails.size, adNewDetails.name, adNewDetails.thumbnails);
        });
        document.getElementById('changeReqDetailChoiceDeny').addEventListener('click', () => {
            denyChange(accountRole, changeReqId);
        });

        // Show the modal
        $('#changeReqDetailModal').modal('show');

        });
    });

    let newPermissionReqButton = document.querySelector('#newChangeReqButton');
    if (newPermissionReqButton != null) {
        newPermissionReqButton.addEventListener('click', function() {
            // Show the modal
            $('#newChangeReqModal').modal('show');
        });
    }
    

    // Change filter buttons to match current filters
    let urlParams = (new URL(window.location.href)).searchParams;
    if (urlParams.has("reasonId"))
        document.querySelector('#reasonFilter').value = urlParams.get("reasonId");
    if (urlParams.has("statusId"))
        document.querySelector('#statusFilter').value = urlParams.get("statusId");
    if (urlParams.has("roleId")) 
        document.querySelector('#roleFilter').value = urlParams.get("roleId");

    // Set default location selectors' value to "all"
    if (document.querySelector("#newChangeReqDistrict") != null)
        document.querySelector("#newChangeReqDistrict").value = "all";

    // Style Drop area and allow to drop files
    var fileStorage = [];
    // JavaScript for handling drag-and-drop functionality
    if (document.getElementById('drop-area') != null) {
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
    }
    

    // Handling file input change
    if (document.getElementById('fileInput') != null)
        document.getElementById('fileInput').addEventListener('change', function () {
            var files = this.files;
            handleFiles(files);
        });

    // Additional handling for clicking the drop area to trigger file input
    if (document.getElementById('click-span') != null)
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

function reasonFilter(reasonId) {
    if (reasonId != "all")
        filters.set("reasonId", reasonId);
    else
        filters.delete("reasonId");
    window.location.href = "?" + filters.toString();
}

function statusFilter(statusId) {
    if (statusId != "all")
        filters.set("statusId", statusId);
    else
        filters.delete("statusId");
    window.location.href = "?" + filters.toString();
}

function roleFilter(roleId) {
    if (roleId != "all")
        filters.set("roleId", roleId);
    else
        filters.delete("roleId");
    window.location.href = "?" + filters.toString();
}

// Create new reqs functions
function displayWards(selectElement) {
    let selectedOptions = selectElement.selectedOptions[0];
    let wardSelect = document.querySelector("#newChangeReqWard");
    wardSelect.addEventListener('change', () => displayAds(document.querySelector('#newChangeReqWard')));
    if (selectedOptions.value == "all") {
        document.querySelector("#newChangeReqAllContent").style.display = "none";
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
            option.dataset.ads = JSON.stringify(ward.ads);
            wardSelect.appendChild(option);
        })
    }
    
    // Reset address selector as well
    let adSelect = document.querySelector("#newChangeReqAd");
    adSelect.value = "all"
    while (adSelect.children.length > 1) {
        adSelect.removeChild(adSelect.lastChild);
    }
}
function displayAds(selectElement) {
    let selectedOptions = selectElement.selectedOptions[0];
    let adSelect = document.querySelector("#newChangeReqAd");
    if (selectedOptions.value == "all") {
        document.querySelector("#newChangeReqAllContent").style.display = "none";
        while (adSelect.children.length > 1) {
            adSelect.removeChild(adSelect.lastChild);
        }
    }
    else {
        let wardAds = JSON.parse(selectedOptions.dataset.ads);
        // Destroy old children (except the first one) first
        while (adSelect.children.length > 1) {
            adSelect.removeChild(adSelect.lastChild);
        }
        wardAds.forEach((ad) => {
            let option = document.createElement("option");
            option.value = ad.adId;
            option.innerText = ad.name;
            option.dataset.adDetail = JSON.stringify(ad);

            adSelect.appendChild(option);
        })

        adSelect.addEventListener('change', () => {
            if (adSelect.value == "all") {
                document.querySelector("#newChangeReqAllContent").style.display = "none";
                return;
            }
            document.querySelector("#newChangeReqAllContent").style.display = "block";
    
            let selectedOption = adSelect.selectedOptions[0];
            let adDetail = JSON.parse(selectedOption.dataset.adDetail);
            
            $i("newChangeReqId").value = adDetail.adId;
            $i("newChangeReqOldName").value = adDetail.name;
            $i("newChangeReqOldSize").value = adDetail.size;

            let newChangeReqThumbnails = $i('newChangeReqThumbnails').querySelector(".carousel-inner");
            // Destroy old children first
            while (newChangeReqThumbnails.firstChild) {
                newChangeReqThumbnails.removeChild(newChangeReqThumbnails.lastChild);
            }
            if (adDetail.thumbnails.length > 0 && adDetail.thumbnails[0].url != "") {
                newChangeReqThumbnails.style.display = "block";
                $i("newChangeReqNoThumbnails").style.display = "none"

                let i = 0;
                adDetail.thumbnails.forEach((thumbnail) => {
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

                    newChangeReqThumbnails.appendChild(slide);

                    i++;
                });
            }
            else {
                newChangeReqThumbnails.style.display = "none";
                $i("newChangeReqNoThumbnails").style.display = "block"
            }
        });
    }
}

// Accept request for so
async function acceptChange(accountRole, id) {
    let res = await fetch(`/${accountRole}/dieuchinh/chapnhan/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    });
    
    location.reload();
}

async function denyChange(accountRole, id) {
    let res = await fetch(`/${accountRole}/dieuchinh/tuchoi/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    });
    
    location.reload();
}

async function updateAdsInfoData(accountRole, adId,  size,  adName, thumbnails) {
    var formData = new FormData();
    
    formData.append('adId', adId);
    formData.append('newSize', size);
    formData.append('newAdName', adName);
    const data = Object.fromEntries(formData.entries())
    console.log("data: ",data);
    console.log("thumbnails: ",thumbnails);

    var res_IdHighest = await fetch(`/${accountRole}/thongtinquangcao`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            data: data,
            thumbnails: thumbnails[0].url != "" ? thumbnails : null,
        }),
    });

    
}