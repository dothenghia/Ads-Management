
import StatusTag from '../tag/StatusTag.js'

export default function DetailReportModal(detailReportInfo) {


    // Close modal handler
    function CloseDetailReportModal() {
        document.querySelector('.modal-root').innerHTML = '';
    }
    window.CloseDetailReportModal = CloseDetailReportModal;

    function PreventCloseDetailReportModal(e) {
        e.stopPropagation();
    }
    window.PreventCloseDetailReportModal = PreventCloseDetailReportModal;


    return `
        <div class="detail-report-modal-container" onclick="CloseDetailReportModal()">
            <div class="detail-report-modal" onclick="PreventCloseDetailReportModal(event)">
                
                <div class="detail-report-modal__title">
                    <h1>
                    ${detailReportInfo.address == "" ?
                        "Chi tiết báo cáo địa điểm" :
                        detailReportInfo.name
                    }
                    </h1>
                    <button type="button"  onclick="CloseDetailReportModal()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>


                <div class="detail-report-modal__address">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <h1>${detailReportInfo.address == "" ?
                    detailReportInfo.name :
                    detailReportInfo.address
                }, ${detailReportInfo.phuong}, ${detailReportInfo.quan}</h1>
                </div>


                <div class="detail-report-modal__info">
                    <div class="detail-report-modal__info-row">
                        <div class="detail-report-modal__info-col">
                            <h2>Hình thức báo cáo</h2>
                            <p>${detailReportInfo.reportForm}</p>
                        </div>
                        <div class="detail-report-modal__info-col">
                            <h2>Tình trạng xử lý</h2>
                            ${StatusTag(detailReportInfo.status)}
                        </div>
                        <div class="detail-report-modal__info-col">
                            <h2>Thời gian gửi</h2>
                            <p>${detailReportInfo.time}</p>
                        </div>
                    </div>

                    <div class="detail-report-modal__info-row">
                        <div class="detail-report-modal__info-col">
                            <h2>Họ và tên</h2>
                            <p>${detailReportInfo.fullname}</p>
                        </div>
                        <div class="detail-report-modal__info-col">
                            <h2>Email</h2>
                            <p>${detailReportInfo.email}</p>
                        </div>
                        <div class="detail-report-modal__info-col">
                            <h2>Số điện thoại</h2>
                            <p>${detailReportInfo.phone}</p>
                        </div>
                    </div>
                </div>

                
                <div class="detail-report-modal__content">
                    <h2>Nội dung báo cáo</h2>
                    <p>${detailReportInfo.content}</p>

                    <h3>Phản hồi từ cán bộ</h3>
                    ${
                        detailReportInfo.solution == "" ? 
                        `<h1 class='extra-text text-center '>Báo cáo của bạn đang được xử lý</h1>` : 
                        `<p>${detailReportInfo.solution}</p>`
                    }

                    <h2>Hình ảnh báo cáo (${detailReportInfo.images.length})</h2>
                </div>

                ${
                    detailReportInfo.images.length > 0 ?
                `<div class="detail-report-modal__thumbnail">
                    <div id="detail-report-modal__carousel-" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner" role="listbox">

                        ${detailReportInfo.images.map((thumbnail, index) => {
                            return `
                                <div class="carousel-item rounded-4 ${index == 0 && 'active'}">
                                    <img src=${thumbnail.url} class="rounded-4" alt=${thumbnail.url}>
                                </div>
                            `
                            }).join('')
                        }

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
                </div>`
                :
                `<h1 class='extra-text text-center '>Không có hình ảnh đính kèm</h1>`
                }
                

            </div>
        </div>
    `
}