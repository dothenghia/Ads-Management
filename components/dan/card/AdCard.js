
import DetailAdModal from "../modal/DetailAdModal.js";
import ReportFormModal from "../modal/ReportFormModal.js";
import DetailReportModal from "../modal/DetailReportModal.js";
import { getDetailReportInfoOfAd } from '/functions/dan/getReportLocationInfo.js';

import StatusTag from '../tag/StatusTag.js'


function AdCard_Thumbnail(adInfo) {
    return `
    <div class="ad-card__thumbnail">
        <div id="ad-card__carousel-${adInfo.adId}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner" role="listbox">

                ${
                    adInfo.thumbnails.map((thumbnail, index) => {
                        return `
                        <div class="carousel-item rounded-3 ${index==0 && 'active'}">
                            <img src=${thumbnail.url} class="rounded-3" alt=${thumbnail.url}>
                        </div>
                        `
                    }).join('')
                }

            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#ad-card__carousel-${adInfo.adId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#ad-card__carousel-${adInfo.adId}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    `
}


export default function AdCard(adInfo, adLocationData) {
    
    let extractData = {
        adId: adInfo.adId,
        locationId: adLocationData.locationId,
        address: adLocationData.address,
        region: adLocationData.region,
        name: adInfo.name,
        type: adLocationData.type,
        form: adLocationData.form,
        locationType: adLocationData.locationType,
        contractStartDate: adInfo.contractStartDate,
        contractEndDate: adInfo.contractEndDate,
        size: adInfo.size,
        thumbnails: adInfo.thumbnails,
    }
    let reportId = {
        locationId: adLocationData.locationId,
        adId: adInfo.adId,
    }

    function openDetailAdModal_AdCard(ad) {
        let detailAdInfo = JSON.parse(decodeURIComponent(ad));        
        
        document.querySelector('.modal-root').innerHTML = DetailAdModal(detailAdInfo);

    }

    function openReportFormModal_AdCard() {
        document.querySelector('.modal-root').innerHTML = ReportFormModal();
    }

    function openDetailReportModal_AdCard(id) {
        let {adId, locationId} = JSON.parse(decodeURIComponent(id));

        getDetailReportInfoOfAd(locationId, adId).then(detailReportInfo => {
            console.log(detailReportInfo);

            document.querySelector('.modal-root').innerHTML = DetailReportModal(detailReportInfo);
        })
    }
    

    window.openDetailAdModal_AdCard = openDetailAdModal_AdCard;
    window.openReportFormModal_AdCard = openReportFormModal_AdCard;
    window.openDetailReportModal_AdCard = openDetailReportModal_AdCard;


    return `
    <div class='ad-card'>
        <div class='ad-card__title'>
            <h1>${adInfo.name}</h1>
        </div>

        <div class="ad-card__info">
            <div class="ad-card__info-tag">
                ${StatusTag(adInfo.reportStatus)}
            </div>


            <h2>Kích thước</h2>
            <p>${adInfo.size}</p>

            
            <div class="w-33 d-flex flex-column"  style="min-width: 33%;">
                <h2>Thời hạn hợp đồng</h2>
                <div class="d-flex flex-row justify-content-start">
                    <div style="padding-right: 3px;">
                        <svg width="6" height="36" viewBox="0 0 6 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="pt-1 h-100 mx-1" >
                        <path d="M3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333ZM3 30.3333C1.52724 30.3333 0.333333 31.5272 0.333333 33C0.333333 34.4728 1.52724 35.6667 3 35.6667C4.47276 35.6667 5.66667 34.4728 5.66667 33C5.66667 31.5272 4.47276 30.3333 3 30.3333ZM2.5 3L2.5 33H3.5L3.5 3H2.5Z" fill="#0D6EFD"/>
                        </svg>
                    </div>
                    <div class="d-flex flex-column">
                        <span>${adInfo.contractStartDate}</span>
                        <span>${adInfo.contractEndDate}</span>
                    </div>
                </div>
            </div>

            <h2>Hình ảnh quảng cáo</h2>
        </div>


        ${AdCard_Thumbnail(adInfo)}


        <div class="ad-card__button">
            <button class="btn btn-outline-primary custom-btn" onclick="openDetailAdModal_AdCard('${encodeURIComponent(JSON.stringify(extractData))}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                Chi tiết
            </button>

            ${
                (adInfo.reportStatus == '') ?
                `<button class="btn btn-outline-primary custom-btn" onclick="openReportFormModal_AdCard()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    Phản hồi
                </button>`
                :
                `<button class="custom-btn custom-btn-fade" onclick="openDetailReportModal_AdCard('${encodeURIComponent(JSON.stringify(reportId))}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Xem lại phản hồi
                </button>`
            }
        </div>

    </div>
    `
}