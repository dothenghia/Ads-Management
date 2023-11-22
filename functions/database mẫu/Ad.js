// LƯU THÌ SẼ LƯU NHƯ THẾ NÀY
// NHƯNG KHI TRẢ DỮ LIỆU THÌ SẼ PHẢI GHÉP BẢNG/THAM CHIẾU NHÉ

const Ad = [
    {
        adId: 1,
        name: 'Bảng quảng cáo 1',
        size: '2.5m x 10m',
        contractStartDate: 'Ngày 10 tháng 01 năm 2023',
        contractEndDate: 'Ngày 18 tháng 10 năm 2023',
        thumbnails: [
            { url: "/assets/dan/thumbnail4.jpg" },
            { url: "/assets/dan/thumbnail5.jpg" },
            { url: "/assets/dan/thumbnail6.jpg" },
        ],
        
        reportId: "", // CÓ CÁI REPORT ID ĐỂ BIẾT XEM CÁI QC NÀY ĐÃ BỊ TỐ CÁO CHƯA
        // reportStatus: '', // Cái này sẽ lấy từ reportId
    },
    {
        adId: 2,
        name: 'Bảng quảng cáo 2',
        size: '5m x 5m',
        contractStartDate: 'Ngày 10 tháng 01 năm 2023',
        contractEndDate: 'Ngày 31 tháng 12 năm 2023',
        thumbnails: [], // KHÔNG CÓ HÌNH
        
        reportId: "",
        // reportStatus: '',
    },
    {
        adId: 3,
        name: 'Bảng quảng cáo 3',
        size: '6m x 6m',
        contractStartDate: 'Ngày 01 tháng 01 năm 2023',
        contractEndDate: 'Ngày 01 tháng 01 năm 2024',
        thumbnails: [
            { url: "/assets/dan/thumbnail6.jpg" },
            { url: "/assets/dan/thumbnail4.jpg" },
        ],
        
        reportId: 1, // CÁI NÀY ĐÃ BỊ BÁO CÁO NÈ
        // reportStatus: 'Đang xử lý',
    },
]
