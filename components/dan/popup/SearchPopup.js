

export default function SearchPopup(map, data) {

    function openReportFormModal_SearchPopup() {
        document.querySelector('.report-form-modal-root').classList.remove('hide');
        let root = document.querySelector('.report-form-modal-root')
        root.setAttribute('data-locationId', '')
        root.setAttribute('data-adId', '')
        root.setAttribute('data-longitude', data.longitude.toFixed(4))
        root.setAttribute('data-latitude', data.latitude.toFixed(4))
        root.setAttribute('data-reportType', 'ddbk')
    }
    window.openReportFormModal_SearchPopup = openReportFormModal_SearchPopup;

    function closeRandomPopup_SearchPopup() {
        document.querySelector('.random-popup-root').innerHTML = '';
        
        map._markers.forEach(marker => {
            if (marker._element.id == 'random-marker' || marker._element.id == 'search-marker') {
                marker.remove();
            }
        })

    }
    window.closeRandomPopup_SearchPopup = closeRandomPopup_SearchPopup;

    
    return `
    <div class="random-popup">
        <div class="random-popup__image">
            <img src="/assets/dan/img/city.png" alt="city"/>
        </div>

        <div class="random-popup__info">
            <div class="random-popup__header">
                <h1>${data.name}</h1>
                <button type="button" onclick="closeRandomPopup_SearchPopup()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            <h2>${data.region}</h2>
            <div class="random-popup__split">
                <span>${data.longitude.toFixed(4)} - ${data.latitude.toFixed(4)}</span>
                <button class="btn btn-outline-primary custom-btn" onclick="openReportFormModal_SearchPopup()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    Báo cáo
                </button>
            </div>
        </div>
    </div>
    `
}
