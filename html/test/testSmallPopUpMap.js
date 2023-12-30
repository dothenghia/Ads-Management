// smallPopUpMap.js
mapboxgl.accessToken = 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [106.68252581658903, 10.762915804743274], // Center of the KHTN
    zoom: 15,
});

const marker = new mapboxgl.Marker(); // Create a marker
let confirmButton = document.getElementById('confirmButton');
map.on('click', (event) => {
    // Show the confirm button
    confirmButton.style.display = 'block';
    // Set the marker at the clicked location
    marker.setLngLat(event.lngLat).addTo(map);
});

// Add event listeners to run geocode when both selects are chosen
document.getElementById('newPermissionReqDistrict').addEventListener('change', handleLocationInputChange);
document.getElementById('newPerSmissionReqWard').addEventListener('change', handleLocationInputChange);

// Function to handle geocode logic
function geocode(locationInput) {
    // Use Mapbox Geocoding API to get bounding box coordinates
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationInput)}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
            if (data.features.length > 0) {
                const bbox = data.features[0].bbox;

                if (bbox) {
                    // Set the map bounds based on the bounding box
                    map.setMaxBounds(bbox);
                    map.fitBounds(bbox, { padding: 20 });
                } else {
                    // Handle the case where bbox is not available
                    console.warn('Bounding box not available in the response. Using default zoom level.');
                    const defaultZoom = 14; // Adjust this value as needed
                    map.setZoom(defaultZoom);
                }

                // Show the confirm button
                confirmButton.style.display = 'block';

                // Set the marker at the location
                marker.setLngLat(data.features[0].center).addTo(map);
            } else {
                alert('Location not found.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while geocoding.');
        });
}

// Function to handle the change event on selects
function handleLocationInputChange() {
    const selectedDistrict = document.getElementById('newPermissionReqDistrict').value;
    const selectedWard = document.getElementById('newPermissionReqWard').value;

    if (selectedDistrict !== 'all' && selectedWard !== 'all') {
        const locationInput = selectedDistrict + ' ' + selectedWard;
        console.log(locationInput);
        geocode(locationInput);
    }
}

function confirmLocation() {
    const coordinates = marker.getLngLat();
    // Perform reverse geocoding to get address information
    reverseGeocode(coordinates);
    document.querySelector('#map').style.display = 'none';
}

function reverseGeocode(coordinates) {
    // Use Mapbox Geocoding API for reverse geocoding
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
            if (data.features.length > 0) {
                const address = data.features[0].place_name;
                console.log(data.features[0])
                alert(`Location: ${address.split(',')[1]}`);
            } else {
                alert('Reverse geocoding failed.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while reverse geocoding.');
        });
}
