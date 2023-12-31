const $i = document.getElementById.bind(document);

document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with class 'adDetailBtn'
    var adDetailButtons = document.querySelectorAll('.table-detail-button');

    // Iterate over each button and add a click event listener
    adDetailButtons.forEach(function (button) {
    button.addEventListener('click', async function () {
        // View report detail button
        if (button.id != "reportUpdateButton") {
            // Parse the string into a JavaScript object
            var reportDetails = JSON.parse(button.dataset.reportDetails)[0];
            var adLocationDetails = JSON.parse(button.dataset.adLocationDetails)[0];
            let adAreas = JSON.parse(button.dataset.adAreas);

            let reportAddress;
            if (reportDetails.reportType == "ddbk") {
                reportAddress = await getAreaInfo(reportDetails.longitude, reportDetails.latitude, 1);
            }
            else {
                let reportDistrict = adAreas.filter((district) => district.idQuan == adLocationDetails.idQuan)[0];
                let reportWard = reportDistrict.wards.filter((ward) => ward.idPhuong == adLocationDetails.idPhuong)[0];
                reportAddress = adLocationDetails.address + ", " + reportWard.name + ", " + reportDistrict.name;
            }
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
            let dateObject = new Date(reportDetails.time);
            let time = dateObject.getDate().toString().padStart(2, 0) + "/" + (dateObject.getMonth() + 1).toString().padStart(2, 0) + "/" + dateObject.getFullYear();
            $i('reportDetailTime').textContent = time;
            $i('reportDetailFullname').textContent = reportDetails.fullname;
            $i('reportDetailEmail').textContent = reportDetails.email;
            $i('reportDetailPhone').textContent = reportDetails.phone;
            $i('reportDetailContent').innerHTML = reportDetails.content;
            if (reportDetails.solution == "")
                $i('reportDetailSolution').innerHTML = `<i>(Báo cáo chưa được xử lý)</i>`;
            else
                $i('reportDetailSolution').textContent = reportDetails.solution;
            let reportThumbnails = $i('reportDetailThumbnails').querySelector(".carousel-inner");
            // Destroy old children first
            while (reportThumbnails.firstChild) {
                reportThumbnails.removeChild(reportThumbnails.lastChild);
            }
            if (reportDetails && reportDetails.images.length > 0) {
                reportThumbnails.style.display = "block";
                $i("reportDetailNoThumbnails").style.display = "none"
                
                let i = 0;
                reportDetails.images.forEach((thumbnail) => {
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

                    reportThumbnails.appendChild(slide);

                    i++;
                });
            }
            else {
                reportThumbnails.style.display = "none";
                $i("reportDetailNoThumbnails").style.display = "block"
            }
    
            // Show the modal
            $('#reportDetailModal').modal('show');
        }
        // Update report detail button
        else {
            // Parse the string into a JavaScript object
            var reportDetails = JSON.parse(button.dataset.reportDetails)[0];
            var adLocationDetails = JSON.parse(button.dataset.adLocationDetails)[0];
            let reportId = button.dataset.id;
            let accountRole = button.dataset.accountRole;
            let adAreas = JSON.parse(button.dataset.adAreas);

            let reportAddress;
            if (reportDetails.reportType == "ddbk") {
                reportAddress = await getAreaInfo(reportDetails.longitude, reportDetails.latitude, 1);
            }
            else {
                let reportDistrict = adAreas.filter((district) => district.idQuan == adLocationDetails.idQuan)[0];
                let reportWard = reportDistrict.wards.filter((ward) => ward.idPhuong == adLocationDetails.idPhuong)[0];
                reportAddress = adLocationDetails.address + ", " + reportDistrict.name + ", " + reportWard.name;
            }
            // Update the modal content with the specific data
            $i('reportUpdateAddress').textContent = reportAddress;
            $i('reportUpdateForm').textContent = reportDetails.reportForm;
            if (reportDetails.status == "Đang xử lý")
                $i('reportUpdateStatus').innerHTML = `
                    <div class="status-tag status-tag-dangxuly">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"> <circle cx="12" cy="12" r="10"></circle> <polyline points="12 6 12 12 16 14"></polyline> </svg>
                        <span class='status-tag__title'>${reportDetails.status}</span>
                    </div>
                `;
            if (reportDetails.status == "Đã xử lý")
                $i('reportUpdateStatus').innerHTML = `
                    <div class="status-tag status-tag-daxuly">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"> <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path> <polyline points="22 4 12 14.01 9 11.01"></polyline> </svg>
                        <span class='status-tag__title'>${reportDetails.status}</span>
                    </div>
                `;
            if (reportDetails.status == "Từ chối")
                $i('reportUpdateStatus').innerHTML = `
                    <div class="status-tag status-tag-tuchoi">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"> <circle cx="12" cy="12" r="10"></circle> <line x1="15" y1="9" x2="9" y2="15"></line> <line x1="9" y1="9" x2="15" y2="15"></line> </svg>
                        <span class='status-tag__title'>${reportDetails.status}</span>
                    </div>
                `;
            let dateObject = new Date(reportDetails.time);
            let time = "Ngày " + dateObject.getDate().toString().padStart(2, 0) + " tháng " + (dateObject.getMonth() + 1).toString().padStart(2, 0) + " năm " + dateObject.getFullYear();
            $i('reportUpdateTime').textContent = time;
            $i('reportUpdateFullname').textContent = reportDetails.fullname;
            $i('reportUpdateEmail').textContent = reportDetails.email;
            $i('reportUpdatePhone').textContent = reportDetails.phone;
            $i('reportUpdateContent').innerHTML = reportDetails.content;
            let reportThumbnails = $i('reportUpdateThumbnails').querySelector(".carousel-inner");
            // Destroy old children first
            while (reportThumbnails.firstChild) {
                reportThumbnails.removeChild(reportThumbnails.lastChild);
            }
            if (reportDetails && reportDetails.images.length > 0) {
                reportThumbnails.style.display = "block";
                $i("reportUpdateNoThumbnails").style.display = "none"
                
                let i = 0;
                reportDetails.images.forEach((thumbnail) => {
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

                    reportThumbnails.appendChild(slide);

                    i++;
                });
            }
            else {
                reportThumbnails.style.display = "none";
                $i("reportUpdateNoThumbnails").style.display = "block"
            }
    
            // Show the modal
            $('#reportUpdateModal').modal('show');

            

            // Listen to edit
            $i('reportUpdateChoiceAccept').addEventListener("click", () => {
                acceptReport(accountRole, reportId);
            });
            $i('reportUpdateChoiceDeny').addEventListener("click", () => {
                denyReport(accountRole, reportId)
            });
        }
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

async function acceptReport(accountRole, id) {
    let solution = document.querySelector("#reportUpdateSolution").value
    if (solution == "") {
        alert("Vui lòng nhập phương thức xử lý");
        return;
    }

    let res = await fetch(`/${accountRole}/baocao/chapnhan/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, solution: solution }),
    });
    
    location.reload();
}

async function denyReport(accountRole, id) {
    let solution = document.querySelector("#reportUpdateSolution").value
    if (solution == "") {
        alert("Vui lòng nhập phương thức xử lý");
        return;
    }

    let res = await fetch(`/${accountRole}/baocao/tuchoi/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, solution: solution }),
    });
    
    location.reload();
}

// Process address
async function getAreaInfo(longitude, latitude, type = 0) {
    const token = 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ';
    let fetchResult = await (await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${token}`)).json();
    
    if (type == 0)  // Return only wards and districts
        return fetchResult.features[3].text + ", " + fetchResult.features[1].text;
    else        // Return all details
        return fetchResult.features[0].text + ", " + fetchResult.features[3].text + ", " + fetchResult.features[1].text;
}

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