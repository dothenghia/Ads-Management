
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


    // Render những thành phần cố định của Trang chủ như Header, Nút DS Báo cáo và các Root để attach component
    renderHomePage: function () {
        document.getElementById('main').innerHTML = `
            ${Header()}

            <div class='py-2 container '>
                ${SideBar('Quản lý', 'Xem báo cáo', 'HaiMen', 'Quản lý Cán bộ')}
            </div>

            <div class="report-list-button-root"></div>
            
            <div class="modal-root"></div>
            
            <div class="sidebar-root"></div>

            <div class="random-popup-root"></div>
        `
        
        ReportListButton()
        RandomMarker(this.map)
    },


    start: function () {
        this.init();
        this.fetchAdMarkers();
        this.fetchReportMarkers();
        this.renderHomePage();
    }
}


trangchu.start();
