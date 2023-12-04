// LƯU THÌ SẼ LƯU NHƯ THẾ NÀY
// NHƯNG KHI TRẢ DỮ LIỆU THÌ SẼ PHẢI GHÉP BẢNG/THAM CHIẾU NHÉ

const AdLocation = [
    {
        locationId: 2,
        quyhoach: true,
        longitude: 106.681622,
        latitude: 10.765123,

        reportId: "",// CÓ CÁI REPORT ID ĐỂ BIẾT XEM CÁI ĐiaDiem NÀY ĐÃ BỊ TỐ CÁO CHƯA
        // reportStatus: '', Sẽ lấy từ reportId

        thumbnails: [
            { url: "/assets/dan/thumbnail3.jpg" },
            { url: "/assets/dan/thumbnail2.jpg" },
            { url: "/assets/dan/thumbnail1.jpeg" },
        ],

        idQuan: "5",   // Trả về mấy cái id
        idPhuong: "4", // Bên client sẽ có file json để
        address: "227 Nguyễn Văn Cừ",// lấy tên quận, phường, đường

        type: 'Trụ bảng hiflex', // Loại bảng quảng cáo
        form: 'Cổ động chính trị', // Hình thức quảng cáo
        locationType: 'Công viên', // Loại vị trí

        adList: [
            {adId : 1},
            {adId : 3},
        ],
    },
    {
        locationId: 1,
        quyhoach: false,
        longitude: 106.679085,
        latitude: 10.762585,

        reportId: "", // Nếu khác "" thì tất là nó bị report
        // reportStatus: '',

        thumbnails: [],

        idQuan: "5",   // Quận 5
        idPhuong: "4", // Phường 4
        address: "123 Trần Phú",// Trần Phú

        type: 'Trụ/Cụm pano', // Loại bảng quảng cáo
        form: 'Cổ động chính trị', // Hình thức quảng cáo
        locationType: 'Đất công', // Loại vị trí

        adList: [],
    },
]
