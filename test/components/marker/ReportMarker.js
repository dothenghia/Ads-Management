
let tgspColor = '#D21312';
let dkndColor = '#FFA33C';
let dgykColor = '#F448CE';
let gdtmColor = '#9747FF';

// import ReportPopup from '../popup/ReportPopup.js';
// import DetailReportModal from "../modal/DetailReportModal.js";
// import getReportInfoById from '/functions/dan/getReportInfoById.js';

export default function ReportMarker(map) {

    // Tạo layer hình tròn
    map.addLayer({
        id: 'ReportMarker-circle',
        type: 'circle',
        source: 'CombinedLocation',
        filter: [
            'all',
            ['!', ['has', 'point_count']],
            ['==', ['get', 'markerType'], 'Report'], // Chỉ hiển thị dữ liệu có markerType là 'Ad'
        ],
        paint: {
            'circle-color': [
                'case',
                ['==', ['get', 'reportForm'], 'Tố giác sai phạm'], tgspColor, // Màu của tgsp
                ['==', ['get', 'reportForm'], 'Đăng ký nội dung'], dkndColor, // Màu của dknd
                ['==', ['get', 'reportForm'], 'Đóng góp ý kiến'], dgykColor, // Màu của dgyk
                ['==', ['get', 'reportForm'], 'Giải đáp thắc mắc'], gdtmColor, // Màu của gdtm
                '#000000' // Màu mặc định
            ],
            'circle-radius': 14,
        }
    });

    map.loadImage('/assets/dan/icon/baocao_TGSP.png', (error, image) => {
        if (error) throw error;
        map.addImage('tgsp-icon', image);

        map.addLayer({
            id: 'ReportMarker-icon-tgsp',
            type: 'symbol',
            source: 'CombinedLocation',
            filter: [
                'all',
                ['!', ['has', 'point_count']],
                ['==', ['get', 'reportForm'], 'Tố giác sai phạm'],
                ['==', ['get', 'markerType'], 'Report']
            ],
            layout: {
                'icon-image': 'tgsp-icon',
                'icon-size': 0.75,
                // 'icon-allow-overlap': true
            }
        });
    });

    map.loadImage('/assets/dan/icon/baocao_DKND.png', (error, image) => {
        if (error) throw error;
        map.addImage('dknd-icon', image);

        map.addLayer({
            id: 'ReportMarker-icon-dknd',
            type: 'symbol',
            source: 'CombinedLocation',
            filter: [
                'all',
                ['!', ['has', 'point_count']],
                ['==', ['get', 'reportForm'], 'Đăng ký nội dung'],
                ['==', ['get', 'markerType'], 'Report']
            ],
            layout: {
                'icon-image': 'dknd-icon',
                'icon-size': 0.75,
                // 'icon-allow-overlap': true
            }
        });
    });

    map.loadImage('/assets/dan/icon/baocao_DGYK.png', (error, image) => {
        if (error) throw error;
        map.addImage('dgyk-icon', image);

        map.addLayer({
            id: 'ReportMarker-icon-dgyk',
            type: 'symbol',
            source: 'CombinedLocation',
            filter: [
                'all',
                ['!', ['has', 'point_count']],
                ['==', ['get', 'reportForm'], 'Đóng góp ý kiến'],
                ['==', ['get', 'markerType'], 'Report']
            ],
            layout: {
                'icon-image': 'dgyk-icon',
                'icon-size': 0.75,
                // 'icon-allow-overlap': true
            }
        });
    });

    map.loadImage('/assets/dan/icon/baocao_GDTM.png', (error, image) => {
        if (error) throw error;
        map.addImage('gdtm-icon', image);

        map.addLayer({
            id: 'ReportMarker-icon-gdtm',
            type: 'symbol',
            source: 'CombinedLocation',
            filter: [
                'all',
                ['!', ['has', 'point_count']],
                ['==', ['get', 'reportForm'], 'Giải đáp thắc mắc'],
                ['==', ['get', 'markerType'], 'Report']
            ],
            layout: {
                'icon-image': 'gdtm-icon',
                'icon-size': 0.75,
                // 'icon-allow-overlap': true
            }
        });
    });


    
}
