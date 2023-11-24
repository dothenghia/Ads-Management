
// Import components
import AdMarker from "/components/dan/marker/AdMarker.js";
import ReportMarker from "/components/dan/marker/ReportMarker.js";

// MapBox Initialization
var mylongitude = 106.682667;
var mylatitude = 10.762886;


const trangchu = {
    init: function () {
        this.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [mylongitude, mylatitude],
            accessToken: 'pk.eyJ1IjoiYmFyb2xvaSIsImEiOiJjbG8ybW1ucHcwOTZjMnF0ZGFqdXpwemUwIn0._gUBQBWHcx7zDxxK6UEUbQ',
            zoom: 15
        })

        this.map.doubleClickZoom.disable();

        this.adLocationList = [];
        this.reportLocationList = [];
    },


    // Fetch dữ liệu các điểm QC và Show lên Map
    fetchAdMarkers: async function () {
        let data = await fetch('/functions/dan/AdLocation.json');
        this.adLocationList = await data.json();
    },

    // Fetch dữ liệu các điểm QC và Show lên Map
    fetchReportMarkers: async function () {
        let data = await fetch('/functions/dan/ReportLocation.json');
        this.reportLocationList = await data.json();
    },


    clusteringMarkers: function () {

        this.map.on('load', () => {

            let filteredReportList = this.reportLocationList.features.filter(feature => 
                feature.properties.type !== 'qc' && feature.properties.type !== 'ddqc'
            );
            console.log(filteredReportList)

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
            console.log(combinedData)

            // ====== 1. THÊM SOURCE VÀO MAP ======
            // Và set 'cluster' option to true
            // GL-JS sẽ thêm thuộc tính point_count vào dữ liệu nguồn.
            // CHO NÊN LÀ PHẢI THÊM FILTER ['!', ['has', 'point_count']] VÀO các marker bình thường
            this.map.addSource('CombinedLocation', {
                type: 'geojson',
                data: combinedData,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 30
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
                        'step',
                        ['get', 'point_count'],
                        '#51bbd6', 3, // Ít hơn 3 sẽ là màu
                        '#f1f075', 5, // Ít hơn 5 sẽ là màu vàng
                        '#f28cb1'     // Còn lại là màu hồng
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        15, 2, 20, 4, 25
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


    start: async function () {
        this.init();

        await this.fetchAdMarkers();
        await this.fetchReportMarkers();

        this.clusteringMarkers();

    }
}


trangchu.start();




// // ====== 1. THÊM SOURCE VÀO MAP ======
//             // Và set 'cluster' option to true
//             // GL-JS sẽ thêm thuộc tính point_count vào dữ liệu nguồn.
//             // CHO NÊN LÀ PHẢI THÊM FILTER ['!', ['has', 'point_count']] VÀO các marker bình thường
//             this.map.addSource('AdLocation', { // ID của Source, muốn đặt j đặt
//                 type: 'geojson',
//                 data: this.adLocationList, // Dữ liệu geojson
//                 cluster: true,
//                 clusterMaxZoom: 14, // Max zoom để bắt đầu clustering
//                 clusterRadius: 30
//             });

//             this.map.addSource('ReportLocation', {
//                 type: 'geojson',
//                 data: this.reportLocationList,
//                 cluster: true,
//                 clusterMaxZoom: 14,
//                 clusterRadius: 30
//             });


//             // ====== 2/ THÊM LAYER MARKER VÀO MAP ======
//             // Render Địa điểm QC và Địa điểm BC
//             AdMarker(this.map)

//             ReportMarker(this.map)


//             // ====== 3/ GOM NHÓM ======
//             // Địa điểm QC - Khi Gom nhóm
//             this.map.addLayer({
//                 id: 'AdMarker-cluster',
//                 type: 'circle',
//                 source: 'AdLocation',
//                 filter: ['has', 'point_count'],
//                 paint: {
//                     'circle-color': [
//                         'step',
//                         ['get', 'point_count'],
//                         '#51bbd6', 3, // Ít hơn 3 sẽ là màu
//                         '#f1f075', 5, // Ít hơn 5 sẽ là màu vàng
//                         '#f28cb1'     // Còn lại là màu hồng
//                     ],
//                     'circle-radius': [
//                         'step',
//                         ['get', 'point_count'],
//                         15, 2, 20, 4, 25
//                     ]
//                 }
//             });

//             // Hiển thị số lượng điểm trong 1 cluster
//             this.map.addLayer({
//                 id: 'AdMarker-cluster-count',
//                 type: 'symbol',
//                 source: 'AdLocation', // ID của cái source ở trên
//                 filter: ['has', 'point_count'],
//                 layout: {
//                     'text-field': ['get', 'point_count_abbreviated'],
//                     'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
//                     'text-size': 12
//                 }
//             });