
const fakeReportLocationInfo = [
    {
        id: 1,
        type: 'qc',
        longitude: 106.683218,
        latitude: 10.761180,

        name: 'Bảng quảng cáo 1',
        address: "Nguyễn Văn Cừ - An Dương Vương",
        region: "Phường 4, Quận 5",
        form: 'Tố giác sai phạm',
        status: 'Đang xử lý',
        time: '10/01/2023 - 05:06:11',

        fullname: 'Thế Nghĩa',
        email: 'thenghia@nhom7.com',
        phone: '0123456789',
        content: 'Nội dung tố cáo',
        images: [
            {url: "/assets/dan/thumbnail1.jpeg"},
            {url: "/assets/dan/thumbnail3.jpg"},
        ],
    },
    {
        id: 3,
        type: 'qc',
        longitude: 106.689628,
        latitude: 10.761667,

        name: '123 Trần Đình Xu',
        address: "Trần Đình Xu - Trần Hưng Đạo",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        form: 'Giải đáp thắc mắc',
        status: 'Đã xử lý',
        time: '18/10/2023 - 18:10:23',

        fullname: 'Sinh tố dâu',
        email: 'thenghia@nhom7.com',
        phone: '6667778889',
        content: 'Nội dung tố cáo',
        images: [
            {url: "/assets/dan/thumbnail4.jpg"},
            {url: "/assets/dan/thumbnail5.jpg"},
        ],
    },
    {
        id: 2,
        type: 'dd',
        longitude: 106.684880,
        latitude: 10.764990,

        name: 'Bảng quảng cáo 2',
        address: "Nguyễn Văn Cừ - Trần Phú",
        region: "Phường 4, Quận 5",
        form: 'Tố giác sai phạm',
        status: 'Đã xử lý',
        time: '04/06/2023 - 04:06:23',

        fullname: 'Sinh tố dâu',
        email: 'thenghia@nhom7.com',
        phone: '6667778889',
        content: 'Nội dung tố cáo',
        images: [
            {url: "/assets/dan/thumbnail2.jpg"},
            {url: "/assets/dan/thumbnail4.jpg"},
        ],
    },
    {
        id: 4,
        type: 'dd',
        longitude: 106.686540,
        latitude: 10.764274,

        name: '666 Nguyễn Trãi',
        address: "Nguyễn Trãi - Nguyễn Cư Trinh",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        form: 'Đăng ký nội dung',
        status: 'Đang xử lý',
        time: '21/10/2023 - 21:10:23',

        fullname: 'Sinh tố dâu',
        email: 'thenghia@nhom7.com',
        phone: '6667778889',
        content: 'Nội dung tố cáo',
        images: [
            {url: "/assets/dan/thumbnail3.jpg"},
            {url: "/assets/dan/thumbnail6.jpg"},
        ],
    }
    ,
    {
        id: 5,
        type: 'dd',
        longitude: 106.688186,
        latitude: 10.764136,

        name: '666 Nguyễn Trãi',
        address: "Nguyễn Trãi - Nguyễn Cư Trinh",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        form: 'Đóng góp ý kiến',
        status: 'Từ chối',
        time: '21/10/2023 - 21:10:23',

        fullname: 'Sinh tố dâu',
        email: 'thenghia@nhom7.com',
        phone: '6667778889',
        content: 'Nội dung tố cáo',
        images: [
            {url: "/assets/dan/thumbnail1.jpeg"},
        ],
    }
    ,
    {
        id: 6,
        type: 'dd',
        longitude: 106.690291,
        latitude: 10.764111,

        name: '666 Nguyễn Trãi',
        address: "Nguyễn Trãi - Nguyễn Cư Trinh",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        form: 'Giải đáp thắc mắc',
        status: 'Từ chối',
        time: '21/10/2023 - 21:10:23',

        fullname: 'Sinh tố dâu',
        email: 'thenghia@nhom7.com',
        phone: '6667778889',
        content: 'Nội dung tố cáo',
        images: [
            {url: "/assets/dan/thumbnail5.jpg"},
        ],
    }
]

async function getAllReportList() {
    return fakeReportLocationInfo;
}

async function getReportInfoById(id) {
    return fakeReportLocationInfo.find(info => info.id === id);
}

export {
    getAllReportList,
    getReportInfoById
}