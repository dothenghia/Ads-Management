
import mappingRegion from "../functions/dan/mappingRegion.js";
import { getBoundaryPhuong, getBoundaryQuan } from "./boundary.js";

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFyb2xvaSIsImEiOiJjbG8ybW1ucHcwOTZjMnF0ZGFqdXpwemUwIn0._gUBQBWHcx7zDxxK6UEUbQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [106.682667, 10.762886],
    zoom: 14
});

let idPhuong = 'phuong_10'
let idQuan = 'quan_5'

let coordinatesPhuong = getBoundaryPhuong(idQuan, idPhuong)
let coordinatesQuan = getBoundaryQuan(idQuan)
let { quan, phuong } = mappingRegion(idQuan, idPhuong)

let search_text = `${phuong}, ${quan}, Thành phố Hồ Chí Minh, Việt Nam`
let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text}.json?access_token=${mapboxgl.accessToken}`

map.on('load', function () {
    // Tạo một GeoJSON feature với điểm geometry
    let geojson = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: coordinatesPhuong
        },
        properties: {}
    };

    // Thêm source cho line layer
    map.addSource('line-source', {
        type: 'geojson',
        data: geojson
    });

    // Thêm layer line
    map.addLayer({
        id: 'line-layer',
        type: 'line',
        source: 'line-source',
        paint: {
            'line-color': 'rgba(255, 0, 0, 0.8)', // Màu của đường line
            'line-width': 3 // Độ rộng của đường line
        }
    });
});
