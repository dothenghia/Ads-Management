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
        idDuong: "nvc",// lấy tên quận, phường, đường

        type: 'Trụ bảng hiflex', // Loại bảng quảng cáo
        form: 'Cổ động chính trị', // Hình thức quảng cáo
        quantity: '1 trụ/bảng', // Số lượng
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
        idDuong: "tp",// Trần Phú

        type: 'Trụ/Cụm pano', // Loại bảng quảng cáo
        form: 'Cổ động chính trị', // Hình thức quảng cáo
        quantity: '2 trụ/bảng', // Số lượng
        locationType: 'Đất công', // Loại vị trí

        adList: [],
    },
]

// LƯU THÌ SẼ LƯU NHƯ THẾ NÀY
// NHƯNG KHI TRẢ DỮ LIỆU THÌ SẼ PHẢI GHÉP BẢNG/THAM CHIẾU NHÉ

const Account = [
    {
        accountId: 1,
        role: 1, // 1: Phường , 2: Quận, 3: Sở
        
        username: "",
        password: "", // (bcrypt) 

        idQuan: "5",   // Quận 5
        idPhuong: "4", // Phường 4

        fullname: "Khoa Meng",
        dob: '31/12/2023',
        email: 'test@gmail.com',
        phone: '0123456789',
    },
    {
        accountId: 2,
        role: 2, // Cán bộ Quận

        username: "",
        password: "", // (bcrypt)

        idQuan: "6",   // Quận 6
        idPhuong: "",

        fullname: "Khoa Meng",
        dob: '31/12/2023',
        email: 'test@gmail.com',
        phone: '0123456789',
    },
    {
        accountId: 3,
        role: 3, // Cán bộ Sở

        username: "",
        password: "", // (bcrypt)

        idQuan: "",
        idPhuong: "",

        fullname: "Khoa Meng",
        dob: '31/12/2023',
        email: 'test@gmail.com',
        phone: '0123456789',
    }
]

const PermissionReq = [
    {
        permissionReqId: 1,
        name: "Trụ panel",
        co: {
            id: "vincom",
            name: "Vin Cơm",
            email: "vcome@gmail.com",
            phone: "324932423"
        },
        locationId: 2,
        startdate: "22/12/2023",
        enddate: "22/12/2024",
        content: "Sơn tường MTP"
    },
    {
        permissionReqId: 2,
        name: "Bảng quảng cáo 69",
        co: {
            id: "coopmart",
            name: "Cốp Mắc",
            email: "coopmart@gmail.com",
            phone: "543643"
        },
        locationId: 2,
        startdate: "24/10/2024",
        enddate: "24/01/2025",
        content: "Sơn tường MTP"
    }
]

const ChangeReq = [
    {
        changeReqId: 1,
        locationId: 1,
        newLocationId: 2,
        date: "02/04/2024",
        reason: "Không phù hợp",
        senderRole: 2,
        status: 0
    }
]

module.exports = { 
    Report,
    Ad, 
    AdLocation,
    Account,
    PermissionReq,
    ChangeReq
};