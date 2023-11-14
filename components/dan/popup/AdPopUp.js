
/* Content khi click vào 1 điểm bất kì trên bản đồ. Lưu ý: Những thẻ p đang hiển thị data fixed, chưa có data thật
document.getElementById("Random").addEventListener('click', function () {
    var tooltipContent = `
    <div class="d-flex flex-row">
        <img src="./Image.svg" alt="RandomLocationImg" style="margin-right: 10px;">

        <div  class="container-fluid d-flex flex-column">
            <div class="m-0 pb-1"  style="border-bottom: 1.5px solid lightgray;">
                <p class="fw-semibold m-0 pb-1" style="font-size: 19px;">227 Nguyễn Văn Cừ</p>
                <p class="fw-normal m-0 pb-1" style="color: grey">Phường 4, Quận 5, Thành Phố Hồ Chí Minh</p>
            </div>

            <div class="m-0" style="min-height: 30px;">
                <div style=" float: left;" >
                    <p class="fw-semibold m-0 text-primary my-3">10.762721 - 106.682724</p>
                </div>
                
                <button class="btn btn-outline-primary text-start my-2 fw-semibold" type="submit" autocomplete="off" style="border: 2px solid; font-size:small; float: right;"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                    </svg>    
                    Phản hồi
                </button>
            </div>
        </div>

    </div>
    `;

    tippy('#Random', {
        content: tooltipContent,
        allowHTML: true,
        interactive: true,
        theme: 'translucent',
        maxWidth: null,
        onCreate(instance) {
            // Set the custom class for the tooltip
            instance.popper.classList.add('tippy-width-1');
        },
        placement: "top",
    });
});

*/

/* Content khi hoier vào 1 điểm hình thức quảng cáo (chưa quy hoạch, đã quy hoạch và 1 cái alert số quảng cáo) trên bản đồ. Lưu ý: Những thẻ p đang hiển thị data fixed, chưa có data thật
document.getElementById("HTQC-DQH").addEventListener('mouseover', function () {
    var tooltipContent = `
    <div class="container-fluid">
        <div class="border-bottom border-secondary border-1 text-center m-0" >
            <p class="fs-6 fw-semibold m-0 pb-1">Hình Thức Quảng Cáo</p>
        </div>
        <p class="fw-normal mt-1 mb-2" style="color: grey;">Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5</p>
        <p class="fw-normal mb-2"><span class="fw-semibold">Số quảng cáo:</span> 6</p>
        <p class="fw-normal mb-2"><span class="fw-semibold">Loại vị trí:</span> Đất công/Công viên/...</p>
        <p class="fs-7 fw-semibold m-0 rounded-3 text-center py-2" style="background-color: rgb(207,226,255); height: 35px; color: rgb(13,110,253); ">Đã quy hoạch</p>
        
    </div>
    `;

    tippy('#HTQC-DQH', {
        content: tooltipContent,
        allowHTML: true,
        interactive: true,
        theme: 'translucent',
        onCreate(instance) {
            // Set the custom class for the tooltip
            instance.popper.classList.add('tippy-width-1');
        },
        placement: "top",
    });
});
document.getElementById("HTQC-CQH").addEventListener('mouseover', function () {
    var tooltipContent = `
    <div class="container-fluid rounded-1">
        <div class="border-bottom border-secondary border-1 text-center m-0" >
            <p class="fs-6 fw-semibold m-0 pb-1">Hình Thức Quảng Cáo</p>
        </div>
        <p class="fw-normal mt-1 mb-2" style="color: grey;">Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5</p>
        <p class="fw-normal mb-2"><span class="fw-semibold">Số quảng cáo:</span> 0</p>
        <p class="fw-normal mb-2"><span class="fw-semibold">Loại vị trí:</span> Đất công/Công viên/...</p>
        <p class="fs-7 fw-semibold m-0 rounded-3 text-center py-2" style="background-color: rgb(215,248,255); height: 35px; color: rgb(11,214,233); ">Chưa quy hoạch</p>
        
    </div>
    `;

    tippy('#HTQC-CQH', {
        content: tooltipContent,
        allowHTML: true,
        interactive: true,
        theme: 'translucent',
        onCreate(instance) {
            // Set the custom class for the tooltip
            instance.popper.classList.add('tippy-width-1');
        },
        placement: "top",
    });
});
document.getElementById("HTQC-1").addEventListener('mouseover', function () {
    var tooltipContent = `
    <div class="container-fluid rounded-1">
        <div class="border-bottom border-secondary border-1 m-0 d-flex flex-row " >
            <p class="fs-6 fw-semibold m-0 pb-1 text-center " style="width: 90%; padding-left: 30px;">Hình Thức Quảng Cáo</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-1-circle-fill w-5 text-danger" viewBox="0 0 16 16" style="margin-top: 3px;">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312V4.002Z"/>
            </svg>
        </div>
        <p class="fw-normal mt-1 mb-2" style="color: grey;">Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5</p>
        <p class="fw-normal mb-2"><span class="fw-semibold">Số quảng cáo:</span> 6</p>
        <p class="fw-normal mb-2"><span class="fw-semibold">Loại vị trí:</span> Đất công/Công viên/...</p>
        <p class="fs-7 fw-semibold m-0 rounded-3 text-center py-2" style="background-color: rgb(207,226,255); height: 35px; color: rgb(13,110,253); ">Đã quy hoạch</p>
        
    </div>
    `;

    tippy('#HTQC-1', {
        content: tooltipContent,
        allowHTML: true,
        interactive: true,
        theme: 'translucent',
        onCreate(instance) {
            // Set the custom class for the tooltip
            instance.popper.classList.add('tippy-width-1');
        },
        placement: "top",
    });
});
*/

