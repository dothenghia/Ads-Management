
export default function AdSidebar() {
    
    return (
        `<div class="ad-sidebar-container">

            <div class="ad-sidebar">
                <div class="ad-sidebar__header">
                    <h1>Thông tin địa điểm</h1>
                    <button type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                
                <div class="ad-sidebar__thumbnail">
                    <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner" role="listbox">
                            <div class="carousel-item active rounded-3 px-1">
                                <img src="/assets/dan/thumbnail 1.jpeg" class="rounded-3" alt="First slide">
                            </div>
                            <div class="carousel-item rounded-3 px-1">
                                <img src="/assets/dan/thumbnail 2.jpg" class="rounded-3" alt="Second slide">
                            </div>
                            <div class="carousel-item rounded-3 px-1">
                                <img src="/assets/dan/thumbnail 3.jpg" class="rounded-3" alt="Third slide">
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
                    </div>
                </div>


                <div class="ad-sidebar__info">
                    <div class="ad-sidebar__info-address">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <div>
                            <h1>Nguyễn Văn Cừ - An Dương Vương</h1>
                            <h2>Phường 4, Quận 5</h2>
                        </div>
                    </div>
                    
                    <div class="ad-sidebar__info-location">
                        <h1>Loại bảng quảng cáo</h1>

                        <h2>Hình thức quảng cáo</h2>
                        <p>Cổ động chính trị</p>

                        <h2>Số lượng</h2>
                        <p>4 trụ/bảng</p>

                        <h2>Loại vị trí</h2>
                        <p>Đất công/Công viên/Hành lang</p>
                    </div>

                    <button class="btn btn-outline-primary custom-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        Gửi phản hồi địa điểm này
                    </button>
                </div>



            </div>

        </div>`
    )
}
