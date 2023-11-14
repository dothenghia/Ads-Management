
import AdSidebar from '../sidebar/AdSidebar.js';
import getAdLocationInfo from '/functions/dan/getAdLocationInfo.js';

export default function AdMarker(map, adInfo) {
    const mk = document.createElement('div');
    mk.className = `marker marker-${adInfo.quyhoach ? 'qh' : 'cqh'} ad-marker-${adInfo.id}`;

    mk.innerHTML = adInfo.quyhoach ? 'QC' : '';

    var marker = new mapboxgl.Marker(mk)
        .setLngLat([adInfo.longitude, adInfo.latitude])
        .addTo(map);


    // Add Event Handler
    document.querySelector(`.ad-marker-${adInfo.id}`).onclick = function () {

        // Fetch Data theo ID
        // Thay vì truyền ID vào Component ròi mới Fetch
        // Thì mình nên Fetch data theo ID trước
        // ròi mới truyền cục data đó vào Component để render thoi 👌
        const fetchData = async () => {
            var data = await getAdLocationInfo(adInfo.id);
            console.log(data);

            document.querySelector('.sidebar-root').innerHTML = AdSidebar(data)
        }

        fetchData();
    }
}
