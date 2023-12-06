// ======================== FILE DỮ LIỆU MẪU ========================
// LƯU THÌ SẼ LƯU NHƯ THẾ NÀY
// NHƯNG KHI TRẢ DỮ LIỆU THÌ SẼ PHẢI GHÉP BẢNG/THAM CHIẾU NHÉ

const Report = [
    {
        reportId: 1,
        reportType: 'qc', // 'qc' || 'ddqc' || 'ddbk'

        locationId: 2,
        adId: 3,
        longitude: "",
        latitude: "",

        reportForm: 'Tố giác sai phạm', // 'Tố giác sai phạm' || 'Giải đáp thắc mắc' || 'Đóng góp ý kiến' || 'Giải đáp thắc mắc'
        status: 'Đang xử lý', // 'Đang xử lý' || 'Đã xử lý' || 'Từ chối'
        time: '10/01/2023',

        fullname: 'Thế Nghĩa',
        email: 'dtnghia21@clc.fitus.edu.vn',
        phone: '0123456789',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quam atque, ex nulla ab perferendis incidunt magni in eum, corporis enim sapiente architecto odio. Officiis ut perferendis molestias labore quos illum atque reprehenderit sit doloremque reiciendis?',
        images: [
            { url: "/assets/dan/thumbnail1.jpeg" },
            { url: "/assets/dan/thumbnail3.jpg" },
        ],
    },
    {
        reportId: 2,
        reportType: 'ddqc', // ĐỊA ĐIỂM QUẢNG CÁO

        locationId: 3,
        adId: "",
        longitude: "",
        latitude: "",

        reportForm: 'Giải đáp thắc mắc',
        status: 'Đã xử lý',
        time: '18/10/2023',

        fullname: 'Sinh tố dâu',
        email: 'sinhtodau@nhom7.com',
        phone: '6667778889',
        content: 'Nội dung tố cáo Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quam atque, ex nulla ab perferendis incidunt magni in eum, corporis enim sapiente architecto odio. Officiis ut perferendis molestias labore quos illum atque reprehenderit sit doloremque reiciendis?',
        images: [
            { url: "/assets/dan/thumbnail4.jpg" },
            { url: "/assets/dan/thumbnail5.jpg" },
        ],
    },
    {
        reportId: 3,
        reportType: 'ddqc',

        locationId: 5,
        adId: "",
        longitude: "",
        latitude: "",

        reportForm: 'Tố giác sai phạm',
        status: 'Đã xử lý',
        time: '04/06/2023',

        fullname: 'Thế Giới',
        email: 'thenghia@nhom7.com',
        phone: '6667778889',
        content: 'Tôi muốn tố giác về bảng quảng cáo này về việc nó không đúng với quy hoạch của thành phố. Tôi muốn tố giác về bảng quảng cáo này về việc nó không đúng với quy hoạch của thành phố. Tôi muốn tố giác về bảng quảng cáo này về việc nó không đúng với quy hoạch của thành phố.',
        images: [
            { url: "/assets/dan/thumbnail3.jpg" },
            { url: "/assets/dan/thumbnail6.jpg" },
        ],
    },
    {
        reportId: 4,
        reportType: 'ddbk', // ĐỊA ĐIỂM BẤT KỲ

        locationId: "",
        adId: "",
        longitude: 106.683838,
        latitude: 10.764617,

        reportForm: 'Tố giác sai phạm',
        status: 'Đang xử lý',
        time: '21/10/2023',

        fullname: 'Hello world',
        email: 'thenghia@nhom7.com',
        phone: '6667778889',
        content: 'Xin chào Thế giới nhé',
        images: [
            { url: "/assets/dan/thumbnail3.jpg" },
            { url: "/assets/dan/thumbnail6.jpg" },
        ],
    },
    {
        reportId: 5,
        reportType: 'ddbk', // ĐỊA ĐIỂM BẤT KỲ

        locationId: "",
        adId: "",
        longitude: 106.685008,
        latitude: 10.764479,

        reportForm: 'Đăng ký nội dung',
        status: 'Từ chối',
        time: '21/10/2023',

        fullname: 'Mì tôm thanh long',
        email: 'landautien@nhom7.com',
        phone: '6667778889',
        content: 'Tôi muốn đăng ký nội dung ở địa điểm này',
        images: [
            { url: "/assets/dan/thumbnail1.jpeg" },
        ],
    },
    {
        reportId: 6,
        reportType: 'ddbk', // ĐỊA ĐIỂM BẤT KỲ

        locationId: "",
        adId: "",
        longitude: 106.686322,
        latitude: 10.764507,

        reportForm: 'Đóng góp ý kiến',
        status: 'Đã xử lý',
        time: '21/10/2023',

        fullname: 'Bánh đồng xu phô mai',
        email: 'banhdongxuphomai@nhom7.com',
        phone: '6667778889',
        content: 'Tôi muốn đóng góp ý kiến về địa điểm này',
        images: [
            { url: "/assets/dan/thumbnail5.jpg" },
        ],
    },
    {
        reportId: 7,
        reportType: 'ddbk', // ĐỊA ĐIỂM BẤT KỲ

        locationId: "",
        adId: "",
        longitude: 106.687931,
        latitude: 10.764055,

        reportForm: 'Giải đáp thắc mắc',
        status: 'Đã xử lý',
        time: '21/10/2023',

        fullname: 'Trà chanh giã tay',
        email: 'trachang@giatay.com',
        phone: '6667778889',
        content: 'Tôi muốn được giải đáp thắc mắc về địa điểm này',
        images: [
            { url: "/assets/dan/thumbnail2.jpg" },
        ],
    }
]




