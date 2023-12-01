const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with class 'adDetailBtn'
    var adDetailButtons = document.querySelectorAll('.adDetailBtn');

    // Iterate over each button and add a click event listener
    adDetailButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Get the data-ad-details attribute containing the specific data as a string

        // Parse the string into a JavaScript object
        var adDetails = JSON.parse(button.dataset.adDetails)[0];
        var adLocationDetails = JSON.parse(button.dataset.adLocationDetails)[0];

        // Update the modal content with the specific data
        $i('adDetailAddress').textContent = adLocationDetails.idDuong + ", " + adLocationDetails.idPhuong + ", " + adLocationDetails.idQuan;
        $i('adDetailName').textContent = adDetails.name;
        $i('adDetailType').textContent = adLocationDetails.type;
        $i('adDetailForm').textContent = adLocationDetails.form;
        $i('adDetailLocationType').textContent = adLocationDetails.locationType;
        $i('adDetailContractDate').textContent = "Làm sao làm cái này???";
        $i('adDetailSize').textContent = adDetails.size;
        let adThumbnails = $i('adDetailThumbnails').querySelector(".carousel-inner");
        if (adDetails.thumbnails.length > 0) {
            console.log(adDetails.thumbnails[0]);
            adThumbnails.querySelector(".carousel-item.active img").src = adDetails.thumbnails[0].url;

            let inactiveSlide = adThumbnails.querySelector(".carousel-item:not(.active)");
            if (adDetails.thumbnails.length > 1) {
                let i = 0;
                adDetails.thumbnails.forEach((thumbnail) => {
                    if (i > 0) {
                        let slideClone = inactiveSlide.cloneNode(true);
                        slideClone.querySelector("img").src = thumbnail.url;
                        adThumbnails.appendChild(slideClone);
                    }
                    i++;
                });
            }
            inactiveSlide.style.display = "none";
        }
        else {
            adThumbnails.style.display = "none";
            $i("adDetailNoThumbnails").style.display = "block"
        }

        // Show the modal
        $('#adDetailModal').modal('show');
      });
    });
});