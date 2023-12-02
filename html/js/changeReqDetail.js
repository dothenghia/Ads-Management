const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with class 'adDetailBtn'
    var adDetailButtons = document.querySelectorAll('.table-detail-button');

    // Iterate over each button and add a click event listener
    adDetailButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Get the data-ad-details attribute containing the specific data as a string

        // Parse the string into a JavaScript object
        var adOldLocationDetails = JSON.parse(button.dataset.adOldLocationDetails)[0];
        var adNewLocationDetails = JSON.parse(button.dataset.adNewLocationDetails)[0];

        // Update the modal content with the specific data
        $i('changeReqDetailOldAddr').textContent = adOldLocationDetails.idDuong + ", " + adOldLocationDetails.idPhuong + ", " + adOldLocationDetails.idQuan;
        $i('changeReqDetailNewAddr').textContent = adNewLocationDetails.idDuong + ", " + adNewLocationDetails.idPhuong + ", " + adNewLocationDetails.idQuan;
        $i('changeReqDetailOldSize').textContent = adOldLocationDetails.size;
        $i('changeReqDetailNewSize').textContent = adNewLocationDetails.size;
        $i('changeReqDetailOldCnt').textContent = adOldLocationDetails.quantity;
        $i('changeReqDetailNewCnt').textContent = adNewLocationDetails.quantity;
        $i('changeReqDetailOldForm').textContent = adOldLocationDetails.form;
        $i('changeReqDetailNewForm').textContent = adNewLocationDetails.form;
        $i('changeReqDetailOldLocationType').textContent = adOldLocationDetails.locationType;
        $i('changeReqDetailNewLocationType').textContent = adNewLocationDetails.locationType;

        // Show the modal
        $('#changeReqDetailModal').modal('show');
      });
    });
});