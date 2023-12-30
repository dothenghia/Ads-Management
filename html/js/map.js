const $i = document.getElementById.bind(document);

/* Map */
const bounds = [
    [106.691989, 10.793368],     // Southwest coords
    [106.697761, 10.803528]    // Northeast coords
]

const ads = document.currentScript.dataset.ads;
const adLocations = document.currentScript.dataset.adLocations;
const featureCollection = document.currentScript.dataset.featureCollection;

let map = new mapboxgl.Map({
    container: 'content',
    zoom: 10,
    style:
    'mapbox://styles/mapbox/streets-v11',
    accessToken: 'pk.eyJ1Ijoia2l6bmxoIiwiYSI6ImNsbzBnbGdnMzBmN3EyeG83OGNuazU1c3oifQ.L5tt4RHOL3zcsWEFsCBRTQ'
});
map.addControl(
    new mapboxgl.NavigationControl(),
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
        data: JSON.parse(featureCollection),
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
        const quan = e.features[0].properties.district;
        const phuong = e.features[0].properties.ward;
        const duong = e.features[0].properties.street;
        const fullAddress = duong + ", " + phuong + ", " + quan;
        const ads = JSON.parse(e.features[0].properties.adList);
        const adForm = e.features[0].properties.adForm;
        const adType = e.features[0].properties.adType;
        const locationType = e.features[0].properties.locationType;
        const thumbnails = JSON.parse(e.features[0].properties.thumbnails);
        
        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        let i = 0;
        let locationThumbnails = ``;
        console.log(thumbnails);
        thumbnails.forEach((thumbnail) => {
            let item;
            if (i == 0)
                item = `<div class="carousel-item active">
                    <img class="d-block w-100" src="${thumbnail.url}" alt="First slide">
                </div>`;
            else
                item = `<div class="carousel-item">
                    <img class="d-block w-100" src="${thumbnail.url}" alt="First slide">
                </div>`;
            
                locationThumbnails += item;
            i++;
        });
        
        let adInfoBar = $i("adInfo");
        let adInfoCards = `
            <div class="offcanvas-header">
                <h5 id="offcanvasLeftLabel">${fullAddress}</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvasLeft" aria-label="Close"></button>
            </div>

            <p>Hình thức: ${adForm}</p>
            <p>Loại quảng cáo: ${adType}</p>
            <p>Loại vị trí: ${locationType}</p>
            <div id="locationThumbnails" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    ${locationThumbnails}
                </div>
                <a class="carousel-control-prev" href="#locationThumbnails" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only"></span>
                </a>
                <a class="carousel-control-next" href="#locationThumbnails" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only"></span>
                </a>
            </div>
        `;

        ads.forEach(function (ad) {
            let startDateObject = new Date(ad.contractStartDate);
            let startDate = "Ngày " + startDateObject.getDate().toString().padStart(2, 0) + " tháng " + (startDateObject.getMonth() + 1).toString().padStart(2, 0) + " năm " + startDateObject.getFullYear();

            let endDateObject = new Date(ad.contractEndDate);
            let endDate = "Ngày " + endDateObject.getDate().toString().padStart(2, 0) + " tháng " + (endDateObject.getMonth() + 1).toString().padStart(2, 0) + " năm " + endDateObject.getFullYear();

            let adThumbnails = ``;
            i = 0;
            ad.thumbnails.forEach((thumbnail) => {
                let item;
                if (i == 0)
                    item = `<div class="carousel-item active">
                        <img class="d-block w-100" src="${thumbnail.url}" alt="First slide">
                    </div>`;
                else
                    item = `<div class="carousel-item">
                        <img class="d-block w-100" src="${thumbnail.url}" alt="First slide">
                    </div>`;
                
                adThumbnails += item;
                i++;
            });

            let adInfoCard = `
            <div id="adDetail">
                <h5>${ad.name}</h5>
                <hr>
                <p>Kích thước: ${ad.size}</p>
                <p>Ngày bắt đầu hợp đồng: ${startDate}</p>
                <p>Ngày bắt đầu hợp đồng: ${endDate}</p>
                <div id="adThumbnails" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${adThumbnails}
                    </div>
                    <a class="carousel-control-prev" href="#adThumbnails" role="button" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only"></span>
                    </a>
                    <a class="carousel-control-next" href="#adThumbnails" role="button" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only"></span>
                    </a>
                </div>
            </div>
            `
            adInfoCards += adInfoCard;
        });
        
        adInfoBar.innerHTML = adInfoCards;

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
     
    map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = '';
    });
});