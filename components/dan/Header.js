
import flyToLocation from "/functions/dan/flyToLocation.js";
import reverseGeocoding from "/functions/dan/reverseGeocoding.js";
import SearchMarker from "./marker/SearchMarker.js";
import SearchPopup from "./popup/SearchPopup.js";

function renderSearch(map, data) {
    // console.log(data);
    let longitude = parseFloat(data.lon);
    let latitude = parseFloat(data.lat);
    // Fly to location
    flyToLocation(map, longitude, latitude);

    // Add marker & popup
    reverseGeocoding(longitude, latitude)
        .then(reverseData => {
            let renderData = {
                name: data.name,
                region: reverseData.quan + ', ' + reverseData.phuong,
                longitude: longitude,
                latitude: latitude,
            }
            
            SearchMarker(map, renderData);

            document.querySelector('.random-popup-root').innerHTML = SearchPopup(map, renderData);
        })
        .catch(error => console.error(error));

}

export default function Header(map) {

    function forwardGeocoding_Header() {
        let address = document.querySelector('.header__search-input').value;

        map._markers.forEach(marker => {
            if (marker._element.id == 'random-marker' || marker._element.id == 'search-marker') {
                marker.remove();
            }
        })

        fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`)
            .then(response => response.json())
            .then(data => {
                if (data.length == 0) { alert('Không tìm thấy địa chỉ'); return; }

                data = data[0];

                renderSearch(map, data);
            })

    }
    window.forwardGeocoding_Header = forwardGeocoding_Header;

    return `
    <header class="container-fluid bg-light z-2 position-absolute header">
        <nav class="navbar navbar-expand-sm navbar-dark container">
            <div class="container">
                <h1 class="header__name">
                    <img src="/assets/chung/logo.png" alt="logo">
                    AdsMap
                </h1>
                
                <div class="header__search">
                    <input
                        class="header__search-input" 
                        type="text"
                        placeholder="Nhập địa chỉ..."
                    >

                    <button
                        onclick="forwardGeocoding_Header()"
                        class="header__search-btn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                </div>
            </div>
        </nav>

    </header>
    `
}
