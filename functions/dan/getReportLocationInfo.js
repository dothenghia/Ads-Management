
const fakeReportLocationInfo = [
    {
        reportId: 1,
        type: 'qc',

        locationId: 2,
        adId: 3,
        longitude: 106.681622,
        latitude: 10.765123,

        name: 'Bảng quảng cáo 3',
        address: "Nguyễn Văn Cừ - Trần Phú",
        region: "Phường 4, Quận 5",
        form: 'Tố giác sai phạm',
        status: 'Đang xử lý',
        time: '10/01/2023 - 05:06:11',

        fullname: 'Thế Nghĩa',
        email: 'thenghia@nhom7.com',
        phone: '0123456789',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quam atque, ex nulla ab perferendis incidunt magni in eum, corporis enim sapiente architecto odio. Officiis ut perferendis molestias labore quos illum atque reprehenderit sit doloremque reiciendis?',
        images: [
            { url: "/assets/dan/thumbnail1.jpeg" },
            { url: "/assets/dan/thumbnail3.jpg" },
        ],
    },
    {
        reportId: 2,
        type: 'ddqc', // ĐỊA ĐIỂM QUẢNG CÁO

        locationId: 3,
        longitude: 106.683218,
        latitude: 10.761180,

        name: '227 Nguyễn Văn Cừ',
        address: "Nguyễn Văn Cừ - An Dương Vương",
        region: "Phường 4, Quận 5",
        form: 'Giải đáp thắc mắc',
        status: 'Đang xử lý',
        time: '18/10/2023 - 18:10:23',

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
        type: 'ddqc',

        locationId: 5,
        longitude: 106.689628,
        latitude: 10.761667,

        name: '123 Trần Đình Xu',
        address: "Trần Đình Xu - Trần Hưng Đạo",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        form: 'Tố giác sai phạm',
        status: 'Đã xử lý',
        time: '04/06/2023 - 04:06:23',

        fullname: 'Thế Nghĩa',
        email: 'hehe@nhom7.com',
        phone: '123654321',
        content: 'Tôi muốn tố giác về bảng quảng cáo này về việc nó không đúng với quy hoạch của thành phố. Tôi muốn tố giác về bảng quảng cáo này về việc nó không đúng với quy hoạch của thành phố. Tôi muốn tố giác về bảng quảng cáo này về việc nó không đúng với quy hoạch của thành phố.',
        images: [
            { url: "/assets/dan/thumbnail2.jpg" },
            { url: "/assets/dan/thumbnail4.jpg" },
        ],
    },
    {
        reportId: 4,
        type: 'ddbk', // ĐỊA ĐIỂM BẤT KỲ

        longitude: 106.683838,
        latitude: 10.764617,

        name: '145 Phạm Viết Chánh',
        address: "Hẻm 145 Phạm Viết Chánh",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        form: 'Tố giác sai phạm',
        status: 'Đang xử lý',
        time: '21/10/2023 - 21:10:23',

        fullname: 'Thế Giới',
        email: 'thenghia@nhom7.com',
        phone: '6667778889',
        content: 'Xin chào Thế giới nhé',
        images: [
            { url: "/assets/dan/thumbnail3.jpg" },
            { url: "/assets/dan/thumbnail6.jpg" },
        ],
    }
    ,
    {
        reportId: 5,
        type: 'ddbk',

        longitude: 106.685008,
        latitude: 10.764479,

        name: '666 Nguyễn Trãi',
        address: "Hẻm 666 Nguyễn Trãi",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        form: 'Đăng ký nội dung',
        status: 'Từ chối',
        time: '21/10/2023 - 21:10:23',

        fullname: 'Thế Nghĩa',
        email: 'thenghia@nhom7.com',
        phone: '6667778889',
        content: 'Tôi muốn đăng ký nội dung ở địa điểm này',
        images: [
            { url: "/assets/dan/thumbnail1.jpeg" },
        ],
    },
    {
        reportId: 6,
        type: 'ddbk',

        longitude: 106.686322,
        latitude: 10.764507,

        name: '432 Nguyễn Trãi',
        address: "Hẻm 432 Nguyễn Trãi",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        form: 'Đóng góp ý kiến',
        status: 'Đã xử lý',
        time: '21/10/2023 - 21:10:23',

        fullname: 'Bánh đồng xu phô mai',
        email: 'thenghia@nhom7.com',
        phone: '6667778889',
        content: 'Tôi muốn đóng góp ý kiến về địa điểm này',
        images: [
            { url: "/assets/dan/thumbnail5.jpg" },
        ],
    },
    {
        reportId: 7,
        type: 'ddbk',

        longitude: 106.687931,
        latitude: 10.764055,

        name: '263/18 Nguyễn Cư Trinh',
        address: "Hẻm 263 Nguyễn Cư Trinh",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        form: 'Giải đáp thắc mắc',
        status: 'Đã xử lý',
        time: '21/10/2023 - 21:10:23',

        fullname: 'Trà chang giã tay',
        email: 'thenghia@nhom7.com',
        phone: '6667778889',
        content: 'Tôi muốn được giải đáp thắc mắc về địa điểm này',
        images: [
            { url: "/assets/dan/thumbnail2.jpg" },
        ],
    }
]


// Hàm chuyển đổi dữ liệu Report thành GeoJSON
function convertReportToGeoJSON(report) {
    return {
        type: 'Report',
        geometry: {
            type: 'Point',
            coordinates: [report.longitude, report.latitude]
        },
        properties: {
            reportId: report.reportId,
            type: report.type,
            locationId: report.locationId,
            adId: report.adId,
            name: report.name,
            address: report.address,
            region: report.region,
            form: report.form,
            status: report.status,
            time: report.time,
            fullname: report.fullname,
            email: report.email,
            phone: report.phone,
            content: report.content,
            images: report.images
        }
    };
}


async function getAllReportList() {
    // Chuyển đổi toàn bộ dữ liệu Report vào định dạng JSON mong muốn
    const reportCollectionGeoJSON = {
        type: 'ReportCollection',
        features: fakeReportLocationInfo.map(report => convertReportToGeoJSON(report))
    };

    return reportCollectionGeoJSON;
}

async function getReportInfoById(reportId) {
    return fakeReportLocationInfo.find(info => info.reportId === reportId);
}

async function getDetailReportInfoOfAdLocation(locationId) {
    return fakeReportLocationInfo.find(info => info.locationId === locationId && info.type === 'ddqc');
}

async function getDetailReportInfoOfAd(locationId, adId) {
    return fakeReportLocationInfo.find(info => info.locationId === locationId && info.adId === adId);
}

export {
    getAllReportList,
    getReportInfoById,
    getDetailReportInfoOfAdLocation,
    getDetailReportInfoOfAd,
}