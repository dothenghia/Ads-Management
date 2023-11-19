
import RandomPopup from '/components/dan/popup/RandomPopup.js';

export default function RandomMarker(map) {
    const mk = document.createElement('div');
    mk.className = `marker random-marker`;

    mk.innerHTML = `
        <img src="/assets/dan/pin.png" alt="pin"/>
    `

    var marker = new mapboxgl.Marker(mk)
        .setLngLat([106.686030, 10.761564])
        .addTo(map);


    // Add Event Handler
    document.querySelector(`.random-marker`).onclick = function () {

        document.querySelector('.random-popup-root').innerHTML = RandomPopup();

    }

}
// Hem 341 Nguyen Trai, Phuong Nguyen Cu Trinh, Quan 1, TP HCM