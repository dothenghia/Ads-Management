
const fakeAdLocationInfo = [
    {
        id: 1,
        quyhoach: true,
        longitude: 106.683218,
        latitude: 10.761180,

        thumbnails: [
            {url: "/assets/dan/thumbnail1.jpeg"},
            {url: "/assets/dan/thumbnail2.jpg"},
            {url: "/assets/dan/thumbnail3.jpg"},
        ],
        address: "Nguyễn Văn Cừ - An Dương Vương",
        region: "Phường 4, Quận 5",
        type: 'Trụ/Cụm pano', // Loại bảng quảng cáo
        form: 'Cổ động chính trị', // Hình thức quảng cáo
        quantity: '2 trụ/bảng', // Số lượng
        locationType: 'Đất công', // Loại vị trí

        adList: [
            {
                id: 1,
                name: 'Bảng quảng cáo 1',
                size: '2.5m x 10m',
                contractStartDate: 'Ngày 10 tháng 01 năm 2023',
                contractEndDate: 'Ngày 18 tháng 10 năm 2023',
                thumbnails: [
                    {url: "/assets/dan/thumbnail4.jpg"},
                    {url: "/assets/dan/thumbnail5.jpg"},
                    {url: "/assets/dan/thumbnail6.jpg"},
                ]
            },
            {
                id: 2,
                name: 'Bảng quảng cáo 2',
                size: '5m x 5m',
                contractStartDate: 'Ngày 10 tháng 01 năm 2023',
                contractEndDate: 'Ngày 31 tháng 12 năm 2023',
                thumbnails: [
                    {url: "/assets/dan/thumbnail5.jpg"},
                    {url: "/assets/dan/thumbnail4.jpg"},
                    {url: "/assets/dan/thumbnail6.jpg"},
                ]
            }
        ],
    },
    {
        id: 2,
        quyhoach: false,
        longitude: 106.681622,
        latitude: 10.765123,

        thumbnails: [],
        address: "Nguyễn Văn Cừ - Trần Phú",
        region: "Phường 4, Quận 5",
        type: 'Trụ bảng hiflex', // Loại bảng quảng cáo
        form: 'Cổ động chính trị', // Hình thức quảng cáo
        quantity: '0', // Số lượng
        locationType: 'Đất công', // Loại vị trí

        adList: [],
    },
    {
        id: 3,
        quyhoach: false,
        longitude: 106.689628,
        latitude: 10.761667,

        thumbnails: [],
        address: "Trần Đình Xu - Trần Hưng Đạo",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        type: 'Trụ bảng hiflex', // Loại bảng quảng cáo
        form: 'Cổ động chính trị', // Hình thức quảng cáo
        quantity: '0', // Số lượng
        locationType: 'Đất công', // Loại vị trí

        adList: [],
    },
    {
        id: 4,
        quyhoach: true,
        longitude: 106.686656,
        latitude: 10.762573,

        thumbnails: [
            {url: "/assets/dan/thumbnail3.jpg"},
            {url: "/assets/dan/thumbnail1.jpeg"},
            {url: "/assets/dan/thumbnail2.jpg"},
        ],
        address: "Nguyễn Trãi - Nguyễn Cư Trinh",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        type: 'Trụ màn hình điện tử LED', // Loại bảng quảng cáo
        form: 'Quảng cáo thương mại', // Hình thức quảng cáo
        quantity: '1 trụ/bảng', // Số lượng
        locationType: 'Trung tâm thương mại', // Loại vị trí

        adList: [
            {
                id: 1,
                name: 'Bảng quảng cáo 1',
                size: '6m x 6m',
                contractStartDate: 'Ngày 01 tháng 01 năm 2023',
                contractEndDate: 'Ngày 01 tháng 01 năm 2024',
                thumbnails: [
                    {url: "/assets/dan/thumbnail6.jpg"},
                    {url: "/assets/dan/thumbnail4.jpg"},
                    {url: "/assets/dan/thumbnail5.jpg"},
                ]
            }
        ],
    }
]

export default async function getAdLocationInfo(id) {
    return fakeAdLocationInfo.find(info => info.id === id);
}