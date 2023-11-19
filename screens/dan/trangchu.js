
// Import Components
import Header from '/components/dan/Header.js';
import ReportListButton from '/components/dan/ReportListButton.js';

import AdMarker from '/components/dan/marker/AdMarker.js';
import ReportMarker from '/components/dan/marker/ReportMarker.js';
import RandomMarker from '/components/dan/marker/RandomMarker.js';


// Import Functions
import { getAllAdList } from '/functions/dan/getAdLocationInfo.js';
import { getAllReportList } from '/functions/dan/getReportLocationInfo.js';

// MapBox Initialization
var mylongitude = 106.682667;
var mylatitude = 10.762886;

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFyb2xvaSIsImEiOiJjbG8ybW1ucHcwOTZjMnF0ZGFqdXpwemUwIn0._gUBQBWHcx7zDxxK6UEUbQ';


const trangchu = {
    init: function () {
        this.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [mylongitude, mylatitude],
            zoom: 16,
        });

        this.adLocationList = [];
        this.reportLocationList = [];
    },

    
    // Fetch dữ liệu các điểm QC và Show lên Map
    fetchAdMarkers: async function () {
        this.adLocationList = await getAllAdList();
        this.renderAdMarkers();
    },
    renderAdMarkers: function () {
        this.adLocationList.forEach(adInfo => AdMarker(this.map, adInfo));
    },


    // Fetch dữ liệu các điểm Bị báo cáo và Show lên Map
    fetchReportMarkers: async function () {
        this.reportLocationList = await getAllReportList();
        this.renderReportMarkers();
    },
    renderReportMarkers: function () {
        this.reportLocationList.forEach(reportInfo => ReportMarker(this.map, reportInfo));
    },


    renderHomePage: function () {
        document.getElementById('main').innerHTML = `
            ${Header()}

            <div class="report-list-button-root"></div>
            
            <div class="modal-root"></div>
            
            <div class="sidebar-root"></div>

            <div class="random-popup-root"></div>

            <div class="filter-switch-root">
                <h1 class="filter-title">Quảng cáo</h1>
                <label class="filter-switch">
                    <input type="checkbox" id="filter-switch-ad" checked>
                    <span class="filter-switch__slider round"></span>
                </label>
                <h1 class="filter-title divider">Báo cáo</h1>
                <label class="filter-switch">
                    <input type="checkbox" id="filter-switch-report" checked>
                    <span class="filter-switch__slider round"></span>
                </label>
            </div>
        `
        
        ReportListButton()
        RandomMarker(this.map)
    },


    filterHandler: function() {
        document.querySelector('#filter-switch-ad').onclick = function () {
            if(this.checked) {
                let markers = document.getElementsByClassName("ad-marker");
                for (let i = 0; i < markers.length; i++) {
                    markers[i].style.visibility = "visible";
                }
            } else {
                let markers = document.getElementsByClassName("ad-marker");
                for (let i = 0; i < markers.length; i++) {
                    markers[i].style.visibility = "hidden";
                }
            }
        }

        document.querySelector('#filter-switch-report').onclick = function () {
            if(this.checked) {
                let markers = document.getElementsByClassName("report-marker");
                for (let i = 0; i < markers.length; i++) {
                    markers[i].style.visibility = "visible";
                }
            } else {
                let markers = document.getElementsByClassName("report-marker");
                for (let i = 0; i < markers.length; i++) {
                    markers[i].style.visibility = "hidden";
                }
            }
        }
    },


    start: function () {
        this.init();
        this.fetchReportMarkers();
        this.fetchAdMarkers();
        this.renderHomePage();
        this.filterHandler();
    }
}


trangchu.start();
