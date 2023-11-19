// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Header from '/components/canbo/Header.js';
import SideBar from '/components/canbo/SideBar.js';

// Import Functions
import getAdsInfo from '/functions/canbo/getAdsInfo.js';
import setAdInfoBar from '/functions/canbo/setAdInfoBar.js';
import getRepInfo from '/functions/canbo/getRepInfo.js';
import getAreaInfo from '/functions/canbo/getAreaInfo.js';
import setReportListBar from '/functions/canbo/setReportListBar.js';

const trangchu = {
    init : function() {
        this.profileInfo = {"name": "Nguyễn Văn A", "quan": "binhthanh", "phuong": "3", "role": "phuong", "role_area": "3"}
        this.sidebarHrefs = ["#", "/screens/phuong/quanly/quanly.html", "/screens/phuong/kiemduyet/kiemduyet.html"];
        this.sidebarIcons = ["bando_icon.svg", "quanly_icon.svg", "kiemduyet_icon.svg"];
        this.sidebarLabels = ["Bản đồ", "Quản lý", "Kiểm duyệt"]
        this.ads = []
        this.areaInfo = {};
        this.repInfo = {}
        this.adTypeInfo = {};
    },

    fetchData : async function() {
        const ads = await getAdsInfo();
        this.ads = ads;

        const reps = await getRepInfo();
        this.repInfo = reps[this.profileInfo.quan].phuong[this.profileInfo.phuong].duong;

        this.adTypeInfo = ads[1];

        const areas = await getAreaInfo();
        this.areaInfo["quan"] = areas[this.profileInfo.quan].name;
        this.areaInfo["phuong"] = areas[this.profileInfo.quan].phuong[this.profileInfo.phuong].name

        this.render();
    },

    render : function() {
        const root = $i('root');
        root.innerHTML = `
            ${Header(this.profileInfo)}
        `

        let main = document.createElement("main");
        const adTypeInfo = this.adTypeInfo;
        const adStreetInfo = this.adStreetInfo;
        const areaInfo = this.areaInfo;

        main.innerHTML = `
            <div class="container-fluid d-flex flex-column">
                <div class="row flex-grow-1">
                    <div class="col-md-1 d-none d-sm-none d-md-block p-0">
                        ${
                            SideBar(this.sidebarIcons, this.sidebarLabels, this.sidebarHrefs, 0)
                        }
                    </div>
                    <div id="content" class="col-md-11 col-12">
                        <div class="offcanvas offcanvas-start" tabindex="51" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
                            <div class="offcanvas-header">
                                <h5 id="offcanvasLeftLabel">Offcanvas right</h5>
                                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvasLeft" aria-label="Close"></button>
                            </div>
                            <div id="adInfo" class="offcanvas-body">
                                
                            </div>
                        </div>

                        <div id="sideButtons">
                            <div id="report">
                                <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                    <img src="/assets/chung/icon/hopthu_icon.svg" alt="Filter">
                                </button>
                            </div>
                            <div class="offcanvas offcanvas-end" tabindex="51" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                <div class="offcanvas-header">
                                    <h5 id="offcanvasRightLabel">Báo cáo</h5>
                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvasRight" aria-label="Close"></button>
                                </div>
                                <div id="repInfo" class="offcanvas-body">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        root.appendChild(main);
        
        /* Reports sidebar */
        setReportListBar(this.repInfo, areaInfo, adTypeInfo);

        /* Map */
        const bounds = [
            [106.691989, 10.793368],     // Southwest coords
            [106.697761, 10.803528]    // Northeast coords
        ]
        let map = new mapboxgl.Map({
            container: 'content',
            zoom: 10,
            style:
            'mapbox://styles/mapbox/streets-v11',
            accessToken: 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ',
            maxBounds: bounds
        });
        map.addControl(
            new mapboxgl.NavigationControl({showCompass: false}),
            'bottom-left'
        );

        map.on('load', () => {
            // Add a new source from our GeoJSON data and
            // set the 'cluster' option to true. GL-JS will
            // add the point_count property to your source data.
            map.addSource('ads', {
                type: 'geojson',
                // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
                // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
                data: '/assets/chung/data/ad1.json',
                cluster: true,
                clusterMaxZoom: 17, // Max zoom to cluster points on
                clusterRadius: 150 // Radius of each cluster when clustering points (defaults to 50)
            });
             
            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'ads',
                filter: ['has', 'point_count'],
                paint: {
                    // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
                    // with three steps to implement three types of circles:
                    //   * Blue, 20px circles when point count is less than 100
                    //   * Yellow, 30px circles when point count is between 100 and 750
                    //   * Pink, 40px circles when point count is greater than or equal to 750
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#0065FF',
                        2,
                        '#f1f075',
                        4,
                        '#f28cb1'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        15,
                        2,
                        20,
                        4,
                        25
                    ]
                }
            });
             
            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'ads',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': ['get', 'point_count_abbreviated'],
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });
             
            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'ads',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 10,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            });
             
            // inspect a cluster on click
            map.on('click', 'clusters', (e) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;
                map.getSource('ads').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;
                        
                        map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            });
             
            // When a click event occurs on a feature in
            // the unclustered-point layer, open a popup at
            // the location of the feature, with
            // description HTML from its properties.
            map.on('click', 'unclustered-point', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const quan = e.features[0].properties.quan;
                const phuong = e.features[0].properties.phuong;
                const duong = e.features[0].properties.duong;
                const spotId = e.features[0].properties.id;
                const adId = this.ads[0][quan].phuong[phuong].duong[duong].diemqc[spotId];
                const quanName = this.ads[0][quan].name
                const phuongName = this.ads[0][quan].phuong[phuong].name
                const duongName = this.ads[0][quan].phuong[phuong].duong[duong].name
                
                // Ensure that if the map is zoomed out such that
                // multiple copies of the feature are visible, the
                // popup appears over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                
                const spotInfo = {"quan": quanName, "phuong": phuongName, "duong": duongName, "adId": adId}
                setAdInfoBar(spotInfo, this.ads[1]);
                let offcanvasElementList = [].slice.call(document.querySelectorAll('#offcanvasLeft'))
                offcanvasElementList.map(function (offcanvasEl) {
                    let offcanvas = new bootstrap.Offcanvas(offcanvasEl)
                    offcanvas.show();
                })
            });
             
            map.on('mouseenter', 'clusters', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'clusters', () => {
                map.getCanvas().style.cursor = '';
            });
        });
    },

    start : function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        this.fetchData(); // Xong sẽ fetch mấy cái data
        this.render(); // Xong sẽ render ra màn hình
    }
}

trangchu.start();