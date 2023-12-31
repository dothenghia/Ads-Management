
// ! ĐIỀN ID QUẬN VÀ ID PHƯỜNG VÀO ĐÂY
let idPhuong = 'phuong_04'
let idQuan = 'quan_5'
// ! ================================

// Import Functions
import mappingRegion from "./mappingRegion.js";
import { getBoundaryPhuong } from "./boundary.js";

// Import Components
import AdMarker from '../components/marker/AdMarker.js'
import ReportMarker from '../components/marker/ReportMarker.js'
import ReportListButton from '../components/ReportListButton.js';


mapboxgl.accessToken = 'pk.eyJ1IjoiYmFyb2xvaSIsImEiOiJjbG8ybW1ucHcwOTZjMnF0ZGFqdXpwemUwIn0._gUBQBWHcx7zDxxK6UEUbQ';


const trangchu = {
    // ====== Hàm Khởi tạo các State
    init: function () {
        this.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [106.682667, 10.762886],
            zoom: 16
        }).addControl(
            new mapboxgl.NavigationControl({ showCompass: true }),
            'bottom-right'
        )

        this.map.doubleClickZoom.disable();

        this.adLocationList = [];
        this.reportLocationList = [];
        this.boundary = [];
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
        let coordinates = getBoundaryPhuong(idQuan, idPhuong)
        this.boundary = coordinates

        trangchu.map.on('load', function () {
            // Tạo một GeoJSON feature với điểm geometry
            let boundaryGeojson = {
                type: 'Feature',
                geometry: { type: 'LineString', coordinates: coordinates },
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
                    'line-color': 'rgba(200, 0, 0, 0.8)', // Màu của đường line
                    'line-width': 3, // Độ rộng của đường line
                    'line-dasharray': [1, 1] // Độ dài và khoảng cách của các đường line
                }
            });
        });
    },

    // ====== Render các Component và thẻ Root của Trang chủ
    renderHomePage: function () {
        document.getElementById('map-homepage').innerHTML = `
        
            <div class="modal-root"></div>

            <div class="sidebar-root"></div>

            <div class="report-list-button-root"></div>
        `
        ReportListButton(trangchu.map, this.boundary)
    },


    // ====== Fetch dữ liệu các Địa điểm QC và Địa điểm BC
    fetchAdMarkers: async function () {
        let data = await fetch(`http://localhost:3000/bando/phuong/ddqc?idPhuongQuery=${idPhuong}&idQuanQuery=${idQuan}`)
        this.adLocationList = await data.json()
    },

    fetchReportMarkers: async function () {
        let data = await fetch(`http://localhost:3000/bando/ddbcbk`)
        let tempList = await data.json()
        // console.log(tempList)

        // Lọc các điểm báo cáo trong boundary
        const filteredReportMarkers = tempList.filter(point => isPointInsideBoundary(point, this.boundary));

        // console.log(filteredReportMarkers)
        this.reportLocationList = filteredReportMarkers
    },

    // ====== Hiển thị và Gom nhóm các Địa điểm QC và Địa điểm BC
    renderMarkers: function () {
        if (this.map) {
            // ====== 0. TẠO DỮ LIỆU CHUNG ======
            // Tạo bộ data chung bao gồm cả QC và BC (PHẢI VẬY MỚI GOM NHÓM ĐƯỢC)
            let combinedData = {
                type: 'FeatureCollection',
                features: [
                    ...this.adLocationList,
                    ...this.reportLocationList
                ]
            };
            // console.log(combinedData)


            // ====== 1. THÊM SOURCE VÀO MAP ======
            // Và set 'cluster' option to true
            // GL-JS sẽ thêm thuộc tính point_count vào dữ liệu nguồn.
            // CHO NÊN LÀ PHẢI THÊM FILTER ['!', ['has', 'point_count']] vào các marker bình thường
            this.map.addSource('CombinedLocation', {
                type: 'geojson',
                data: combinedData,
                cluster: true,
                clusterMaxZoom: 15,
                clusterRadius: 35
            });


            // ====== 2/ THÊM LAYER MARKER VÀO MAP ======
            // Render Địa điểm QC và Địa điểm BC
            AdMarker(this.map)

            ReportMarker(this.map)


            // ====== 3/ GOM NHÓM ======
            // Địa điểm QC - Khi Gom nhóm
            this.map.addLayer({
                id: 'LocationMarker-cluster',
                type: 'circle',
                source: 'CombinedLocation',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': [
                        'step', ['get', 'point_count'],
                        '#51bbd6', 3, // Ít hơn 3 sẽ là màu xanh
                        '#FFD93D', 5, // Ít hơn 5 sẽ là màu vàng
                        '#f28cb1'     // Còn lại là màu hồng
                    ],
                    'circle-radius': [
                        'step', ['get', 'point_count'], 15, 3, 20, 5, 25
                    ]
                }
            });

            // Hiển thị số lượng điểm trong 1 cluster
            this.map.addLayer({
                id: 'LocationMarker-cluster-count',
                type: 'symbol',
                source: 'CombinedLocation', // ID của cái source ở trên
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });
        }
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


// Hàm kiểm tra xem một điểm có nằm trong boundary hay không
function isPointInsideBoundary(point, boundary) {
    const [longitude, latitude] = point.geometry.coordinates;

    let isInside = false;

    for (let i = 0, j = boundary.length - 1; i < boundary.length; j = i++) {
        const xi = boundary[i][0], yi = boundary[i][1];
        const xj = boundary[j][0], yj = boundary[j][1];
        const intersect = ((yi > latitude) != (yj > latitude)) &&
            (longitude < (xj - xi) * (latitude - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }

    return isInside;
}
