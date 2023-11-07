
export default function MarkerQH(map, longitude, latitude) {
    const mk = document.createElement('div');
    mk.className = 'marker-qh';
    mk.innerHTML = 'QC';

    // make a marker for each feature and add to the map
    var marker = new mapboxgl.Marker(mk)
            .setLngLat([longitude, latitude])
            .addTo(map);
}
