
import StatusTag from '../tag/StatusTag.js'

export default function DetailReportModal() {

    return `
        <div class="detail-report-modal-container">
            <div class="detail-report-modal">
                
                <div class="detail-report-modal__title">
                    <h1>Bảng quảng cáo 1</h1>
                    <button type="button" onclick="document.querySelector('.modal-root').innerHTML = ''">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div class="detail-report-modal__address">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <h1>Nguyễn Văn Cừ - An Dương Vương, Phường 4, Quận 5</h1>
                </div>

                

                <div class="detail-report-modal__info">
                    <div class="detail-report-modal__info-row">
                        <div class="detail-report-modal__info-col">
                            <h2>Hình thức báo cáo</h2>
                            <p>Tố giác sai phạm</p>
                        </div>
                        <div class="detail-report-modal__info-col">
                            <h2>Tình trạng xử lý</h2>
                            ${StatusTag('Đang xử lý')}
                        </div>
                        <div class="detail-report-modal__info-col">
                            <h2>Thời gian gửi</h2>
                            <p>21/10/2023 - 10:31:24</p>
                        </div>
                    </div>

                    <div class="detail-report-modal__info-row">
                        <div class="detail-report-modal__info-col">
                            <h2>Họ và tên</h2>
                            <p>Thế Nghĩa</p>
                        </div>
                        <div class="detail-report-modal__info-col">
                            <h2>Email</h2>
                            <p>thenghia@nhom7.com</p>
                        </div>
                        <div class="detail-report-modal__info-col">
                            <h2>Số điện thoại</h2>
                            <p>1234567890</p>
                        </div>
                    </div>

                </div>

                
                <div class="detail-report-modal__content">
                    <h2>Nội dung báo cáo</h2>
                    <p>lorm msalm dlsa ldmsal mdlsma ldmsal mdlsam dlmslamdlsaml dmlá mdlsam ldmla smldms almd lsaml dmalsm dlm dlsmal dmlam sdlmsald mlámd lsamld malmdalmsdl samdlmsaldmlsa mldmsladmlsmal dmlsma ldmsal </p>
                    <h2>Hình ảnh báo cáo</h2>
                </div>


                <div class="detail-report-modal__thumbnail">
                    <div id="detail-report-modal__carousel-" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner" role="listbox">

                                <div class="carousel-item rounded-4 active">
                                    <img src='/assets/dan/thumbnail5.jpg' class="rounded-4">
                                </div>



                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#detail-report-modal__carousel-" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#detail-report-modal__carousel-" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    `
}