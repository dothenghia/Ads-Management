// Initialize the map
'https://leafletjs.com/reference.html#map-example'
var map = L.map('map');
map.setView([10.762929812031853, 106.68248270284181], 13); // Set the initial center and zoom level

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([10.762929812031853, 106.68248270284181]).addTo(map)
    .bindPopup('A sample location.');

map.on('move', (e) => {
    newCenter = map.getCenter();
    marker.setLatLng(newCenter);
});

quan = document.getElementById('quan');
phuong = document.getElementById('phuong');
duong = document.getElementById('duong');
document.addEventListener('change', () => {
    selectedQuan = quan.value;
    selectedPhuong = phuong.value; 
    geoAddress = "";
    geoAddress += duong && duong.value !== "" ? duong.value + " " : "";
    geoAddress += selectedPhuong && selectedPhuong != "" ? selectedPhuong + " " : "";
    geoAddress += selectedQuan && selectedQuan != "" ? selectedQuan : "";    

    geocodeAddress(geoAddress);
})

function geocodeAddress(address){
    //https://nominatim.org/release-docs/develop/api/Search/
    console.log(address)
    var apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

    // Perform the API request using Fetch API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if a location is found
            if (data && data.length > 0) {
                //Nhớ coi kĩ cái data, trong document cũng có việc, mà coi nó log ra như nào thì dễ hơn
                console.log(data);
                var location = data[0];
                var displayName = location.display_name;
                var lat = location.lat;
                var lon = location.lon;

                // Display the location information
                document.getElementById("locationInfo").innerText = `Location: ${displayName}\nLatitude: ${lat}\nLongitude: ${lon}`;
                
                changeMarkerToSearchAddress(lat,lon);
            } else {
                // Display a message if no location is found
                document.getElementById("locationInfo").innerText = "Location not found.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
    
}
function reverseGeocode(lat,lon){
    //https://nominatim.org/release-docs/develop/api/Reverse/#output-format
    console.log("lat: " + lat + " lon: " + lon);
    var apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            if (data && data.display_name) { 
                console.log(data)
                document.getElementById("MarkerInfo").innerText = `Address: ${data.display_name}`;
            } else {
                // Display a message if no address information is found
                document.getElementById("MarkerInfo").innerText = "Address not found.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function changeMarkerToSearchAddress(lat, lon){
    map.flyTo([lat,lon], 18);
    marker.setLatLng([lat,lon]);

}   

document.getElementById('submit').addEventListener('click', () => {
    LatLng = marker.getLatLng();
    lat = LatLng.lat;
    lon = LatLng.lng;

    reverseGeocode(lat,lon);
})