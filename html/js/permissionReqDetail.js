const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    /* View permission request detail button */
    // Get all elements with class 'adDetailBtn'
    var adDetailButtons = document.querySelectorAll('.table-detail-button');

    // Iterate over each button and add a click event listener
    adDetailButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Parse the string into a JavaScript object
        console.log(button.dataset.permissionReqDetails);
        var permissionReqDetails = JSON.parse(button.dataset.permissionReqDetails);
        var adLocationDetails = JSON.parse(button.dataset.adLocationDetails)[0];
        var adAddress = button.dataset.adAddress;

        // Update the modal content with the specific data
        $i('permissionReqDetailAddress').textContent = adAddress;
        $i('permissionReqDetailCoName').textContent = "Công ty " + permissionReqDetails.co.name;
        $i('permissionReqDetailCoPhone').textContent = permissionReqDetails.co.phone;
        $i('permissionReqDetailCoEmail').textContent = permissionReqDetails.co.email;
        $i('permissionReqDetailName').textContent = permissionReqDetails.name;
        $i('permissionReqDetailSize').textContent = permissionReqDetails.size;
        $i('permissionReqDetailContractDate').textContent = "Làm sao làm cái này???";
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

        // Show the modal
        $('#permissionReqDetailModal').modal('show');
      });
    });

    /* View permission request detail button */
    let newPermissionReqButton = document.querySelector('#newPermissionReqButton');
    newPermissionReqButton.addEventListener('click', function() {
        // Show the modal
        $('#newPermissionReqModal').modal('show');
    });

    // Change filter buttons to match current filters
    let urlParams = (new URL(window.location.href)).searchParams;
    if (urlParams.has("coId"))
        document.querySelector('#coFilter').value = urlParams.get("coId");
    if (urlParams.has("statusId"))
        document.querySelector('#statusFilter').value = urlParams.get("statusId");
});

// Filter functions
const filters = (new URL(window.location.href)).searchParams;

function coFilter() {
    let coId = document.querySelector("#coFilter").value
    if (coId != "all")
        filters.set("coId", coId);
    else
        filters.delete("coId");
    console.log("fdsafsd");

    return false;
}

function statusFilter(statusId) {
    if (statusId != "all")
        filters.set("statusId", statusId);
    else
        filters.delete("statusId");
    window.location.href = "?" + filters.toString();
}