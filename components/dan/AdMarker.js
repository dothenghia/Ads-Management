const $ = document.querySelector.bind(document);

import AdSidebar from './AdSidebar.js';

export default function AdMarker(map, adInfo) {
    const mk = document.createElement('div');
    mk.className = adInfo.quyhoach ? 
        `marker marker-qh ad-marker-${adInfo.id}` : 
        `marker marker-cqh ad-marker-${adInfo.id}`;
        // Đại loại là cái ad-marker-${adInfo.id} sẽ đánh dấu 1 cái marker thoi
        // để xử lý sự kiến khi click vào marker đó thì sẽ hiện ra sidebar

    if (adInfo.quyhoach) {
        mk.innerHTML = 'QC';
    }

    var marker = new mapboxgl.Marker(mk)
        .setLngLat([adInfo.longitude, adInfo.latitude])
        .addTo(map);


    // Add Event Handler
    $(`.ad-marker-${adInfo.id}`).onclick = function () {
        console.log('Ad', adInfo.id)

        // Fetch Data theo ID
        const fetchData = async () => {
            var data = await getAdLocationInfo(adInfo.id);
        }

        $('.sidebar-root').innerHTML = AdSidebar(adInfo.id)

    }
}
