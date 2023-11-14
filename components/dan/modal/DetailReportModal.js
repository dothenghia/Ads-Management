
export default function DetailReportModal(Type, State) {
    var fetchData = async () => {
        if (Type == 'LC') document.querySelector('.modal-root').innerHTML = renderLCReport();
        else document.querySelector('.modal-root').innerHTML = renderQCReport();

        switch (State) {
            case 1: Inprogress();
            break;
            case 2: Done();
            break;
            case 3: Deny();
            break;
        }
    }

    fetchData();

    function Inprogress(){
        var InProgress = document.createElement('p');
        InProgress.className = 'fs-7 fw-semibold m-0 rounded-4 text-center mt-1';
        InProgress.style.backgroundColor = 'rgb(255,196,163)';
        InProgress.style.color = 'rgb(255,100,0)';
        InProgress.style.width = '142px';
        InProgress.style.height = '30px';
        InProgress.style.padding = '2px 0';

        InProgress.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16" style="margin-bottom: 2px;">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
            </svg>
            Đang Xử Lý
        `;

        document.querySelector('#TTXLY').appendChild(InProgress);
    }

    function Done(){
        var Done = document.createElement('p');
        Done.className = 'fs-7 fw-semibold m-0 rounded-4 text-center mt-1';
        Done.style.backgroundColor = 'rgb(199,237,217)';
        Done.style.color = 'rgb(65,175,121)';
        Done.style.width = '142px';
        Done.style.height = '30px';
        Done.style.padding = '2px 0';

        Done.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16" style="margin-bottom: 2px;">
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
            </svg>
            Đã Xử Lý
        `;

        document.querySelector('#TTXLY').appendChild(Done);
    }

    function Deny(){
        var Deny = document.createElement('p');
        Deny.className = 'fs-7 fw-semibold m-0 rounded-4 text-center mt-1';
        Deny.style.backgroundColor = 'rgb(251,191,191)';
        Deny.style.color = 'rgb(220,53,69)';
        Deny.style.width = '142px';
        Deny.style.height = '30px';
        Deny.style.padding = '2px 0';

        Deny.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16" style="margin-bottom: 2px;">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            Từ Chối
        `;

        document.querySelector('#TTXLY').appendChild(Deny);
    }

    function renderLCReport () {
        return `
        <div class="modal fade" id="DetailLCReport" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document" style="width: 70%;">
                <div class="modal-content">
                    <div class="modal-header d-flex flex-column">
                        <div class="w-100 d-flex flex-row">
                            <h5 class="modal-title text-center w-100" id="modalTitleId" style="padding-left: 35px;">Bảng Quảng Cáo</h5>                               
                                <button type="button" class="btn-close w-5" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>                            
                    </div>

                    <div class="modal-body">
                        <div class="container-fluid d-flex flex-column">
                            <div class="container-fluid mb-2">
                                <span class="text-primary fw-semibold fs-5" style="float: left;">
                                    Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5                                    
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-crosshair2 text-primary mt-1" viewBox="0 0 16 16" style="float: right;">
                                    <path d="M8 0a.5.5 0 0 1 .5.5v.518A7.001 7.001 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7.001 7.001 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7.001 7.001 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7.001 7.001 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0Zm-.5 2.02A6.001 6.001 0 0 0 2.02 7.5h1.005A5.002 5.002 0 0 1 7.5 3.025V2.02Zm1 1.005A5.002 5.002 0 0 1 12.975 7.5h1.005A6.001 6.001 0 0 0 8.5 2.02v1.005ZM12.975 8.5A5.002 5.002 0 0 1 8.5 12.975v1.005a6.002 6.002 0 0 0 5.48-5.48h-1.005ZM7.5 12.975A5.002 5.002 0 0 1 3.025 8.5H2.02a6.001 6.001 0 0 0 5.48 5.48v-1.005ZM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
                                </svg>
                            </div>

                            <div class="container-fluid mb-2">
                                <div class="d-flex flex-row justify-content-between " style="margin-bottom: 8px;">
                                    <div class="w-33 d-flex flex-column" style="min-width: 33%;">
                                        <p class="fs-6 fw-bold lh-base m-0">Hình thức báo cáo</p>
                                        <p class="fs-8 lh-base m-0 mt-1">Tố giác sai phạm</p>
                                    </div>

                                    <div class="w-33 d-flex flex-column" id="TTXLY" style="min-width: 33%;">
                                        <p class="fs-6 fw-bold lh-base m-0">Tình Trạng Xử Lý</p>
            
                                    </div>       

                                    <div class="w-33 d-flex flex-column" style="min-width: 33%;">
                                        <p class="fs-6 fw-bold lh-base m-0">Loại vị trí</p>
                                        <p class="fs-8 lh-base m-0 mt-1">21/10/2023 - 10:31:24</p>
                                    </div>                           
                                </div>

                                <div class="d-flex flex-row justify-content-between">
                                    <div class="w-33 d-flex flex-column"  style="min-width: 33%;">
                                        <p class="fs-6 fw-bold m-0">Họ và Tên</p>
                                        <p class="fs-8  m-0 mt-1">Thế Nghĩa</p>
                                    </div>

                                    <div class="w-33 d-flex flex-column" style="min-width: 33%;">
                                        <p class="fs-6 fw-bold lh-base m-0">Email</p>
                                        <p class="fs-8 lh-base m-0 mt-1">thenghia@hom7.com</p>
                                    </div>       

                                    <div class="w-33 d-flex flex-column" style="min-width: 33%;">
                                        <p class="fs-6 fw-bold lh-base m-0">Số Điện Thoại</p>
                                        <p class="fs-8 lh-base m-0 mt-1">01234578</p>
                                    </div>                          
                                </div>
                            </div>

                            <div class="container-fluid mb-2">
                                <p class="fs-6 fw-bold lh-base m-0">Nội dung báo cáo</p>
                                <p class="fs-8 lh-base m-0 mt-1">
                                    Nulla facilisi. Proin vel molestie odio. Fusce egestas non ex at faucibus. Mauris justo lacus, fermentum eget finibus ut, placerat nec risus. Suspendisse potenti. Proin a libero facilisis, imperdiet purus ac, maximus erat. Vivamus condimentum nunc odio, vitae egestas mauris iaculis ut.
                                </p>
                            </div>

                            <div class="container-fluid">
                                <div class="d-flex flex-column">
                                    <p class="fs-6 fw-bold lh-base m-0">Hình ảnh báo cáo</p>
                                    <div class="container-fluid d-flex justify-content-center">
                                        <div id="carouselId" class="carousel slide" data-bs-ride="carousel" style="max-width: 600px; max-height: 600px">
                                            <ol class="carousel-indicators">
                                                <li data-bs-target="#carouselId" data-bs-slide-to="0" class="active" aria-current="true"
                                                    aria-label="First slide"></li>
                                                <li data-bs-target="#carouselId" data-bs-slide-to="1" aria-label="Second slide"></li>
                                                <li data-bs-target="#carouselId" data-bs-slide-to="2" aria-label="Third slide"></li>
                                            </ol>
            
                                            <div class="carousel-inner" role="listbox">
                                                <div class="carousel-item active rounded-5 px-1">
                                                    <img src="./images/banner1.jpg" class="w-100 d-block object-fit-cover rounded-5" alt="First slide">
                                                </div>
                                                <div class="carousel-item rounded-5 px-1">
                                                    <img src="./images/banner2.jpg" class="w-100 d-block object-fit-cover rounded-5" alt="Second slide">
                                                </div>
                                                <div class="carousel-item rounded-5 px-1">
                                                    <img src="./images/banner3.jpg" class="w-100 d-block object-fit-cover rounded-5" alt="Third slide">
                                                </div>
                                            </div>
                            
                                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                            
                                            <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                            <!-- See More
                                            <div class="carousel-caption">
                                                <a href="#" class="btn btn-primary">See more</a>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
        `
    }

    function renderQCReport () {
        return `
        <div class="modal fade" id="DetailQCReport" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document" style="width: 70%;">
            <div class="modal-content">
                <div class="modal-header d-flex flex-column">
                    <div class="w-100 d-flex flex-row">
                        <h5 class="modal-title text-center w-100" id="modalTitleId" style="padding-left: 35px;">227 Nguyễn Văn Cừ</h5>                               
                            <button type="button" class="btn-close w-5" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>                            
                </div>

                <div class="modal-body">
                    <div class="container-fluid d-flex flex-column">
                        <div class="container-fluid mb-2">
                            <span class="text-primary fw-semibold fs-5" style="float: left;">
                                Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5                                    
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-crosshair2 text-primary mt-1" viewBox="0 0 16 16" style="float: right;">
                                <path d="M8 0a.5.5 0 0 1 .5.5v.518A7.001 7.001 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7.001 7.001 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7.001 7.001 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7.001 7.001 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0Zm-.5 2.02A6.001 6.001 0 0 0 2.02 7.5h1.005A5.002 5.002 0 0 1 7.5 3.025V2.02Zm1 1.005A5.002 5.002 0 0 1 12.975 7.5h1.005A6.001 6.001 0 0 0 8.5 2.02v1.005ZM12.975 8.5A5.002 5.002 0 0 1 8.5 12.975v1.005a6.002 6.002 0 0 0 5.48-5.48h-1.005ZM7.5 12.975A5.002 5.002 0 0 1 3.025 8.5H2.02a6.001 6.001 0 0 0 5.48 5.48v-1.005ZM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
                            </svg>
                        </div>

                        <div class="container-fluid mb-2">
                            <div class="d-flex flex-row justify-content-between " style="margin-bottom: 8px;">
                                <div class="w-33 d-flex flex-column" style="min-width: 33%;">
                                    <p class="fs-6 fw-bold lh-base m-0">Hình thức báo cáo</p>
                                    <p class="fs-8 lh-base m-0 mt-1">Tố giác sai phạm</p>
                                </div>

                                <div class="w-33 d-flex flex-column" id="TTXLY" style="min-width: 33%;">
                                    <p class="fs-6 fw-bold lh-base m-0">Tình Trạng Xử Lý</p>
        
                                </div>       

                                <div class="w-33 d-flex flex-column" style="min-width: 33%;">
                                    <p class="fs-6 fw-bold lh-base m-0">Loại vị trí</p>
                                    <p class="fs-8 lh-base m-0 mt-1">21/10/2023 - 10:31:24</p>
                                </div>                           
                            </div>

                            <div class="d-flex flex-row justify-content-between">
                                <div class="w-33 d-flex flex-column"  style="min-width: 33%;">
                                    <p class="fs-6 fw-bold m-0">Họ và Tên</p>
                                    <p class="fs-8  m-0 mt-1">Thế Nghĩa</p>
                                </div>

                                <div class="w-33 d-flex flex-column" style="min-width: 33%;">
                                    <p class="fs-6 fw-bold lh-base m-0">Email</p>
                                    <p class="fs-8 lh-base m-0 mt-1">thenghia@hom7.com</p>
                                </div>       

                                <div class="w-33 d-flex flex-column" style="min-width: 33%;">
                                    <p class="fs-6 fw-bold lh-base m-0">Số Điện Thoại</p>
                                    <p class="fs-8 lh-base m-0 mt-1">01234578</p>
                                </div>                          
                            </div>
                        </div>

                        <div class="container-fluid mb-2">
                            <p class="fs-6 fw-bold lh-base m-0">Nội dung báo cáo</p>
                            <p class="fs-8 lh-base m-0 mt-1">
                                Nulla facilisi. Proin vel molestie odio. Fusce egestas non ex at faucibus. Mauris justo lacus, fermentum eget finibus ut, placerat nec risus. Suspendisse potenti. Proin a libero facilisis, imperdiet purus ac, maximus erat. Vivamus condimentum nunc odio, vitae egestas mauris iaculis ut.
                            </p>
                        </div>

                        <div class="container-fluid">
                            <div class="d-flex flex-column">
                                <p class="fs-6 fw-bold lh-base m-0">Hình ảnh báo cáo</p>
                                <div class="container-fluid d-flex justify-content-center">
                                    <div id="carouselId" class="carousel slide" data-bs-ride="carousel" style="max-width: 600px; max-height: 600px">
                                        <ol class="carousel-indicators">
                                            <li data-bs-target="#carouselId" data-bs-slide-to="0" class="active" aria-current="true"
                                                aria-label="First slide"></li>
                                            <li data-bs-target="#carouselId" data-bs-slide-to="1" aria-label="Second slide"></li>
                                            <li data-bs-target="#carouselId" data-bs-slide-to="2" aria-label="Third slide"></li>
                                        </ol>
        
                                        <div class="carousel-inner" role="listbox">
                                            <div class="carousel-item active rounded-5 px-1">
                                                <img src="./images/banner1.jpg" class="w-100 d-block object-fit-cover rounded-5" alt="First slide">
                                            </div>
                                            <div class="carousel-item rounded-5 px-1">
                                                <img src="./images/banner2.jpg" class="w-100 d-block object-fit-cover rounded-5" alt="Second slide">
                                            </div>
                                            <div class="carousel-item rounded-5 px-1">
                                                <img src="./images/banner3.jpg" class="w-100 d-block object-fit-cover rounded-5" alt="Third slide">
                                            </div>
                                        </div>
                        
                                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Previous</span>
                                        </button>
                        
                                        <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Next</span>
                                        </button>
                                        <!-- See More
                                        <div class="carousel-caption">
                                            <a href="#" class="btn btn-primary">See more</a>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>

</div>
        `
    }
}


