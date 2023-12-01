

export default function DetailAdModal(detailAdInfo) {

    function openReportFormModal_DetailAdModal() {
        document.querySelector('.report-form-modal-root').classList.remove('hide');
    }

    window.openReportFormModal_DetailAdModal = openReportFormModal_DetailAdModal;

    
    // Close modal handler
    function CloseDetailAdModal() {
        document.querySelector('.modal-root').innerHTML = '';
    }
    window.CloseDetailAdModal = CloseDetailAdModal;

    function PreventCloseDetailAdModal(e) {
        e.stopPropagation();
    }
    window.PreventCloseDetailAdModal = PreventCloseDetailAdModal;

    
    return `
        <div class="detail-ad-modal-container" onclick="CloseDetailAdModal()">
            <div class="detail-ad-modal" onclick="PreventCloseDetailAdModal(event)">
                
                <div class="detail-ad-modal__title">
                    <h1>Thông tin chi tiết</h1>
                    <button type="button" onclick="CloseDetailAdModal()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>


                <div class="detail-ad-modal__address">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <h1>${detailAdInfo.address}, ${detailAdInfo.region}</h1>
                </div>


                <div class="detail-ad-modal__name">
                    <h2>${detailAdInfo.name}</h2>
                </div>


                <div class="detail-ad-modal__info">
                    <div class="detail-ad-modal__info-row">
                        <div class="detail-ad-modal__info-col">
                            <h2>Loại bảng quảng cáo</h2>
                            <p>${detailAdInfo.type}</p>
                        </div>
                        <div class="detail-ad-modal__info-col">
                            <h2>Hình thức quảng cáo</h2>
                            <p>${detailAdInfo.form}</p>
                        </div>
                        <div class="detail-ad-modal__info-col">
                            <h2>Loại vị trí</h2>
                            <p>${detailAdInfo.locationType}</p>
                        </div>
                    </div>

                    <div class="detail-ad-modal__info-row">
                        <div class="detail-ad-modal__info-col">
                            <h2>Thời hạn hợp đồng</h2>
                            <div class="detail-ad-modal__info-contract d-flex flex-row justify-content-start">
                                <div style="padding-right: 3px;">
                                    <svg width="6" height="36" viewBox="0 0 6 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="pt-1 h-100 mx-1" >
                                    <path d="M3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333ZM3 30.3333C1.52724 30.3333 0.333333 31.5272 0.333333 33C0.333333 34.4728 1.52724 35.6667 3 35.6667C4.47276 35.6667 5.66667 34.4728 5.66667 33C5.66667 31.5272 4.47276 30.3333 3 30.3333ZM2.5 3L2.5 33H3.5L3.5 3H2.5Z" fill="#0D6EFD"/>
                                    </svg>
                                </div>
                                <div class="d-flex flex-column">
                                    <span>${detailAdInfo.contractStartDate}</span>
                                    <span>${detailAdInfo.contractEndDate}</span>
                                </div>
                            </div>
                        </div>
                        <div class="detail-ad-modal__info-col">
                            <h2>Kích thước</h2>
                            <p>${detailAdInfo.size}</p>
                        </div>
                        <div class="detail-ad-modal__info-col">
                            <h2 style="margin-bottom: 4px;">Phản hồi thông tin</h2>
                            <button class="btn btn-outline-primary custom-btn" onclick="openReportFormModal_DetailAdModal()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                Phản hồi
                            </button>
                        </div>
                    </div>
                </div>

                
                <div class="detail-ad-modal__thumbnail-title">
                    <h2>Hình ảnh quảng cáo</h2>
                </div>


                <div class="detail-ad-modal__thumbnail">
                    <div id="detail-ad-modal__carousel-${detailAdInfo.adId}" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner" role="listbox">

                        ${
                            detailAdInfo.thumbnails.map((thumbnail, index) => {
                                return `
                                <div class="carousel-item rounded-4 ${index==0 && 'active'}">
                                    <img src=${thumbnail.url} class="rounded-4" alt=${thumbnail.url}>
                                </div>
                                `
                            }).join('')
                        }

                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#detail-ad-modal__carousel-${detailAdInfo.adId}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#detail-ad-modal__carousel-${detailAdInfo.adId}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    `

}


