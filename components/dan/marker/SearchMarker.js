

export default function SearchMarker(map, data) {
    const mk = document.createElement('div');
    mk.className = `marker search-marker`;
    mk.id = `search-marker`;

    mk.innerHTML = `
        <img src="/assets/dan/img/pin.png" alt="pin"/>
    `

    var marker = new mapboxgl.Marker(mk)
        .setLngLat([data.longitude, data.latitude])
        .addTo(map);
}
