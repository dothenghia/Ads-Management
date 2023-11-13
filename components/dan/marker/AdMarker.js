const $ = document.querySelector.bind(document);

import AdSidebar from '../sidebar/AdSidebar.js';
import getAdLocationInfo from '/functions/dan/getAdLocationInfo.js';

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

        // Fetch Data theo ID
        // Thay vì truyền ID vào Component ròi mới Fetch
        // Thì mình nên Fetch data theo ID trước
        // ròi mới truyền cục data đó vào Component để render thoi 👌
        const fetchData = async () => {
            var data = await getAdLocationInfo(adInfo.id);
            console.log(data);

            $('.sidebar-root').innerHTML = AdSidebar(data)
        }

        fetchData();
    }
}
