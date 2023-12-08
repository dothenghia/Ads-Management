const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with class 'adDetailBtn'
    var adDetailButtons = document.querySelectorAll('.table-detail-button');

    // Iterate over each button and add a click event listener
    adDetailButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // Get the data-ad-details attribute containing the specific data as a string

        // Parse the string into a JavaScript object
        var reportDetails = JSON.parse(button.dataset.reportDetails)[0];
        var reportAddress = button.dataset.reportAddress;
        var adLocationDetails = JSON.parse(button.dataset.adLocationDetails)[0];

        // Update the modal content with the specific data
        $i('reportDetailAddress').textContent = reportAddress;
        $i('reportDetailForm').textContent = reportDetails.reportForm;
        if (reportDetails.status == "Đang xử lý")
            $i('reportDetailStatus').innerHTML = `
                <div class="status-tag status-tag-dangxuly">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"> <circle cx="12" cy="12" r="10"></circle> <polyline points="12 6 12 12 16 14"></polyline> </svg>
                    <span class='status-tag__title'>${reportDetails.status}</span>
                </div>
            `;
        if (reportDetails.status == "Đã xử lý")
            $i('reportDetailStatus').innerHTML = `
                <div class="status-tag status-tag-daxuly">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"> <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path> <polyline points="22 4 12 14.01 9 11.01"></polyline> </svg>
                    <span class='status-tag__title'>${reportDetails.status}</span>
                </div>
            `;
        if (reportDetails.status == "Từ chối")
            $i('reportDetailStatus').innerHTML = `
                <div class="status-tag status-tag-tuchoi">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"> <circle cx="12" cy="12" r="10"></circle> <line x1="15" y1="9" x2="9" y2="15"></line> <line x1="9" y1="9" x2="15" y2="15"></line> </svg>
                    <span class='status-tag__title'>${reportDetails.status}</span>
                </div>
            `;
        $i('reportDetailTime').textContent = reportDetails.time;
        $i('reportDetailFullname').textContent = reportDetails.fullname;
        $i('reportDetailEmail').textContent = reportDetails.email;
        $i('reportDetailPhone').textContent = reportDetails.phone;
        $i('reportDetailContent').textContent = reportDetails.content;
        let reportThumbnails = $i('reportDetailThumbnails').querySelector(".carousel-inner");
        if (adLocationDetails && adLocationDetails.thumbnails.length > 0) {
            reportThumbnails.style.display = "block";
            $i("reportDetailNoThumbnails").style.display = "none"
            
            reportThumbnails.querySelector(".carousel-item.active img").src = adLocationDetails.thumbnails[0].url;

            let templateSlide = reportThumbnails.querySelector(".carousel-item:not(.active)").cloneNode(true);

            // Destroy all old slides
            reportThumbnails.querySelectorAll(".carousel-item:not(.active)").forEach((slide) => {
                slide.parentElement.removeChild(slide);
            })

            if (adLocationDetails.thumbnails.length > 1) {
                let i = 0;
                adLocationDetails.thumbnails.forEach((thumbnail) => {
                    if (i > 0) {
                        let slideClone = templateSlide.cloneNode(true);
                        slideClone.querySelector("img").src = thumbnail.url;
                        reportThumbnails.appendChild(slideClone);
                    }
                    i++;
                });
            }
        }
        else {
            reportThumbnails.style.display = "none";
            $i("reportDetailNoThumbnails").style.display = "block"
        }

        // Show the modal
        $('#reportDetailModal').modal('show');
      });
    });

    // Change filter buttons to match current filters
    let urlParams = (new URL(window.location.href)).searchParams;
    if (urlParams.has("reportTypeId"))
        document.querySelector('#reportTypeFilter').value = urlParams.get("reportTypeId");
    if (urlParams.has("reportFormId"))
        document.querySelector('#reportFormFilter').value = urlParams.get("reportFormId");
    if (urlParams.has("statusId"))
        document.querySelector('#statusFilter').value = urlParams.get("statusId");
});

// Filter functions
const filters = (new URL(window.location.href)).searchParams;

function reportTypeFilter(reportTypeId) {
    if (reportTypeId != "all")
        filters.set("reportTypeId", reportTypeId);
    else
        filters.delete("reportTypeId");
    window.location.href = "?" + filters.toString();
}

function reportFormFilter(reportFormId) {
    if (reportFormId != "all")
        filters.set("reportFormId", reportFormId);
    else
        filters.delete("reportFormId");
    window.location.href = "?" + filters.toString();
}

function statusFilter(statusId) {
    if (statusId != "all")
        filters.set("statusId", statusId);
    else
        filters.delete("statusId");
    window.location.href = "?" + filters.toString();
}