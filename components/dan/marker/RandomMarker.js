

export default function RandomMarker(map, data) {
    const mk = document.createElement('div');
    mk.className = `marker random-marker`;
    mk.id = `random-marker`;

    mk.innerHTML = `
        <img src="/assets/dan/pin.png" alt="pin"/>
    `

    var marker = new mapboxgl.Marker(mk)
        .setLngLat([data.longitude, data.latitude])
        .addTo(map);
}
