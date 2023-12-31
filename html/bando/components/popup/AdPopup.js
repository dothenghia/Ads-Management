
export default function AdPopup(adInfo) {

    return `
    <div class="ad-popup">
        <div class="ad-popup__title">
            <h1>
                ${adInfo.adType}
                ${
                    adInfo.numberOfReports > 0 ? 
                    `<span>${adInfo.numberOfReports}</span>`
                    : ''
                }
            </h1>
        </div>
        <div class="ad-popup__info">
            <h2>${adInfo.address} (Sở Văn hóa - Thể thao), ${adInfo.phuong}, ${adInfo.quan}</h2>
            <p>Số quảng cáo: <span>${adInfo.numberOfAds} ${adInfo.numberOfAds == 0 ? '' : 'Trụ/bảng'}</span></p>
            <p>Loại vị trí: <span>${adInfo.locationType}</span></p>
        </div>
        <div class="ad-popup__status ${adInfo.planning ? 'qh' : 'cqh'}">
            <span>${adInfo.planning ? 'Đã quy hoạch' : 'Chưa quy hoạch'}</span>
        </div>
    </div>
    `
}