const Ad = [
    {
        adId: 1,
        reportId: "", // CÓ CÁI REPORT ID ĐỂ BIẾT XEM CÁI QC NÀY ĐÃ BỊ TỐ CÁO CHƯA

        name: 'Bảng quảng cáo 1',
        size: '2.5m x 10m',
        contractStartDate: 'Ngày 10 tháng 01 năm 2023',
        contractEndDate: 'Ngày 18 tháng 10 năm 2023',
        thumbnails: [
            { url: "/assets/dan/thumbnail4.jpg" },
            { url: "/assets/dan/thumbnail5.jpg" },
            { url: "/assets/dan/thumbnail6.jpg" },
        ],
    },
    {
        adId: 2,
        reportId: "",

        name: 'Bảng quảng cáo 2',
        size: '5m x 5m',
        contractStartDate: 'Ngày 10 tháng 01 năm 2023',
        contractEndDate: 'Ngày 31 tháng 12 năm 2023',
        thumbnails: [
            { url: "/assets/dan/thumbnail5.jpg" },
            { url: "/assets/dan/thumbnail4.jpg" },
            { url: "/assets/dan/thumbnail6.jpg" },
        ],
    },
    {
        adId: 3,
        reportId: 1, // CÁI NÀY ĐÃ BỊ BÁO CÁO NÈ

        name: 'Bảng quảng cáo 3',
        size: '6m x 6m',
        contractStartDate: 'Ngày 01 tháng 01 năm 2023',
        contractEndDate: 'Ngày 01 tháng 01 năm 2024',
        thumbnails: [
            { url: "/assets/dan/thumbnail6.jpg" },
            { url: "/assets/dan/thumbnail4.jpg" },
        ],

    },
    {
        adId: 4,
        reportId: "",

        name: 'Bảng quảng cáo 4',
        size: '4m x 2m',
        contractStartDate: 'Ngày 31 tháng 01 năm 2023',
        contractEndDate: 'Ngày 30 tháng 04 năm 2024',
        thumbnails: [
            { url: "/assets/dan/thumbnail3.jpg" },
            { url: "/assets/dan/thumbnail5.jpg" },
        ]
    },
]




