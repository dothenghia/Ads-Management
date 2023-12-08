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
        if (adOldDetails.thumbnails.length > 0) {
            changeReqDetailOldThumbnails.style.display = "block";
            $i("changeReqDetailOldNoThumbnails").style.display = "none"

            changeReqDetailOldThumbnails.querySelector(".carousel-item.active img").src = adOldDetails.thumbnails[0].url;

            let templateSlide = changeReqDetailOldThumbnails.querySelector(".carousel-item:not(.active)").cloneNode(true);

            // Destroy all old slides
            changeReqDetailOldThumbnails.querySelectorAll(".carousel-item:not(.active)").forEach((slide) => {
                slide.parentElement.removeChild(slide);
            })

            if (adOldDetails.thumbnails.length > 1) {
                let i = 0;
                adOldDetails.thumbnails.forEach((thumbnail) => {
                    if (i > 0) {
                        let slideClone = templateSlide.cloneNode(true);
                        slideClone.querySelector("img").src = thumbnail.url;
                        changeReqDetailOldThumbnails.appendChild(slideClone);
                    }
                    i++;
                });
            }
        }
        else {
            changeReqDetailOldThumbnails.style.display = "none";
            $i("changeReqDetailOldNoThumbnails").style.display = "block"
        }

        let changeReqDetailNewThumbnails = $i('changeReqDetailNewThumbnails').querySelector(".carousel-inner");
        if (adNewDetails.thumbnails.length > 0) {
            changeReqDetailNewThumbnails.style.display = "block";
            $i("changeReqDetailNewNoThumbnails").style.display = "none"

            changeReqDetailNewThumbnails.querySelector(".carousel-item.active img").src = adNewDetails.thumbnails[0].url;

            let templateSlide = changeReqDetailNewThumbnails.querySelector(".carousel-item:not(.active)").cloneNode(true);

            // Destroy all old slides
            changeReqDetailNewThumbnails.querySelectorAll(".carousel-item:not(.active)").forEach((slide) => {
                slide.parentElement.removeChild(slide);
            })

            if (adNewDetails.thumbnails.length > 1) {
                let i = 0;
                adNewDetails.thumbnails.forEach((thumbnail) => {
                    if (i > 0) {
                        let slideClone = templateSlide.cloneNode(true);
                        slideClone.querySelector("img").src = thumbnail.url;
                        changeReqDetailNewThumbnails.appendChild(slideClone);
                    }
                    i++;
                });
            }
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