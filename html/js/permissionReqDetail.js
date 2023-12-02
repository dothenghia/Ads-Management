const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with class 'adDetailBtn'
    var adDetailButtons = document.querySelectorAll('.table-detail-button');

    // Iterate over each button and add a click event listener
    adDetailButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Get the data-ad-details attribute containing the specific data as a string

        // Parse the string into a JavaScript object
        console.log(button.dataset.permissionReqDetails);
        var permissionReqDetails = JSON.parse(button.dataset.permissionReqDetails)[0];
        var adLocationDetails = JSON.parse(button.dataset.adLocationDetails)[0];

        // Update the modal content with the specific data
        $i('permissionReqDetailAddress').textContent = adLocationDetails.idDuong + ", " + adLocationDetails.idPhuong + ", " + adLocationDetails.idQuan;
        $i('permissionReqDetailName').textContent = adDetails.name;
        $i('permissionReqDetailType').textContent = adLocationDetails.type;
        $i('permissionReqDetailForm').textContent = adLocationDetails.form;
        $i('permissionReqDetailLocationType').textContent = adLocationDetails.locationType;
        $i('permissionReqDetailContractDate').textContent = "Làm sao làm cái này???";
        $i('permissionReqDetailSize').textContent = adDetails.size;
        let adThumbnails = $i('permissionReqDetailThumbnails').querySelector(".carousel-inner");
        if (adDetails.thumbnails.length > 0) {
            console.log(adDetails.thumbnails[0]);
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
            $i("permissionReqDetailNoThumbnails").style.display = "block"
        }

        // Show the modal
        $('#permissionReqDetailModal').modal('show');
      });
    });
});