/* Content khi hoier vào 1 điểm Tố giác sai phạm (đang xử lý, đã xử lý, từ chối) trên bản đồ. Lưu ý: Những thẻ p đang hiển thị data fixed, chưa có data thật
document.getElementById("TGSP-DXL").addEventListener('mouseover', function () {
    var tooltipContent = `
    <div class="container-fluid rounded-1">
        <div class="border-bottom border-secondary border-1 text-center m-0" >
            <p class="fs-6 fw-semibold m-0 pb-1">Tố Giác Sai Phạm</p>
        </div>
        <p class="fw-normal mt-1 mb-2" style="color: grey;">Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5</p>
        <p class="fs-7 fw-semibold m-0 rounded-4 text-center py-2" 
            style="background-color: rgb(199,237,217); height: 35px; color: rgb(65,175,121); "> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                </svg>
                Đã Xử Lý
        </p>
        
    </div>
    `;

    tippy('#TGSP-DXL', {
        content: tooltipContent,
        allowHTML: true,
        interactive: true,
        theme: 'translucent',
        onCreate(instance) {
            // Set the custom class for the tooltip
            instance.popper.classList.add('tippy-width-1');
        },
        placement: "top",
    });
});
document.getElementById("TGSP-DGXL").addEventListener('mouseover', function () {
    var tooltipContent = `
    <div class="container-fluid rounded-1">
        <div class="border-bottom border-secondary border-1 text-center m-0" >
            <p class="fs-6 fw-semibold m-0 pb-1">Tố Giác Sai Phạm</p>
        </div>
        <p class="fw-normal mt-1 mb-2" style="color: grey;">Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5</p>
        <p class="fs-7 fw-semibold m-0 rounded-4 text-center py-2" 
            style="background-color: rgb(255,196,163); height: 35px; color: rgb(255,100,0); "> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>
                Đang Xử Lý
        </p>
        
    </div>
    `;

    tippy('#TGSP-DGXL', {
        content: tooltipContent,
        allowHTML: true,
        interactive: true,
        theme: 'translucent',
        onCreate(instance) {
            // Set the custom class for the tooltip
            instance.popper.classList.add('tippy-width-1');
        },
        placement: "top",
    });
});
document.getElementById("TGSP-TC").addEventListener('mouseover', function () {
    var tooltipContent = `
    <div class="container-fluid rounded-1">
        <div class="border-bottom border-secondary border-1 text-center m-0" >
            <p class="fs-6 fw-semibold m-0 pb-1">Tố Giác Sai Phạm</p>
        </div>
        <p class="fw-normal mt-1 mb-2" style="color: grey;">Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5</p>
        <p class="fs-7 fw-semibold m-0 rounded-4 text-center py-2" 
            style="background-color: rgb(251,191,191); height: 35px; color: rgb(220,53,69); "> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
                Từ Chối
        </p>
        
    </div>
    `;

    tippy('#TGSP-TC', {
        content: tooltipContent,
        allowHTML: true,
        interactive: true,
        theme: 'translucent',
        onCreate(instance) {
            // Set the custom class for the tooltip
            instance.popper.classList.add('tippy-width-1');
        },
        placement: "top",
    });
});
*/