const AdLocation = [
    {
        locationId: 1,
        planning: true,
        longitude: 106.679085,
        latitude: 10.762585,

        reportId: "", // CÓ CÁI REPORT ID ĐỂ BIẾT XEM CÁI ĐiaDiem NÀY ĐÃ BỊ TỐ CÁO CHƯA

        thumbnails: [
            { url: "/assets/dan/thumbnail1.jpeg" },
            { url: "/assets/dan/thumbnail2.jpg" },
            { url: "/assets/dan/thumbnail3.jpg" },
        ],

        idQuan: "quan_5",
        idPhuong: "phuong_04",
        address: "Trần Phú - Trần Bình Trọng",

        adType: 'Trụ/Cụm pano', // Loại bảng quảng cáo
        adForm: 'Cổ động chính trị', // Hình thức quảng cáo
        locationType: 'Đất công', // Loại vị trí

        adList: [ // Danh sách quảng cáo tại địa điểm này
            { adId: 1 },
            { adId: 2 },
        ],
    },
    {
        locationId: 2,
        planning: true,
        longitude: 106.681622,
        latitude: 10.765123,

        reportId: "",

        thumbnails: [
            { url: "/assets/dan/thumbnail3.jpg" },
            { url: "/assets/dan/thumbnail2.jpg" },
            { url: "/assets/dan/thumbnail1.jpeg" },
        ],

        idQuan: "quan_5",
        idPhuong: "phuong_04",
        address: "227 Nguyên Văn Cừ",

        adType: 'Trụ bảng hiflex',
        adForm: 'Cổ động chính trị',
        locationType: 'Công viên',

        adList: [
            { adId: 3 },
        ],
    },
    {
        locationId: 3,
        planning: true,
        longitude: 106.683218,
        latitude: 10.761180,

        reportId: 2,

        thumbnails: [
            { url: "/assets/dan/thumbnail2.jpg" },
            { url: "/assets/dan/thumbnail1.jpeg" },
        ],

        idQuan: "quan_5",
        idPhuong: "phuong_04",
        address: "Nguyễn Văn Cừ - An Dương Vương",

        adType: 'Màn hình điện tử ốp tường',
        adForm: 'Xã hội hoá',
        locationType: 'Nhà chờ xe buýt',

        adList: [
            { adId: 4 }
        ],
    },
    {
        locationId: 4,
        planning: false,
        longitude: 106.686656,
        latitude: 10.762573,

        reportId: "",

        thumbnails: [],

        idQuan: "quan_1",
        idPhuong: "phuong_nguyen_cu_trinh",
        address: "Nguyễn Trãi - Nguyễn Cư Trinh",

        adType: 'Trụ màn hình điện tử LED',
        adForm: 'Quảng cáo thương mại',
        locationType: 'Trung tâm thương mại',

        adList: [],
    },
    {
        locationId: 5,
        planning: false,
        longitude: 106.689628,
        latitude: 10.761667,

        reportId: 3,

        thumbnails: [],

        idQuan: "quan_1",
        idPhuong: "phuong_nguyen_cu_trinh",
        address: "Trần Đình Xu - Trần Hưng Đạo",

        adType: 'Trụ treo băng rôn dọc',
        adForm: 'Xã hội hoá',
        locationType: 'Nhà ở riêng lẻ',

        adList: [],
    },
]



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
        adId: 1,
        startdate: "22/12/2023",
        enddate: "22/12/2024",
        content: "Sơn tường MTP",
        status: 0,
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
        adId: 3,
        startdate: "24/10/2024",
        enddate: "24/01/2025",
        content: "Sơn tường MTP",
        status: 2,
    },
    {
        permissionReqId: 3,
        name: "Bảng quảng cáo 69",
        co: {
            id: "coopmart",
            name: "Cốp Mắc",
            email: "coopmart@gmail.com",
            phone: "543643"
        },
        locationId: 2,
        adId: 1,
        startdate: "24/10/2024",
        enddate: "24/01/2025",
        content: "Sơn tường MTP",
        status: 1,
    }
]

const ChangeReq = [
    {
        changeReqId: 1,
        locationId: 2,
        newLocationId: 2,
        senderRole: 2,
        date: "02/04/2024",
        reason: "Không phù hợp",
        status: 0
    },
    {
        changeReqId: 2,
        locationId: 1,
        newLocationId: 2,
        senderRole: 2,
        date: "02/04/2024",
        reason: "Không phù hợp",
        status: 1
    },
    {
        changeReqId: 3,
        locationId: 1,
        newLocationId: 2,
        senderRole: 2,
        date: "02/04/2024",
        reason: "Không phù hợp",
        status: 2
    }
]

function changeId(dataType, id) {
    switch (dataType) {
        case 'report':
            Report.find(report => report.reportId == id).reportId = -1;
            module.exports.Report = Report;
            break;
        case 'adlocation':
            AdLocation.find(AdLocation => AdLocation.locationId == id).locationId = -1;
            break;
        case 'ad':
            Ad.find(ad => ad.adId == id).adId = -1;
            break;
        case 'account':
            Account.find(account => account.accountId == id).accountId = -1;
            break;
        case 'permissionreq':
            PermissionReq.find(permissionReq => permissionReq.permissionReqId == id).permissionReqId = -1;
            break;
        case 'changereq':
            ChangeReq.find(changeReq => changeReq.changeReqId == id).changeReqId = -1;
            break;

    }
}

module.exports = {
    Report,
    Ad,
    AdLocation,
    Account,
    PermissionReq,
    ChangeReq,
    changeId
};