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

    geocoder = new google.maps.Geocoder();

    const inputText = document.createElement("input");

    inputText.type = "text";
    inputText.placeholder = "Enter a location";

    const submitButton = document.createElement("input");

    submitButton.type = "button";
    submitButton.value = "Geocode";
    submitButton.classList.add("button", "button-primary");

    const clearButton = document.createElement("input");

    clearButton.type = "button";
    clearButton.value = "Clear";
    clearButton.classList.add("button", "button-secondary");
    response = document.createElement("pre");
    response.id = "response";
    response.innerText = "";
    responseDiv = document.createElement("div");
    responseDiv.id = "response-container";
    responseDiv.appendChild(response);

    const instructionsElement = document.createElement("p");

    instructionsElement.id = "instructions";
    instructionsElement.innerHTML =
        "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(
        instructionsElement
    );
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
    marker = new google.maps.Marker({
        map,
    });
    map.addListener("click", (e) => {
        myGeoCode.geocode({ location: e.latLng });
    });
    submitButton.addEventListener("click", () =>
        myGeoCode.geocode({ address: inputText.value })
    );
    clearButton.addEventListener("click", () => {
        myGeoCode.clear();
    });
    myGeoCode.clear();
}

initMap();

