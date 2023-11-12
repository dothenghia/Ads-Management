import getDetailList from '../../functions/dan/getDetailInfo.js';


function getDetailLocation(data, ID) {
    for (let place of data){
        let cS = place.contractStart.split('-');
        let cE = place.contractEnd.split('-');

        if (place.id == ID)
            return {
                address: place.address,
                name: place.name,
                adContent: place.adContent,
                typeAd: place.typeAd,
                locationType: place.locationType,
                contractStart: `Ngày ${cS[0]} Tháng ${cS[1]} Năm ${cS[2]}`,
                contractEnd: `Ngày ${cE[0]} Tháng ${cE[1]} Năm ${cE[2]}`,
                number: place.number,
                url: place.url,
            };
    };
}

export default function DetailAdModal(ID) {

    const fetchData = async () => {
        var dataDetail = await getDetailList();
        
        var AdInfo = getDetailLocation(dataDetail, ID);
        AdInfo = AdInfo;

        document.querySelector('.modal-container').innerHTML = render(AdInfo);
    }

    fetchData();

    function render (AdInfo) {
        return `
        <div class="modal fade" id="DetailAdModal" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl" role="document" style="width: 70%;">
                    <div class="modal-content">
                            <div class="modal-header d-flex flex-column">
                                <div class="w-100 d-flex flex-row">
                                    <h6 class="modal-title text-center w-100" id="modalTitleId">Thông tin chi tiết</h6>                               
                                        <button type="button" class="btn-close w-5" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="w-100 d-flex flex-row justify-content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt text-primary my-1 mx-1" viewBox="0 0 16 16">
                                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    </svg>
                                    <span class="text-primary">
                                        ${AdInfo.address}                                    
                                    </span>
                                </div>
                                
                            </div>
                        <div class="modal-body">
                            <div class="container-fluid d-flex flex-column">
                                <div class="container-fluid">
                                    <p class="fs-5 fw-bold">${AdInfo.name}</p>
                                </div>
                                <div class="container-fluid">
                                    <div class="d-flex flex-row justify-content-between " style="margin-bottom: 8px;">
                                        <div class="w-33 d-flex flex-column" style="min-width: 33%;">
                                            <p class="fs-6 fw-bold lh-base m-0">Hình thức quảng cáo</p>
                                            <p class="fs-8 lh-base m-0">${AdInfo.adContent}</p>
                                        </div>
    
                                        <div class="w-33 d-flex flex-column" style="min-width: 33%;">
                                            <p class="fs-6 fw-bold lh-base m-0">Loại bảng quảng cáo</p>
                                            <p class="fs-8 lh-base m-0">${AdInfo.typeAd}</p>
                                        </div>       
    
                                        <div class="w-33 d-flex flex-column" style="min-width: 33%;">
                                            <p class="fs-6 fw-bold lh-base m-0">Loại vị trí</p>
                                            <p class="fs-8 lh-base m-0">${AdInfo.locationType}</p>
                                        </div>                           
                                    </div>
    
                                    <div class="d-flex flex-row justify-content-between">
                                        <div class="w-33 d-flex flex-column"  style="min-width: 33%;">
                                            <p class="fs-6 fw-bold m-0">Thời hạn hợp đồng</p>
                                            <div class="d-flex flex-row justify-content-start">
                                                <div style="padding-right: 3px;">
                                                    <svg width="6" height="36" viewBox="0 0 6 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="pt-1 h-100 mx-1" >
                                                    <path d="M3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333ZM3 30.3333C1.52724 30.3333 0.333333 31.5272 0.333333 33C0.333333 34.4728 1.52724 35.6667 3 35.6667C4.47276 35.6667 5.66667 34.4728 5.66667 33C5.66667 31.5272 4.47276 30.3333 3 30.3333ZM2.5 3L2.5 33H3.5L3.5 3H2.5Z" fill="#0D6EFD"/>
                                                    </svg>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <span class="text-primary">${AdInfo.contractStart}</span>
                                                    <span class="text-primary">${AdInfo.contractEnd}</span>
                                                </div>
                                            </div>
                                        </div>
    
                                        <div class="w-33 d-flex flex-column" style="min-width: 33%;">
                                            <p class="fs-6 fw-bold lh-base m-0">Số lượng</p>
                                            <p class="fs-8 lh-base m-0">${AdInfo.number} trụ/bảng</p>
                                        </div>       
    
                                        <div class="w-33 d-flex flex-column" style="min-width: 33%;">
                                            <p class="fs-6 fw-bold lh-base m-0">Phản hồi thông tin</p>
                                            <button class="btn btn-outline-primary text-start" data-bs-dismiss="modal" data-bs-target="" autocomplete="off" style="border: 2px solid; max-width: 50%;"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                                                </svg>    
                                                Gửi phản hồi
                                            </button>
                                        </div>                          
                                    </div>
                                </div>
    
                            </div>
                        </div>
                        <div class="modal-footer">
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
    
        `
    }
}


