// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Header from '/components/dan/Header.js';
import ReportListButton from '/components/dan/ReportListButton.js';

import DetailAdModal from '/components/dan/modal/DetailAdModal.js';
import SendReportModal from '/components/dan/modal/SendReportModal.js';
import DetailReportModal from '/components/dan/modal/DetailReportModal.js';

import AdMarker from '/components/dan/marker/AdMarker.js';
import ReportMarker from '/components/dan/marker/ReportMarker.js';

// Import Functions
import getAdLocationList from '/functions/dan/getAdLocationList.js';
import getReportLocationList from '/functions/dan/getReportLocationList.js';

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
            zoom: 15,
        });

        this.adLocationList = [];
        this.reportLocationList = [];
    },

    
    // Fetch dữ liệu các điểm QC và Show lên Map
    fetchAdMarkers: async function () {
        this.adLocationList = await getAdLocationList();
        this.renderAdMarkers();
    },
    renderAdMarkers: function () {
        this.adLocationList.forEach(adInfo => AdMarker(this.map, adInfo));
    },


    // Fetch dữ liệu các điểm Bị báo cáo và Show lên Map
    fetchReportMarkers: async function () {
        this.reportLocationList = await getReportLocationList();
        this.renderReportMarkers();
    },
    renderReportMarkers: function () {
        this.reportLocationList.forEach(reportInfo => ReportMarker(this.map, reportInfo));
    },


    // Dành cho th Bảo test show Modal
    TestModalHander: async function () {
        // Mở Modal Chi tiết QC
        $('.btn-modal-detail-ad').addEventListener('click', function (event) {
            event.preventDefault();

            // Add ID to Fetch Data
            const fetchDetailADData = async (ID) => {
                await DetailAdModal(ID);
                // Show modal
                var myModal = new bootstrap.Modal(document.getElementById('DetailAdModal'), {
                    backdrop: 'static',
                    keyboard: false,
                
                });
                myModal.show();
            }
            
            var modal = document.getElementById('DetailAdModal');
            if (modal == null) { fetchDetailADData(1); }
            else {
                // Remove Previous Modal, then fetch new data
                modal.remove();
                fetchDetailADData(2);
            }

        });

        

        // Mở Modal Phản hồi Báo cáo
        $('.btn-modal-send-rp').addEventListener('click', function (event) {
            event.preventDefault();

            // Add ID to Fetch Data
            const fetchDetailADData = async () => {
                await SendReportModal();
                // Show modal
                var myModal = new bootstrap.Modal(document.getElementById('SendReportModal'), {
                    backdrop: 'static',
                    keyboard: false,
                
                });
                myModal.show();
            }
            
            var modal = document.getElementById('SendReportModal');
            if (modal == null) { fetchDetailADData(); }
            else {
                // Remove Previous Modal, then fetch new data
                modal.remove();
                fetchDetailADData();
            }
        });

        // Mở Modal Chi tiết Báo cáo
        $('.btn-modal-detail-rp').addEventListener('click', function (event) {
            event.preventDefault();

            // Add ID to Fetch Data: Type: LC-Location Report, QC-Ad Report, State: 1-In Progress, 2-Processed, 3-Declined
            const fetchDetailADData = async (Type, State) => {
                await DetailReportModal(Type, State);
                // Show modal
                if (Type == 'LC')
                {
                    var myModal = new bootstrap.Modal(document.getElementById('DetailLCReport'), {
                    backdrop: 'static',
                    keyboard: false,
                    });
                    myModal.show();
                }
                else {
                    var myModal = new bootstrap.Modal(document.getElementById('DetailQCReport'), {
                    backdrop: 'static',
                    keyboard: false,
                    });
                    myModal.show();
                }
            }
            
            var modalLC = document.getElementById('DetailLCReport');
            var modalQC = document.getElementById('DetailQCReport');
            if (modalLC == null) { 
                if (modalQC != null) modalQC.remove();
                fetchDetailADData('LC', 2); 
            }
            else {
                // Remove Previous Modal, then fetch new data
                if (modalLC != null) modalLC.remove();
                fetchDetailADData('QC', 2);
            }
        });
    },


    // Render những thành phần cố định của Trang chủ như Header, Nút DS Báo cáo,...
    renderHomePage: function () {
        $i('main').innerHTML = `
            ${Header()}

            <div class="report-list-button-root"></div>
            
            <div class="modal-root"></div>
            
            <div class="sidebar-root"></div>
        `
        
        ReportListButton()
    },


    start: function () {
        this.init();
        this.fetchAdMarkers();
        this.fetchReportMarkers();
        this.renderHomePage();
        this.TestModalHander();
    }
}


trangchu.start();
