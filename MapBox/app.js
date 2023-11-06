var mylongitude = 106.654497;
var mylatitude = 10.774306;

mapboxgl.accessToken =
    'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ';

//Map
var map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [mylongitude, mylatitude], // starting position [lng, lat]
    zoom: 12, // starting zoom
    
    
});


// // Create div with class
// const el = document.createElement('div');
//     el.className = 'marker';


// // Adding Markers    
// var marker = new mapboxgl.Marker(el)
//     .setLngLat([mylongitude, mylatitude]) // Set the marker's coordinates
//     .addTo(map);

// // Popups
// var popup = new mapboxgl.Popup()
//     .setHTML('Your popup content goes here')
//     .addTo(map);

// marker.setPopup(popup);

