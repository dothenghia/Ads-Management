const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with class 'adDetailBtn'
    var adDetailButtons = document.querySelectorAll('.table-detail-button');

    // Iterate over each button and add a click event listener
    adDetailButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Get the data-ad-details attribute containing the specific data as a string

        // Parse the string into a JavaScript object
        var permissionReqDetails = JSON.parse(button.dataset.permissionReqDetails)[0];
        var adDetails = JSON.parse(button.dataset.adDetails)[0];
        var adLocationDetails = JSON.parse(button.dataset.adLocationDetails)[0];
        var adAddress = button.dataset.adAddress;

        // Update the modal content with the specific data
        $i('permissionReqDetailAddress').textContent = adAddress;
        $i('permissionReqDetailCoName').textContent = "Công ty " + permissionReqDetails.co.name;
        $i('permissionReqDetailCoPhone').textContent = permissionReqDetails.co.phone;
        $i('permissionReqDetailCoEmail').textContent = permissionReqDetails.co.email;
        $i('permissionReqDetailSize').textContent = adDetails.size;
        $i('permissionReqDetailContractDate').textContent = "Làm sao làm cái này???";
        $i('permissionReqDetailContent').textContent = permissionReqDetails.content;
        let permissionReqThumbnails = $i('permissionReqDetailThumbnails').querySelector(".carousel-inner");
        if (adLocationDetails.thumbnails.length > 0) {
            permissionReqThumbnails.style.display = "block";
            $i("permissionReqDetailNoThumbnails").style.display = "none"

            permissionReqThumbnails.querySelector(".carousel-item.active img").src = adLocationDetails.thumbnails[0].url;

            let templateSlide = permissionReqThumbnails.querySelector(".carousel-item:not(.active)").cloneNode(true);

            // Destroy all old slides
            permissionReqThumbnails.querySelectorAll(".carousel-item:not(.active)").forEach((slide) => {
                slide.parentElement.removeChild(slide);
            })

            if (adLocationDetails.thumbnails.length > 1) {
                let i = 0;
                adLocationDetails.thumbnails.forEach((thumbnail) => {
                    if (i > 0) {
                        let slideClone = templateSlide.cloneNode(true);
                        slideClone.querySelector("img").src = thumbnail.url;
                        permissionReqThumbnails.appendChild(slideClone);
                    }
                    i++;
                });
            }
        }
        else {
            permissionReqThumbnails.style.display = "none";
            $i("permissionReqDetailNoThumbnails").style.display = "block"
        }

        // Show the modal
        $('#permissionReqDetailModal').modal('show');
      });
    });

    // Change filter buttons to match current filters
    let urlParams = (new URL(window.location.href)).searchParams;
    if (urlParams.has("coId"))
        document.querySelector('#coFilter').value = urlParams.get("coId");
});

function coFilter(coId) {
    if (coId != "all") {
        const filters = new URLSearchParams({coId: coId}).toString();
        window.location.href = "?" + filters;
    }
    else window.location.href = "?";
}