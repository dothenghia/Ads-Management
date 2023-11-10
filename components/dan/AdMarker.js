
export default function AdMarker(type, map, longitude, latitude) {
    const mk = document.createElement('div');
    mk.className = type ? 'marker marker-qh' : 'marker marker-cqh';

    if (type) {
        mk.innerHTML = 'QC';
    }

    // make a marker for each feature and add to the map
    var marker = new mapboxgl.Marker(mk)
        .setLngLat([longitude, latitude])
        .addTo(map);
}
