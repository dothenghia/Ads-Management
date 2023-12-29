
let primaryColor = '#0D6EFD';
let primaryColorSubtle = '#75ADFF';

let chuaqhColor = '#0BC4E9';
let chuaqhColorSubtle = '#9EEAF9';

let reportColor = '#FF1E1E';
let reportColorSubtle = '#e8828e';

// import AdPopup from '/components/dan/popup/AdPopup.js';
// import AdSidebar from '/components/dan/sidebar/AdSidebar.js';
// import getAdLocationInfoById from '/functions/dan/getAdLocationInfoById.js';

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
                ['==', ['get', 'planning'], true], primaryColor, // Màu xanh khi planning là true
                ['==', ['get', 'planning'], false], chuaqhColor, // Màu xanh nhạt khi planning là false
                '#000000'
            ],
            'circle-radius': 11,
            'circle-stroke-width': 3,
            'circle-stroke-color': [
                'case',
                ['>', ['get', 'numberOfReports'], 0], reportColor, // Màu đỏ khi có báo cáo
                ['==', ['get', 'planning'], true], primaryColorSubtle, // Màu xanh khi planning là true
                ['==', ['get', 'planning'], false], chuaqhColorSubtle, // Màu xanh khi planning là true
                '#FF6400'
            ]
        }
    });

    // Tạo layer hiển thị chữ QC khi planning là true
    map.addLayer({
        id: 'AdMarker-text',
        type: 'symbol',
        source: 'CombinedLocation',
        filter: ['all',
            ['!', ['has', 'point_count']], // Loại bỏ những điểm là cluster và planning là false
            ['==', ['get', 'markerType'], 'Ad'], // Chỉ hiển thị dữ liệu có markerType là 'Ad'
            ['==', ['get', 'planning'], true], // Loại bỏ những điểm là cluster và planning là false
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


    
}
