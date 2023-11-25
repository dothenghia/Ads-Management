

// Import Components
import Header from '/components/dan/Header.js';
import ReportListButton from '/components/dan/ReportListButton.js';

import AdMarker from '/components/dan/marker/AdMarker.js';
import ReportMarker from '/components/dan/marker/ReportMarker.js';
import RandomMarker from '/components/dan/marker/RandomMarker.js';
import RandomPopup from '/components/dan/popup/RandomPopup.js';

// Import Functions
import { getAllAdList } from '/functions/dan/getAdLocationInfo.js';
import { getAllReportList } from '/functions/dan/getReportLocationInfo.js';

// MapBox Initialization
var mylongitude = 106.682667;
var mylatitude = 10.762886;


const trangchu = {
    // ====== Hàm Khởi tạo các State
    init: function () {
        this.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [mylongitude, mylatitude],
            accessToken: 'pk.eyJ1IjoiYmFyb2xvaSIsImEiOiJjbG8ybW1ucHcwOTZjMnF0ZGFqdXpwemUwIn0._gUBQBWHcx7zDxxK6UEUbQ',
            zoom: 16
        }).addControl(
            new mapboxgl.NavigationControl({ showCompass: true }),
            'bottom-right'
        ).addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
            }),
            'bottom-left'
        )

        this.map.doubleClickZoom.disable();

        this.adLocationList = [];
        this.reportLocationList = [];
    },


    // ====== Render các Component và thẻ Root của Trang chủ
    renderHomePage: function () {
        document.getElementById('main').innerHTML = `
            ${Header()}

            <div class="report-list-button-root"></div>
            
            <div class="modal-root"></div>
            
            <div class="sidebar-root"></div>

            <div class="random-popup-root"></div>

            <div class="captcha-box-root"></div>

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
    },


    // ====== Fetch dữ liệu các Địa điểm QC và Địa điểm BC
    fetchAdMarkers: async function () {
        this.adLocationList = await getAllAdList();
    },
    fetchReportMarkers: async function () {
        this.reportLocationList = await getAllReportList();
    },

    // ====== Hiển thị và Gom nhóm các Địa điểm QC và Địa điểm BC
    renderMarkers: function () {

        this.map.on('load', () => {

            // Phải loại bỏ các Báo cáo 'qc' và 'ddqc' để không gom nhóm trùng
            let filteredReportList = this.reportLocationList.features.filter(feature => feature.properties.type !== 'qc' && feature.properties.type !== 'ddqc');
            
            // ====== 0. TẠO DỮ LIỆU CHUNG ======
            // Tạo bộ data chung bao gồm cả QC và BC (PHẢI VẬY MỚI GOM NHÓM ĐƯỢC)
            // Và thêm thuộc tính 'markerType' để phân biệt QC và BC
            let combinedData = {
                type: 'FeatureCollection',
                features: [
                    ...this.adLocationList.features.map(feature => ({
                        ...feature,
                        properties: {
                            ...feature.properties,
                            markerType: 'Ad'
                        }
                    })),
                    ...filteredReportList.map(feature => ({
                        ...feature,
                        properties: {
                            ...feature.properties,
                            markerType: 'Report'
                        }
                    }))
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
                clusterMaxZoom: 14,
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
                        'step', ['get', 'point_count'], 15, 2, 20, 4, 25
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
        })

    },


    // ====== Xử lý sự kiện Lọc các Địa điểm QC và Địa điểm BC
    filterHandler: function () {
        document.querySelector('#filter-switch-ad').onclick = function () {
            if (this.checked) {
                trangchu.map.setLayoutProperty('AdMarker-circle', 'visibility', 'visible');
                trangchu.map.setLayoutProperty('AdMarker-text', 'visibility', 'visible');
            } else {
                trangchu.map.setLayoutProperty('AdMarker-circle', 'visibility', 'none');
                trangchu.map.setLayoutProperty('AdMarker-text', 'visibility', 'none');
            }
        }

        document.querySelector('#filter-switch-report').onclick = function () {
            if (this.checked) {
                trangchu.map.setLayoutProperty('ReportMarker-circle', 'visibility', 'visible');
                trangchu.map.setLayoutProperty('ReportMarker-icon-tgsp', 'visibility', 'visible');
                trangchu.map.setLayoutProperty('ReportMarker-icon-dknd', 'visibility', 'visible');
                trangchu.map.setLayoutProperty('ReportMarker-icon-dgyk', 'visibility', 'visible');
                trangchu.map.setLayoutProperty('ReportMarker-icon-gdtm', 'visibility', 'visible');
            } else {
                trangchu.map.setLayoutProperty('ReportMarker-circle', 'visibility', 'none');
                trangchu.map.setLayoutProperty('ReportMarker-icon-tgsp', 'visibility', 'none');
                trangchu.map.setLayoutProperty('ReportMarker-icon-dknd', 'visibility', 'none');
                trangchu.map.setLayoutProperty('ReportMarker-icon-dgyk', 'visibility', 'none');
                trangchu.map.setLayoutProperty('ReportMarker-icon-gdtm', 'visibility', 'none');
            }
        }
    },


    // ====== Xử lý khi người dùng nhấn 2 lần vào điểm bất kì trên bản đồ
    geocodingRandomPosotion: function () {
        this.map.on('dblclick', (e) => {
            var coordinates = e.lngLat.toArray();

            trangchu.map._markers.forEach(marker => {
                if (marker._element.id == 'random-marker') {
                    marker.remove();
                }
            })

            reverseGeocode(coordinates);
        });

        // Function to perform reverse geocoding
        function reverseGeocode(coordinates) {
            var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=pk.eyJ1IjoiYmFyb2xvaSIsImEiOiJjbG8ybW1ucHcwOTZjMnF0ZGFqdXpwemUwIn0._gUBQBWHcx7zDxxK6UEUbQ`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    var location = data;

                    let extractData = {
                        longitude: coordinates[0],
                        latitude: coordinates[1],

                        name: location.features[0].text,

                        region: `${location.features[1].text}, ${location.features[3].text}, ${location.features[4].text}`,
                    }

                    return extractData;
                })
                .then(data => {
                    RandomMarker(trangchu.map, data)

                    document.querySelector('.random-popup-root').innerHTML = RandomPopup(trangchu.map, data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    },

    start: async function () {
        this.init();
        this.renderHomePage();

        await this.fetchAdMarkers();
        await this.fetchReportMarkers();
        this.renderMarkers();

        this.filterHandler();
        this.geocodingRandomPosotion();
    }
}


trangchu.start();
