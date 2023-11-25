
let primaryColor = '#0D6EFD';
let primaryColorSubtle = '#75ADFF';

let chuaqhColor = '#0BC4E9';
let chuaqhColorSubtle = '#9EEAF9';

let reportColor = '#FF1E1E';
let reportColorSubtle = '#e8828e';

import AdPopup from '/components/dan/popup/AdPopup.js';
import AdSidebar from '/components/dan/sidebar/AdSidebar.js';
import { getAdLocationInfoById } from '/functions/dan/getAdLocationInfo.js';

export default function AdMarker(map) {

    // Tạo layer hình tròn
    map.addLayer({
        id: 'AdMarker-circle',
        type: 'circle',
        source: 'CombinedLocation',
        filter: [
            'all',
            ['!', ['has', 'point_count']], // Lọc ra những điểm ko phải cluster
            ['==', ['get', 'markerType'], 'Ad'], // Chỉ hiển thị dữ liệu có markerType là 'Ad'
        ],
        paint: {
            'circle-color': [
                'case',
                // ['==', ['get', 'isReported'], true], reportColor, // Màu xanh nhạt khi quyhoach là false
                ['==', ['get', 'quyhoach'], true], primaryColor, // Màu xanh khi quyhoach là true
                ['==', ['get', 'quyhoach'], false], chuaqhColor, // Màu xanh nhạt khi quyhoach là false
                '#000000'
            ],
            'circle-radius': 11,
            'circle-stroke-width': 3,
            'circle-stroke-color': [
                'case',
                ['==', ['get', 'isReported'], true], reportColor, // Màu xanh khi quyhoach là true
                ['==', ['get', 'quyhoach'], true], primaryColorSubtle, // Màu xanh khi quyhoach là true
                ['==', ['get', 'quyhoach'], false], chuaqhColorSubtle, // Màu xanh khi quyhoach là true
                '#FF6400'
            ]
        }
    });

    // Tạo layer hiển thị chữ QC khi quyhoach là true
    map.addLayer({
        id: 'AdMarker-text',
        type: 'symbol',
        source: 'CombinedLocation',
        filter: ['all',
            ['!', ['has', 'point_count']], // Loại bỏ những điểm là cluster và quyhoach là false
            ['==', ['get', 'quyhoach'], true], // Loại bỏ những điểm là cluster và quyhoach là false
            ['==', ['get', 'markerType'], 'Ad'] // Chỉ hiển thị dữ liệu có markerType là 'Ad'
        ],
        layout: {
            'text-field': 'QC',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-anchor': 'center',
            'text-offset': [0, 0]
        },
        paint: {
            'text-color': '#FFFFFF' // Màu chữ QC
        }
    });


    // Xử lý sự kiện click vào marker
    map.on('click', 'AdMarker-circle', (e) => {
        let infomationOfMarker = e.features[0];
        // console.log(infomationOfMarker.properties);

        getAdLocationInfoById(infomationOfMarker.properties.locationId).then(adInfo => {
            document.querySelector('.sidebar-root').innerHTML = AdSidebar(adInfo)
        })
    });


    // Tạo popup (Nhưng chưa hiển thị)
    let popup = new mapboxgl.Popup({
        offset: 20, // Dời lên 20px
        closeButton: false, // Không hiển thị nút đóng
    })

    // Xử lý sự kiện hover vào marker
    map.on('mouseenter', 'AdMarker-circle', (e) => {
        map.getCanvas().style.cursor = 'pointer';

        let infomationOfMarker = e.features[0];
        // console.log(infomationOfMarker.properties);
        const coordinates = e.features[0].geometry.coordinates.slice();

        // Đảm bảo rằng nếu bản đồ được thu nhỏ sao cho có thể nhìn thấy nhiều bản sao của đối tượng địa lý thì cửa sổ bật lên sẽ xuất hiện trên bản sao được trỏ tới.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) { coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360; }

        // Show popup
        popup.setLngLat(coordinates)
            .setHTML(
                `${AdPopup(infomationOfMarker.properties)}`
            )
            .addTo(map);
    });

    map.on('mouseleave', 'AdMarker-circle', () => {
        map.getCanvas().style.cursor = '';

        popup.remove();
    });
}
