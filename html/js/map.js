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
});