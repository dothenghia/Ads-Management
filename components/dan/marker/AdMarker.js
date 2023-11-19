
import AdPopup from '../popup/AdPopup.js';
import AdSidebar from '../sidebar/AdSidebar.js';
import { getAdLocationInfoById } from '/functions/dan/getAdLocationInfo.js';

export default function AdMarker(map, adInfo) {
    const mk = document.createElement('div');
    mk.className = `marker ad-marker marker-${adInfo.quyhoach ? 'qh' : 'cqh'} ${adInfo.isReported ? 'marker-rp' : ''} ad-marker-${adInfo.locationId}`;

    mk.innerHTML = adInfo.quyhoach ?
    `
        <div class="ad-marker-popup-root ad-marker-popup-root-${adInfo.locationId}">
            ${AdPopup(adInfo)}
        </div>
        <span>QC</span>
    `
    :
    `
        <div class="ad-marker-popup-root ad-marker-popup-root-${adInfo.locationId}">
            ${AdPopup(adInfo)}
        </div>
        <span></span>
    `

    var marker = new mapboxgl.Marker(mk)
        .setLngLat([adInfo.longitude, adInfo.latitude])
        .addTo(map);


    // Add Event Handler
    document.querySelector(`.ad-marker-${adInfo.locationId}`).onclick = function () {

        // Fetch Data theo ID
        // Thay vì truyền ID vào Component ròi mới Fetch
        // Thì mình nên Fetch data theo ID trước
        // ròi mới truyền cục data đó vào Component để render thoi 👌
        const fetchData = async () => {
            var data = await getAdLocationInfoById(adInfo.locationId);
            console.log(data);

            document.querySelector('.sidebar-root').innerHTML = AdSidebar(data)
        }
        fetchData();
    }


    document.querySelector(`.ad-marker-${adInfo.locationId}`).onmouseover = function () {
        document.querySelector(`.ad-marker-popup-root-${adInfo.locationId}`).classList.add('hover');
    }
    document.querySelector(`.ad-marker-${adInfo.locationId}`).onmouseout = function () {
        document.querySelector(`.ad-marker-popup-root-${adInfo.locationId}`).classList.remove('hover');
    }
}
