import * as myGeoCode from './resources/component/geocode.js';
console.log(myGeoCode);


let map;
let marker;
let geocoder;
let responseDiv;
let response;
// initMap is now async
async function initMap() {

    const myLating = { lat: 10.775050, lng: 106.653960 }
    // Request libraries when needed, not in the script tag.
    const { Map } = await google.maps.importLibrary("maps");
    // Short namespaces can be used.
    map = new Map(document.getElementById("map"), {
        center: myLating,
        zoom: 9,
    });

}

initMap();

