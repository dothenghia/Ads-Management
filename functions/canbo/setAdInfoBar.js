const $i = document.getElementById.bind(document);

export default async function setAdInfoBar(spotInfo, adInfo) {
    let adInfoBar = $i("adInfo");
    let adInfoCards = `
        <h3><button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button></h3>

    `;
    Object.keys(spotInfo.adId).map(function (key) {
        spotInfo.adId[key].map(function (value) {
            let name = adInfo[key].name
            let typeId = adInfo[key].id
            let info = adInfo[key].qc[value];
            let adInfoCard = `
                <div>
                    <h5>${name}</h5>
                    <hr>
                    <img src="/assets/chung/img/adverts/${typeId}.jpeg" alt="Image">
                    <p>SL trụ: ${info.cnt}</p>
                    <p>Kích thước: ${info.size}</p>
                    <p>Hình thức: ${info.purpose}</p>
                    <p>Công ty: ${info.co}</p>
                    <p>Phân loại: ${info.type}</p>
                    <p>Địa chỉ: ${info.sonha} ${spotInfo.duong}, P.${spotInfo.phuong}, Quận ${spotInfo.quan}</p>
                    <p>Nội dung quảng cáo: ${info.content}</p>
                </div>
            `
            adInfoCards += adInfoCard;
        })
    });
    
    adInfoBar.innerHTML = adInfoCards;
}