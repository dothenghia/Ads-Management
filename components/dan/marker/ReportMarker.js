
let tgspColor = '#DC3545';
let dkndColor = '#F6BA45';
let dgykColor = '#F448CE';
let gdtmColor = '#9747FF';

export default function ReportMarker(map) {

    // Tạo layer hình tròn
    map.addLayer({
        id: 'ReportMarker-circle',
        type: 'circle',
        source: 'CombinedLocation',
        filter: [
            'all',
            ['!', ['has', 'point_count']],
            ['==', ['get', 'type'], 'ddbk'], // Chỉ hiển thị điểm có type là 'ddbk'
            ['==', ['get', 'markerType'], 'Report'] // Chỉ hiển thị dữ liệu có markerType là 'Ad'
        ],
        paint: {
            'circle-color': [
                'case',
                ['==', ['get', 'form'], 'Tố giác sai phạm'], tgspColor, // Màu của tgsp
                ['==', ['get', 'form'], 'Đăng ký nội dung'], dkndColor, // Màu của dknd
                ['==', ['get', 'form'], 'Đóng góp ý kiến'], dgykColor, // Màu của dgyk
                ['==', ['get', 'form'], 'Giải đáp thắc mắc'], gdtmColor, // Màu của gdtm
                '#000000' // Màu mặc định
            ],
            'circle-radius': 13,
        }
    });
    
}