/* Content khi hoier vào 1 điểm Đăng ký nội dung (đang xử lý, đã xử lý, từ chối) trên bản đồ. Lưu ý: Những thẻ p đang hiển thị data fixed, chưa có data thật
document.getElementById("DKND-DXL").addEventListener('mouseover', function () {
    var tooltipContent = `
    <div class="container-fluid rounded-1">
        <div class="border-bottom border-secondary border-1 text-center m-0" >
            <p class="fs-6 fw-semibold m-0 pb-1">Đăng Ký Nội Dung</p>
        </div>
        <p class="fw-normal mt-1 mb-2" style="color: grey;">Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5</p>
        <p class="fs-7 fw-semibold m-0 rounded-4 text-center py-2" 
            style="background-color: rgb(199,237,217); height: 35px; color: rgb(65,175,121); "> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                </svg>
                Đã Xử Lý
        </p>
        
    </div>
    `;

    tippy('#DKND-DXL', {
        content: tooltipContent,
        allowHTML: true,
        interactive: true,
        theme: 'translucent',
        onCreate(instance) {
            // Set the custom class for the tooltip
            instance.popper.classList.add('tippy-width-1');
        },
        placement: "top",
    });
});
document.getElementById("DKND-DGXL").addEventListener('mouseover', function () {
    var tooltipContent = `
    <div class="container-fluid rounded-1">
        <div class="border-bottom border-secondary border-1 text-center m-0" >
            <p class="fs-6 fw-semibold m-0 pb-1">Đăng Ký Nội Dung</p>
        </div>
        <p class="fw-normal mt-1 mb-2" style="color: grey;">Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5</p>
        <p class="fs-7 fw-semibold m-0 rounded-4 text-center py-2" 
            style="background-color: rgb(255,196,163); height: 35px; color: rgb(255,100,0); "> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>
                Đang Xử Lý
        </p>
        
    </div>
    `;

    tippy('#DKND-DGXL', {
        content: tooltipContent,
        allowHTML: true,
        interactive: true,
        theme: 'translucent',
        onCreate(instance) {
            // Set the custom class for the tooltip
            instance.popper.classList.add('tippy-width-1');
        },
        placement: "top",
    });
});
document.getElementById("DKND-TC").addEventListener('mouseover', function () {
    var tooltipContent = `
    <div class="container-fluid rounded-1">
        <div class="border-bottom border-secondary border-1 text-center m-0" >
            <p class="fs-6 fw-semibold m-0 pb-1">Đăng Ký Nội Dung</p>
        </div>
        <p class="fw-normal mt-1 mb-2" style="color: grey;">Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5</p>
        <p class="fs-7 fw-semibold m-0 rounded-4 text-center py-2" 
            style="background-color: rgb(251,191,191); height: 35px; color: rgb(220,53,69); "> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
                Từ Chối
        </p>
        
    </div>
    `;

    tippy('#DKND-TC', {
        content: tooltipContent,
        allowHTML: true,
        interactive: true,
        theme: 'translucent',
        onCreate(instance) {
            // Set the custom class for the tooltip
            instance.popper.classList.add('tippy-width-1');
        },
        placement: "top",
    });
});
*/

/* Content khi hoier vào 1 điểm Giải đáp thắc mắc (đang xử lý, đã xử lý, từ chối) trên bản đồ. Lưu ý: Những thẻ p đang hiển thị data fixed, chưa có data thật
document.getElementById("GDTM-DXL").addEventListener('mouseover', function () {
    var tooltipContent = `
    <div class="container-fluid rounded-1">
        <div class="border-bottom border-secondary border-1 text-center m-0" >
            <p class="fs-6 fw-semibold m-0 pb-1">Giải Đáp Thắc Mắc</p>
        </div>
        <p class="fw-normal mt-1 mb-2" style="color: grey;">Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5</p>
        <p class="fs-7 fw-semibold m-0 rounded-4 text-center py-2" 
            style="background-color: rgb(199,237,217); height: 35px; color: rgb(65,175,121); "> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                </svg>
                Đã Xử Lý
        </p>
        
    </div>
    `;

    tippy('#GDTM-DXL', {
        content: tooltipContent,
        allowHTML: true,
        interactive: true,
        theme: 'translucent',
        onCreate(instance) {
            // Set the custom class for the tooltip
            instance.popper.classList.add('tippy-width-1');
        },
        placement: "top",
    });
});
document.getElementById("GDTM-DGXL").addEventListener('mouseover', function () {
    var tooltipContent = `
    <div class="container-fluid rounded-1">
        <div class="border-bottom border-secondary border-1 text-center m-0" >
            <p class="fs-6 fw-semibold m-0 pb-1">Giải Đáp Thắc Mắc</p>
        </div>
        <p class="fw-normal mt-1 mb-2" style="color: grey;">Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5</p>
        <p class="fs-7 fw-semibold m-0 rounded-4 text-center py-2" 
            style="background-color: rgb(255,196,163); height: 35px; color: rgb(255,100,0); "> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>
                Đang Xử Lý
        </p>
        
    </div>
    `;

    tippy('#GDTM-DGXL', {
        content: tooltipContent,
        allowHTML: true,
        interactive: true,
        theme: 'translucent',
        onCreate(instance) {
            // Set the custom class for the tooltip
            instance.popper.classList.add('tippy-width-1');
        },
        placement: "top",
    });
});
document.getElementById("GDTM-TC").addEventListener('mouseover', function () {
    var tooltipContent = `
    <div class="container-fluid rounded-1">
        <div class="border-bottom border-secondary border-1 text-center m-0" >
            <p class="fs-6 fw-semibold m-0 pb-1">Giải Đáp Thắc Mắc</p>
        </div>
        <p class="fw-normal mt-1 mb-2" style="color: grey;">Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5</p>
        <p class="fs-7 fw-semibold m-0 rounded-4 text-center py-2" 
            style="background-color: rgb(251,191,191); height: 35px; color: rgb(220,53,69); "> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
                Từ Chối
        </p>
        
    </div>
    `;

    tippy('#GDTM-TC', {
        content: tooltipContent,
        allowHTML: true,
        interactive: true,
        theme: 'translucent',
        onCreate(instance) {
            // Set the custom class for the tooltip
            instance.popper.classList.add('tippy-width-1');
        },
        placement: "top",
    });
});
*/

export default function AdPopUp(props) { // Tùy biến param
    return ``
}
