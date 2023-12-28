
// ! ĐIỀN ID QUẬN VÀ ID PHƯỜNG VÀO ĐÂY
let idPhuong = 'phuong_04'
let idQuan = 'quan_5'
// ! ================================

import mappingRegion from "../functions/dan/mappingRegion.js";
import { getBoundaryPhuong, getBoundaryQuan } from "./boundary.js";

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFyb2xvaSIsImEiOiJjbG8ybW1ucHcwOTZjMnF0ZGFqdXpwemUwIn0._gUBQBWHcx7zDxxK6UEUbQ';


const trangchu = {
    // ====== Hàm Khởi tạo các State
    init: function () {
        this.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [106.682667, 10.762886],
            zoom: 15
        })
        this.map.doubleClickZoom.disable();
    },

    // ====== Center map theo địa chỉ
    centerMap: function () {
        let { quan, phuong } = mappingRegion(idQuan, idPhuong)
        let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${phuong}, ${quan}, Thành phố Hồ Chí Minh, Việt Nam.json?access_token=${mapboxgl.accessToken}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                let coordinates = data.features[0].center;
                trangchu.map.setCenter(coordinates);
            })
    },

    // ====== Tạo boundary cho map
    createBoundary: function () {
        let coordinatesPhuong = getBoundaryPhuong(idQuan, idPhuong)
        // let coordinatesQuan = getBoundaryQuan(idQuan)

        trangchu.map.on('load', function () {
            // Tạo một GeoJSON feature với điểm geometry
            let boundaryGeojson = {
                type: 'Feature',
                geometry: { type: 'LineString', coordinates: coordinatesPhuong },
                properties: {}
            };

            // Thêm source cho line layer
            trangchu.map.addSource('line-source', {
                type: 'geojson',
                data: boundaryGeojson
            });

            // Thêm layer line
            trangchu.map.addLayer({
                id: 'line-layer',
                type: 'line',
                source: 'line-source',
                paint: {
                    'line-color': 'rgba(255, 0, 0, 0.8)', // Màu của đường line
                    'line-width': 3 // Độ rộng của đường line
                }
            });
        });
    },

    // ====== Render các Component và thẻ Root của Trang chủ
    renderHomePage: function () {
        document.getElementById('main').innerHTML = `
        
            <div class="modal-root"></div>

            <div class="sidebar-root"></div>
        `
    },


    // ====== Fetch dữ liệu các Địa điểm QC và Địa điểm BC
    fetchAdMarkers: async function () {
        fetch(`http://localhost:3000/bando/phuong/ddqc?idPhuongQuery=${idPhuong}&idQuanQuery=${idQuan}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    },

    fetchReportMarkers: async function () {
        fetch(`http://localhost:3000/bando/phuong/ddbcbk?idPhuongQuery=${idPhuong}&idQuanQuery=${idQuan}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    },

    // ====== Hiển thị và Gom nhóm các Địa điểm QC và Địa điểm BC
    renderMarkers: function () {

    },

    start: async function () {
        this.init();
        this.centerMap();
        this.createBoundary();

        this.renderHomePage();

        await this.fetchAdMarkers();
        await this.fetchReportMarkers();
        this.renderMarkers();
    }
}

trangchu.start();
