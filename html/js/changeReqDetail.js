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
        var accountRole = button.dataset.accountRole;
        var status = button.dataset.status;

        // Update the modal content with the specific data
        $i('changeReqDetailOldName').textContent = adOldDetails.name;
        $i('changeReqDetailNewName').textContent = adNewDetails.name;
        $i('changeReqDetailOldSize').textContent = adOldDetails.size;
        $i('changeReqDetailNewSize').textContent = adNewDetails.size;

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

        if (status != 0) {
            $i('changeReqDetailChoiceAccept').style.display = 'none';
            $i('changeReqDetailChoiceDeny').style.display = 'none';
        }
        else {
            $i('changeReqDetailChoiceAccept').addEventListener("click", () => { acceptChange(accountRole, changeReqId) } );
            $i('changeReqDetailChoiceDeny').addEventListener("click", () => { denyChange(accountRole, changeReqId) } );
        }

        // Show the modal
        $('#changeReqDetailModal').modal('show');
      });
    });

    // Change filter buttons to match current filters
    let urlParams = (new URL(window.location.href)).searchParams;
    if (urlParams.has("reasonId"))
        document.querySelector('#reasonFilter').value = urlParams.get("reasonId");
    if (urlParams.has("statusId"))
        document.querySelector('#statusFilter').value = urlParams.get("statusId");
});

async function acceptChange(accountRole, id) {
    let res = await fetch(`/${accountRole}/yeucaudieuchinh/chapnhan/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    });
    
    location.reload();
}

async function denyChange(accountRole, id) {
    let res = await fetch(`/${accountRole}/yeucaudieuchinh/tuchoi/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    });
    
    location.reload();
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