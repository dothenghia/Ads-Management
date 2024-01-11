// smallPopUpMap.js
//'https://leafletjs.com/reference.html#map-example'
var map = null;

var marker = null; // Create a marker
let confirmButton = document.getElementById('confirmButton');

// Watch the change event on selects
document.getElementById('NewchooseCoordinate').addEventListener('click', handleNewLocationInputChange);
document.getElementById('EditchooseCoordinate').addEventListener('click', handleEditLocationInputChange);

// Function to handle the change event on selects
function handleNewLocationInputChange() {
    
    const selectedDistrict = document.getElementById('newAdLocationDistrict');
    const selectedDistrictOption = selectedDistrict.options[selectedDistrict.selectedIndex];
    const selectedDistrictText = selectedDistrictOption.textContent;
    console.log("selectedDistrict",selectedDistrict);
    console.log("selectedDistrictText",selectedDistrictText);

    const selectedWard = document.getElementById('newAdLocationWard');
    const selectedWardOption = selectedWard.options[selectedWard.selectedIndex];
    const selectedWardText = selectedWardOption.textContent;

    if (selectedDistrict !== '' && selectedWard !== '') {
        var addrs = document.getElementById('newAdLocationAddrs') ? document.getElementById('newAdLocationAddrs').value : "";
        const locationInput = selectedWardText + ' ' + selectedDistrictText;
        
        document.querySelector('#EditmapDisplay').style.display = 'block';
        
        if (document.getElementById('Newmap') == null || map == null) {
            map = L.map('Newmap');
            console.log("map:",map);
            map.setView([10.762929812031853, 106.68248270284181], 13);

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                maxZoom: 19,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox/streets-v12', 
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ'  
            }).addTo(map);

            marker = L.marker([10.762929812031853, 106.68248270284181]).addTo(map)
                .bindPopup('A sample location.');

            map.on('move', (e) => {
                newCenter = map.getCenter();
                marker.setLatLng(newCenter);
            });
            document.getElementById('Editmap').innerHTML = "";
        }

        geocode(locationInput, addrs);
    }
}

// Function to handle the change event on selects
function handleEditLocationInputChange() {
    const selectedDistrict = document.getElementById('EditAdLocationDistrict');
    const selectedDistrictOption = selectedDistrict.options[selectedDistrict.selectedIndex];
    const selectedDistrictText = selectedDistrictOption.textContent;
    console.log("selectedDistrict",selectedDistrict);
    console.log("selectedDistrictText",selectedDistrictText);

    const selectedWard = document.getElementById('EditAdLocationWard');
    const selectedWardOption = selectedWard.options[selectedWard.selectedIndex];
    const selectedWardText = selectedWardOption.textContent;

    // console.log("Edit:",selectedDistrict, selectedWard);
    if (selectedDistrict !== '' && selectedWard !== '') {
        var addrs = document.getElementById('EditAdLocationAddrs') ? document.getElementById('EditAdLocationAddrs').value : "";
        
        var locationInput = selectedWardText + ' ' + selectedDistrictText ;
        // console.log("Before Location",locationInput);
        // console.log("Location",locationInput);
        document.querySelector('#mapDisplay').style.display = 'block';
        
        if (document.getElementById('Editmap') == null || map == null) {
            map = L.map('Editmap');
            map.setView([10.762929812031853, 106.68248270284181], 13);

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                maxZoom: 19,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox/streets-v12', 
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ'  
            }).addTo(map);

            marker = L.marker([10.762929812031853, 106.68248270284181]).addTo(map)
                .bindPopup('A sample location.');

            map.on('move', (e) => {
                newCenter = map.getCenter();
                marker.setLatLng(newCenter);
            });
            document.getElementById('Newmap').innerHTML = "";
        } 
        
        geocode(locationInput, addrs);
    }
}

// Function to handle geocode logic
function geocode(locationInput, addrs) {
    console.log("Location:",addrs + ' ' + locationInput);
    
    var fullInput = addrs + ' ' + locationInput;
    // Open street map
    var apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullInput)}&format=json&limit=1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if a location is found
            if (data && data.length > 0) {
                //Nhớ coi kĩ cái data, trong document cũng có việc, mà coi nó log ra như nào thì dễ hơn
                console.log("data:", data);
                var location = data[0];
                var displayName = location.display_name;
                var lat = location.lat;
                var lon = location.lon;

                // Display the location information
                console.log(`Location: ${displayName}\nLatitude: ${lat}\nLongitude: ${lon}`);
                
                changeMarkerToSearchAddress(lat,lon);
            } else {
                // Display a message if no location is found and recorrect the input
                console.log("Location With Addrs not found.");
                var reCorrectApiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationInput)}&format=json&limit=1`;
                fetch(reCorrectApiUrl)
                    .then(response => response.json())
                    .then(data => {
                        // Check if a location is found
                        if (data && data.length > 0) {
                            //Nhớ coi kĩ cái data, trong document cũng có việc, mà coi nó log ra như nào thì dễ hơn
                            console.log("data:", data);
                            var location = data[0];
                            var displayName = location.display_name;
                            var lat = location.lat;
                            var lon = location.lon;

                            // Display the location information
                            console.log(`Location: ${displayName}\nLatitude: ${lat}\nLongitude: ${lon}`);
                            
                            changeMarkerToSearchAddress(lat,lon);
                        } else {
                            // Display a message if no location is found
                            console.log("Location not found.");
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('An error occurred while geocoding.');
                    });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while geocoding.');
        });
}

function changeMarkerToSearchAddress(lat, lon){
    map.flyTo([lat,lon], 18);
    marker.setLatLng([lat,lon]);
} 
// Confirm location
function confirmNewLocation() {
    const coordinates = marker.getLatLng();
    // Perform reverse geocoding to get address information
    reverseGeocodeNew(coordinates);
    document.querySelector('#mapDisplay').style.display = 'none';
}

function confirmEditLocation() {
    const coordinates = marker.getLatLng();
    // Perform reverse geocoding to get address information
    reverseGeocodeEdit(coordinates);
    document.querySelector('#mapDisplay').style.display = 'none';
}

// Get reverse geocoding information
function reverseGeocodeNew(coordinates) {
    // Use Mapbox Geocoding API for reverse geocoding
    document.querySelector('#newAdLocationLongtitude').value = coordinates.lng;
    document.querySelector('#newAdLocationLattitude').value = coordinates.lat;
    console.log(coordinates);
    var lat = coordinates.lat; var lon = coordinates.lng;
    console.log("lat: " + lat + " lon: " + lon);
    var apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.display_name) { 
                console.log(`Address: ${data.display_name}`);
            } else {
                // Display a message if no address information is found
                console.log("Address not found.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function reverseGeocodeEdit(coordinates) {
    // Use Mapbox Geocoding API for reverse geocoding
    document.querySelector('#EditAdLocationLongtitude').value = coordinates.lng;
    document.querySelector('#EditAdLocationLattitude').value = coordinates.lat;
    console.log(coordinates);
    var lat = coordinates.lat; var lon = coordinates.lng;
    console.log("lat: " + lat + " lon: " + lon);
    var apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.display_name) { 
                console.log(data)
                console.log(`Address: ${data.display_name}`);
            } else {
                // Display a message if no address information is found
                console.log("Address not found.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}