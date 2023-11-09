// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Header from '/components/dan/Header.js';
import DetailAdModal from '/components/dan/DetailAdModal.js';
import SendReportModal from '/components/dan/SendReportModal.js';
import DetailReportModal from '/components/dan/DetailReportModal.js';
import AdMarker from '/components/dan/AdMarker.js';

// Import Functions
import getAdLocationList from '/functions/dan/getAdLocationList.js';

// MapBox Initialization
var mylongitude = 106.682667;
var mylatitude = 10.762886;

mapboxgl.accessToken = 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ';


const trangchu = {
    init: function () {
        this.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [mylongitude, mylatitude],
            zoom: 15,
        });

        this.adLocationList = [];
    },

    
    // Fetch dữ liệu các điểm QC và Show lên Map
    fetchAdMarkers: async function () {
        const data = await getAdLocationList();
        this.adLocationList = data;

        this.renderAdMarkers();
    },
    renderAdMarkers: function () {
        this.adLocationList.forEach(ad => {
            AdMarker(ad.type, this.map, ad.lng, ad.lat);
        });
    },


    // Dành cho th Bảo test show Modal
    TestModalHander: function () {
        // Mở Modal Chi tiết QC
        $('.btn-modal-detail-ad').addEventListener('click', function () {
            console.log('click');
            
        });

        // Mở Modal Phản hồi Báo cáo
        $('.btn-modal-send-rp').addEventListener('click', function () {
            console.log('click 1');
        });

        // Mở Modal Chi tiết Báo cáo
        $('.btn-modal-detail-rp').addEventListener('click', function () {
            console.log('click 2');
        });
    },


    // Render những thành phần cố định của Trang chủ như Header, Nút DS Báo cáo,...
    renderHomePage: function () {
        $i('main').innerHTML = `
            ${Header()}
            ${DetailAdModal()}
            ${SendReportModal()}
            ${DetailReportModal()}
        `
    },


    start: function () {
        this.init();
        this.fetchAdMarkers();
        this.renderHomePage();
        this.TestModalHander();
    }
}

trangchu.start();
