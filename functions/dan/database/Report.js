// LƯU THÌ SẼ LƯU NHƯ THẾ NÀY
// NHƯNG KHI TRẢ DỮ LIỆU THÌ SẼ PHẢI GHÉP BẢNG/THAM CHIẾU NHÉ

const Report = [
    {
        reportId: 1,
        reportType: 'qc', // 'qc' || 'ddqc' || 'ddbk'
        
        locationId: 2,
        adId: 3,
        longitude: "", // Sẽ được lấy từ locationId và adId
        latitude: "",  // Sẽ được lấy từ locationId và adId
        // Đồng thời Khi trả dữ liệu cho Người dân
        // thì lấy thêm name, address và region từ locationId và adId

        reportForm: 'Tố giác sai phạm', // 'Tố giác sai phạm' || 'Giải đáp thắc mắc' || 'Đóng góp ý kiến' || 'Giải đáp thắc mắc'
        status: 'Đang xử lý', // 'Đang xử lý' || 'Đã xử lý' || 'Từ chối'
        time: '10/01/2023',

        fullname: 'Thế Nghĩa',
        email: 'thenghia@nhom7.com',
        phone: '0123456789',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quam atque, ex nulla ab perferendis incidunt magni in eum, corporis enim sapiente architecto odio. Officiis ut perferendis molestias labore quos illum atque reprehenderit sit doloremque reiciendis?',
        images: [
            {url: "/assets/dan/thumbnail1.jpeg"},
            {url: "/assets/dan/thumbnail3.jpg"},
        ],
    },
    {
        reportId: 2,
        reportType: 'ddqc', // ĐỊA ĐIỂM QUẢNG CÁO

        locationId: 3,
        adId: "",
        longitude: "", // Sẽ được lấy từ locationId
        latitude: "",  // Sẽ được lấy từ locationId

        reportForm: 'Giải đáp thắc mắc',
        status: 'Đang xử lý',
        time: '18/10/2023',

        fullname: 'Sinh tố dâu',
        email: 'sinhtodau@nhom7.com',
        phone: '6667778889',
        content: 'Nội dung tố cáo Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quam atque, ex nulla ab perferendis incidunt magni in eum, corporis enim sapiente architecto odio. Officiis ut perferendis molestias labore quos illum atque reprehenderit sit doloremque reiciendis?',
        images: [
            {url: "/assets/dan/thumbnail4.jpg"},
            {url: "/assets/dan/thumbnail5.jpg"},
        ],
    },
    {
        reportId: 3,
        reportType: 'ddbk', // ĐỊA ĐIỂM BẤT KỲ

        locationId: "",
        adId: "",
        longitude: 106.685008,
        latitude: 10.764479,

        reportForm: 'Tố giác sai phạm',
        status: 'Đang xử lý',
        time: '21/10/2023 - 21:10:23',

        fullname: 'Thế Giới',
        email: 'thenghia@nhom7.com',
        phone: '6667778889',
        content: 'Xin chào Thế giới nhé',
        images: [
            {url: "/assets/dan/thumbnail3.jpg"},
            {url: "/assets/dan/thumbnail6.jpg"},
        ],
    }
]
