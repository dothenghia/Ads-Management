var mylongitude = 106.654497;
var mylatitude = 10.774306;

mapboxgl.accessToken =
    'pk.eyJ1IjoiYmFyb2xvaSIsImEiOiJjbG8ybW1ucHcwOTZjMnF0ZGFqdXpwemUwIn0._gUBQBWHcx7zDxxK6UEUbQ';
// Set of citycoordinate
const cityCoordinates = [
    [100.507, 13.745],
    [98.993, 18.793],
    [99.838, 19.924],
    [102.812, 17.408],
    [100.458, 7.001],
    [100.905, 12.935]
    ];
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

