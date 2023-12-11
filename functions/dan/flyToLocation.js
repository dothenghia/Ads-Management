
export default function flyToLocation(map, longitude, latitude) {
    map.flyTo({
        center: [longitude, latitude],
        zoom: 19,
        // speed: 2,
        // curve: 2,
        // maxDuration: 1000,
        easing(t) {
            return t;
        }
    });
}