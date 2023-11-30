
export default function AdPopup(adInfo) {

    return `
    <div class="ad-popup">
        <div class="ad-popup__title">
            <h1>
                ${adInfo.form}
                ${
                    adInfo.isReported ? 
                    `<span>${adInfo.reportRecord}</span>`
                    : ''
                }
            </h1>
        </div>
        <div class="ad-popup__info">
            <h2>${adInfo.address} (Sở Văn hóa - Thể thao), ${adInfo.region}</h2>
            <p>Số quảng cáo: <span>${adInfo.quantity}</span></p>
            <p>Loại vị trí: <span>${adInfo.locationType}</span></p>
        </div>
        <div class="ad-popup__status ${adInfo.quyhoach ? 'qh' : 'cqh'}">
            <span>${adInfo.quyhoach ? 'Đã quy hoạch' : 'Chưa quy hoạch'}</span>
        </div>
    </div>
    `
}