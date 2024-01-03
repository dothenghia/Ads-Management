const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with class 'adDetailBtn'
    var adDetailButtons = document.querySelectorAll('.table-detail-button');

    // Iterate over each button and add a click event listener
    adDetailButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // Get the data-ad-details attribute containing the specific data as a string
        // Parse the string into a JavaScript object
        var locOldDetails = JSON.parse(button.dataset.locOldDetails)[0];
        var locNewDetails = JSON.parse(button.dataset.locNewDetails);
        var changeLocReqId = button.dataset.changeLocReqId;
        console.log(changeLocReqId);
        var accountRole = button.dataset.accountRole;
        var status = button.dataset.status;
        var reason = button.dataset.reason;

        // Update the modal content with the specific data
        $i('changeLocReqDetailOldAdForm').textContent = locOldDetails.adForm;
        $i('changeLocReqDetailNewAdForm').textContent = locNewDetails.adForm;
        $i('changeLocReqDetailOldAdType').textContent = locOldDetails.adType;
        $i('changeLocReqDetailNewAdType').textContent = locNewDetails.adType;
        $i('changeLocReqDetailOldLocationType').textContent = locOldDetails.locationType;
        $i('changeLocReqDetailNewLocationType').textContent = locNewDetails.locationType;
        $i('changeLocReqDetailReason').textContent = reason;


        var accept = document.getElementById('changeLocReqDetailChoiceAccept');
        var deny = document.getElementById('changeLocReqDetailChoiceDeny');
        if (accept != null && deny != null) {
            // Show confirm /cancel btn
            if (status == 0) {
                document.getElementById('changeLocReqDetailChoiceAccept').style.display = "block";
                document.getElementById('changeLocReqDetailChoiceDeny').style.display = "block";
            } else {
                document.getElementById('changeLocReqDetailChoiceAccept').style.display = "none";
                document.getElementById('changeLocReqDetailChoiceDeny').style.display = "none";
            }

            // Add event listeners to buttons accept/deny
            document.getElementById('changeLocReqDetailChoiceAccept').addEventListener('click', () => {
                acceptChange(accountRole, changeLocReqId);
                updateAdLocationInfoData(accountRole, locOldDetails.locationId, locNewDetails.adForm, locNewDetails.adType, locNewDetails.locationType);
            });
            document.getElementById('changeLocReqDetailChoiceDeny').addEventListener('click', () => {
                denyChange(accountRole, changeLocReqId);
            });
        }
        

        // Show the modal
        $('#changeLocReqDetailModal').modal('show');
      });
    });

    let newPermissionReqButton = document.querySelector('#newChangeLocReqButton');
    if (newPermissionReqButton != null) {
        newPermissionReqButton.addEventListener('click', function() {
            // Show the modal
            $('#newChangeLocReqModal').modal('show');
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
    var changeLocReqDistrict = document.querySelector("#newChangeLocReqDistrict");
    if (changeLocReqDistrict != null) {
        document.querySelector("#newChangeLocReqDistrict").value = "all";
    }
});

// Accept request for so
async function acceptChange(accountRole, id) {
    let res = await fetch(`/${accountRole}/dieuchinhdiadiem/chapnhan/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    });
    
    location.reload();
}

async function denyChange(accountRole, id) {
    let res = await fetch(`/${accountRole}/dieuchinhdiadiem/tuchoi/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    });
    
    location.reload();
}

async function updateAdLocationInfoData(accountRole, locationId,  adForm,  adType, locationType) {
    var formData = new FormData();
    
    formData.append('EditAdLocationId', locationId);
    formData.append('EditAdLocationForm', adForm);
    formData.append('EditAdType', adType);
    formData.append('EditLocationType', locationType);
    const data = Object.fromEntries(formData.entries())
    console.log("data: ",data);

    var res = await fetch(`/${accountRole}/thongtindiadiemquangcao`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    
}

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
    let wardSelect = document.querySelector("#newChangeLocReqWard");
    wardSelect.addEventListener('change', () => displayAddresses(document.querySelector('#newChangeLocReqWard')));
    if (selectedOptions.value == "all") {
        document.querySelector("#newChangeLocReqAllContent").style.display = "none";
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
            option.dataset.adLocations = JSON.stringify(ward.adLocations);
            wardSelect.appendChild(option);
        })
    }
    
    // Reset address selector as well
    let addressSelect = document.querySelector("#newChangeLocReqAddress");
    addressSelect.value = "all"
    while (addressSelect.children.length > 1) {
        addressSelect.removeChild(addressSelect.lastChild);
    }
}
function displayAddresses(selectElement) {
    let selectedOptions = selectElement.selectedOptions[0];
    let addressSelect = document.querySelector("#newChangeLocReqAddress");
    if (selectedOptions.value == "all") {
        document.querySelector("#newChangeLocReqAllContent").style.display = "none";
        while (addressSelect.children.length > 1) {
            addressSelect.removeChild(addressSelect.lastChild);
        }
    }
    else {
        let wardAdLocations = JSON.parse(selectedOptions.dataset.adLocations)
        // Destroy old children (except the first one) first
        while (addressSelect.children.length > 1) {
            addressSelect.removeChild(addressSelect.lastChild);
        }
        wardAdLocations.forEach((loc) => {
            let option = document.createElement("option");
            option.value = loc.locationId;
            option.innerText = loc.address;
            option.dataset.locDetail = JSON.stringify(loc);
            addressSelect.appendChild(option);
        });

        addressSelect.addEventListener('change', () => {
            if (addressSelect.value == "all") {
                document.querySelector("#newChangeLocReqAllContent").style.display = "none";
                return;
            }
            document.querySelector("#newChangeLocReqAllContent").style.display = "block";
    
            let selectedOption = addressSelect.selectedOptions[0];
            let locDetail = JSON.parse(selectedOption.dataset.locDetail);

            $i("newChangeLocReqId").value = locDetail.locationId;
            $i("newChangeLocReqOldAdForm").value = locDetail.adForm;
            $i("newChangeLocReqOldAdType").value = locDetail.adType;
            $i("newChangeLocReqOldLocationType").value = locDetail.locationType;

        });
    }
}