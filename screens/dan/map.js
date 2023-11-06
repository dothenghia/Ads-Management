var mylongitude = 106.682667;
var mylatitude = 10.762886;

mapboxgl.accessToken = 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ';


var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [mylongitude, mylatitude],
    zoom: 15,
});

// Create div with class
const el = document.createElement('div');
    el.className = 'marker-qh';
    el.innerHTML = 'QC';

// Adding Markers    
var marker = new mapboxgl.Marker(el)
    .setLngLat([mylongitude, mylatitude]) // Set the marker's coordinates
    .addTo(map);
