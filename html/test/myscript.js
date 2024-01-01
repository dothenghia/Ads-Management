// Define the bounds of the restricted area
var bounds = L.latLngBounds(['10.7461928', '106.6505485'], ['10.7654613', '106.6869967']);

// Create a map centered within the bounds
var map = L.map('map').fitBounds(bounds);
map.setView([10.7461928, 106.6505485], 18);

// Add a tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a rectangle representing the restricted area
L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);

// Restrict the user's view to the specified bounds
map.setMaxBounds(bounds);
map.on('drag', function() {
  map.panInsideBounds(bounds, { animate: false });
});
