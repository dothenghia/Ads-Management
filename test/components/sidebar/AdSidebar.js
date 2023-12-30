
import AdCard from "../card/AdCard.js"
import StatusTag from '../tag/StatusTag.js'

import DetailReportModal from "../modal/DetailReportModal.js";
import getReportInfoById from '/functions/dan/getReportInfoById.js';


function AdSidebar_Thumbnail(adLocationData) {

    if (adLocationData.planning == false) {
        return `
        <div class="ad-sidebar__thumbnail chuaquyhoach">
            <div class="ad-sidebar__tag">
                ${StatusTag(adLocationData.locationStatus)}
            </div>
            <img src='/assets/dan/illustration/CQH_illustration.png' alt='Chua quy hoach'>
        </div>
        `
    }

    return `
    <div class="ad-sidebar__thumbnail">

        <div class="ad-sidebar__tag">
            ${StatusTag(adLocationData.locationStatus)}
        </div>

        <div id="ad-sidebar__carousel-${adLocationData.locationId}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner" role="listbox">
                ${adLocationData.thumbnails.map((thumbnail, index) => {
                    return `
                        <div class="carousel-item rounded-3 ${index == 0 && 'active'}">
                            <img src=${thumbnail.url} class="rounded-3" alt=${thumbnail.url}>
                        </div>
                        `
                    }).join('')
                }
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#ad-sidebar__carousel-${adLocationData.locationId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#ad-sidebar__carousel-${adLocationData.locationId}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    `
}

function AdSidebar_Info(adLocationData) {

    return `
    <div class="ad-sidebar__info">
        <div class="ad-sidebar__info-address">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <div>
                <h1>${adLocationData.address}</h1>
                <h2>${adLocationData.phuong}, ${adLocationData.quan}</h2>
            </div>
        </div>
        
        <div class="ad-sidebar__info-location">
            <h1>${adLocationData.adType}</h1>

            <h2>Hình thức quảng cáo</h2>
            <p>${adLocationData.adForm}</p>

            <h2>Số lượng</h2>
            <p>${adLocationData.newAdList.length} ${adLocationData.newAdList.length == 0 ? '' : 'Trụ/bảng'}</p>

            <h2>Loại vị trí</h2>
            <p>${adLocationData.locationType}</p>
        </div>
    </div>
    `
}


export default function AdSidebar(adLocationData) {
    // console.log(adLocationData);

    // Close sidebar handler
    function CloseAdSidebar() {
        document.querySelector('.sidebar-root').innerHTML = '';
    }
    window.CloseAdSidebar = CloseAdSidebar;

    function PreventCloseAdSidebar(e) {
        e.stopPropagation();
    }
    window.PreventCloseAdSidebar = PreventCloseAdSidebar;



    return (
        `<div class="ad-sidebar-container" onclick="CloseAdSidebar()">

            <div class="ad-sidebar" onclick="PreventCloseAdSidebar(event)">
                <div class="ad-sidebar__header">
                    <h1>Thông tin địa điểm</h1>
                    <button type="button" onclick="CloseAdSidebar()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                
                ${AdSidebar_Thumbnail(adLocationData)}


                ${AdSidebar_Info(adLocationData)}
                

                <div class="ad-sidebar__adlist">
                    ${adLocationData.newAdList.map(ad => AdCard(ad, adLocationData)).join('')}
                </div>

            </div>

        </div>`
    )
}
