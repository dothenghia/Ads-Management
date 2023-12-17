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

// Process address
async function getAreaInfo(longitude, latitude) {
    const token = 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ';
    let fetchResult = await (await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${token}`)).json();
    
    return fetchResult.features[3].text + ", " + fetchResult.features[1].text;
}