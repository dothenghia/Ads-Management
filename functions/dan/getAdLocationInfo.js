
const fakeAdLocationInfo = [
    {
        locationId: 2,
        quyhoach: true,
        longitude: 106.681622,
        latitude: 10.765123,

        isReported: true,
        reportStatus: '',
        reportRecord: 1,

        thumbnails: [
            { url: "/assets/dan/thumbnail3.jpg" },
            { url: "/assets/dan/thumbnail2.jpg" },
            { url: "/assets/dan/thumbnail1.jpeg" },
        ],

        address: "Nguyễn Văn Cừ - Trần Phú",
        region: "Phường 4, Quận 5",
        type: 'Trụ bảng hiflex', // Loại bảng quảng cáo
        form: 'Cổ động chính trị', // Hình thức quảng cáo
        quantity: '1 trụ/bảng', // Số lượng
        locationType: 'Công viên', // Loại vị trí

        adList: [
            {
                adId: 3,
                name: 'Bảng quảng cáo 3',
                size: '6m x 6m',
                reportStatus: 'Đang xử lý',
                contractStartDate: 'Ngày 01 tháng 01 năm 2023',
                contractEndDate: 'Ngày 01 tháng 01 năm 2024',
                thumbnails: [
                    { url: "/assets/dan/thumbnail6.jpg" },
                    { url: "/assets/dan/thumbnail4.jpg" },
                ]
            }
        ],
    },
    {
        locationId: 1,
        quyhoach: true,
        longitude: 106.679085,
        latitude: 10.762585,

        isReported: false,
        reportStatus: '',
        reportRecord: 0,

        thumbnails: [
            { url: "/assets/dan/thumbnail1.jpeg" },
            { url: "/assets/dan/thumbnail2.jpg" },
            { url: "/assets/dan/thumbnail3.jpg" },
        ],

        address: "Trần Phú - Trần Bình Trọng",
        region: "Phường 4, Quận 5",
        type: 'Trụ/Cụm pano', // Loại bảng quảng cáo
        form: 'Cổ động chính trị', // Hình thức quảng cáo
        quantity: '2 trụ/bảng', // Số lượng
        locationType: 'Đất công', // Loại vị trí

        adList: [
            {
                adId: 1,
                name: 'Bảng quảng cáo 1',
                size: '2.5m x 10m',
                reportStatus: '',
                contractStartDate: 'Ngày 10 tháng 01 năm 2023',
                contractEndDate: 'Ngày 18 tháng 10 năm 2023',
                thumbnails: [
                    { url: "/assets/dan/thumbnail4.jpg" },
                    { url: "/assets/dan/thumbnail5.jpg" },
                    { url: "/assets/dan/thumbnail6.jpg" },
                ]
            },
            {
                adId: 2,
                name: 'Bảng quảng cáo 2',
                size: '5m x 5m',
                reportStatus: '',
                contractStartDate: 'Ngày 10 tháng 01 năm 2023',
                contractEndDate: 'Ngày 31 tháng 12 năm 2023',
                thumbnails: [
                    { url: "/assets/dan/thumbnail5.jpg" },
                    { url: "/assets/dan/thumbnail4.jpg" },
                    { url: "/assets/dan/thumbnail6.jpg" },
                ]
            }
        ],
    },
    {
        locationId: 4,
        quyhoach: false,
        longitude: 106.686656,
        latitude: 10.762573,

        isReported: false,
        reportStatus: '',
        reportRecord: 0,

        thumbnails: [],
        address: "Nguyễn Trãi - Nguyễn Cư Trinh",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        type: 'Trụ màn hình điện tử LED', // Loại bảng quảng cáo
        form: 'Quảng cáo thương mại', // Hình thức quảng cáo
        quantity: '1 trụ/bảng', // Số lượng
        locationType: 'Trung tâm thương mại', // Loại vị trí

        adList: [],
    },
    {
        locationId: 5,
        quyhoach: false,
        longitude: 106.689628,
        latitude: 10.761667,

        isReported: true,
        reportStatus: 'Đã xử lý',
        reportRecord: 1,

        thumbnails: [],
        address: "Trần Đình Xu - Trần Hưng Đạo",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        type: 'Trụ treo băng rôn dọc', // Loại bảng quảng cáo
        form: 'Xã hội hoá', // Hình thức quảng cáo
        quantity: '1 trụ/bảng', // Số lượng
        locationType: 'Nhà ở riêng lẻ', // Loại vị trí

        adList: [],
    },
    {
        locationId: 3,
        quyhoach: true,
        longitude: 106.683218,
        latitude: 10.761180,

        isReported: true,
        reportStatus: 'Đang xử lý',
        reportRecord: 1,

        thumbnails: [
            { url: "/assets/dan/thumbnail2.jpg" },
            { url: "/assets/dan/thumbnail1.jpeg" },
        ],

        address: "Nguyễn Văn Cừ - An Dương Vương",
        region: "Phường 4, Quận 5",
        type: 'Màn hình điện tử ốp tường', // Loại bảng quảng cáo
        form: 'Xã hội hoá', // Hình thức quảng cáo
        quantity: '1 màn hình', // Số lượng
        locationType: 'Nhà chờ xe buýt', // Loại vị trí

        adList: [
            {
                adId: 4,
                name: 'Bảng quảng cáo 4',
                size: '4m x 2m',
                reportStatus: '',
                contractStartDate: 'Ngày 31 tháng 01 năm 2023',
                contractEndDate: 'Ngày 30 tháng 04 năm 2024',
                thumbnails: [
                    { url: "/assets/dan/thumbnail3.jpg" },
                    { url: "/assets/dan/thumbnail5.jpg" },
                ]
            }
        ],
    },
]

async function getAllAdList() {
    return fakeAdLocationInfo;
}

async function getAdLocationInfoById(locationId) {
    return fakeAdLocationInfo.find(info => info.locationId === locationId);
}

async function getDetailAdInfoById(locationId, adId) {
    let locationData = fakeAdLocationInfo.find(info => info.locationId === locationId)
    let adData = fakeAdLocationInfo.find(info => info.locationId === locationId).adList.find(ad => ad.adId === adId);

    let extractData = {
        adId: adData.adId,
        locationId: locationData.locationId,
        address: locationData.address,
        region: locationData.region,
        name: adData.name,
        type: locationData.type,
        form: locationData.form,
        locationType: locationData.locationType,
        contractStartDate: adData.contractStartDate,
        contractEndDate: adData.contractEndDate,
        size: adData.size,
        thumbnails: adData.thumbnails,
    }

    return extractData;
}

export {
    getAllAdList,
    getAdLocationInfoById,
    getDetailAdInfoById
}
