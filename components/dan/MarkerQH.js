
export default function MarkerQH() {
    const mk = document.createElement('div');
    mk.className = 'marker-qh';

    // make a marker for each feature and add to the map
    var marker = new mapboxgl.Marker(mk)
            .setLngLat([106.654497, 10.774306])
            .addTo(map);


    return marker
}
