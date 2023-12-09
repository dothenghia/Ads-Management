const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with class 'adDetailBtn'
    var adDetailButtons = document.querySelectorAll('.table-detail-button');

    // Iterate over each button and add a click event listener
    adDetailButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Get the data-ad-details attribute containing the specific data as a string

        // Parse the string into a JavaScript object
        var adDetails = JSON.parse(button.dataset.adDetails)[0];
        var adLocationDetails = JSON.parse(button.dataset.adLocationDetails);
        var adAddress = button.dataset.adAddress;

        // Update the modal content with the specific data
        $i('adDetailAddress').textContent = adAddress
        $i('adDetailName').textContent = adDetails.name;
        $i('adDetailType').textContent = adLocationDetails.adType;
        $i('adDetailForm').textContent = adLocationDetails.adForm;
        $i('adDetailLocationType').textContent = adLocationDetails.locationType;
        $i('adDetailContractDate').querySelector('#adDetailContractDateStart').textContent = adDetails.contractStartDate;
        $i('adDetailContractDate').querySelector('#adDetailContractDateEnd').textContent = adDetails.contractEndDate;
        $i('adDetailSize').textContent = adDetails.size;
        let adThumbnails = $i('adDetailThumbnails').querySelector(".carousel-inner");
        if (adDetails.thumbnails.length > 0) {
            adThumbnails.style.display = "block";
            $i("adDetailNoThumbnails").style.display = "none"

            adThumbnails.querySelector(".carousel-item.active img").src = adDetails.thumbnails[0].url;

            let templateSlide = adThumbnails.querySelector(".carousel-item:not(.active)").cloneNode(true);

            // Destroy all old slides
            adThumbnails.querySelectorAll(".carousel-item:not(.active)").forEach((slide) => {
                slide.parentElement.removeChild(slide);
            })

            if (adDetails.thumbnails.length > 1) {
                let i = 0;
                adDetails.thumbnails.forEach((thumbnail) => {
                    if (i > 0) {
                        let slideClone = templateSlide.cloneNode(true);
                        slideClone.querySelector("img").src = thumbnail.url;
                        adThumbnails.appendChild(slideClone);
                    }
                    i++;
                });
            }
        }
        else {
            adThumbnails.style.display = "none";
            $i("adDetailNoThumbnails").style.display = "block"
        }

        // Show the modal
        $('#adDetailModal').modal('show');
      });
    });

    // Change filter buttons to match current filters
    let urlParams = (new URL(window.location.href)).searchParams;
    if (urlParams.has("adTypeId"))
        document.querySelector('#adTypeFilter').value = urlParams.get("adTypeId");
    if (urlParams.has("adFormId"))
        document.querySelector('#adFormFilter').value = urlParams.get("adFormId");
    if (urlParams.has("locationTypeId"))
        document.querySelector('#locationTypeFilter').value = urlParams.get("locationTypeId");
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