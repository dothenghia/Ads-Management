
const fakeDetailList = [
    {
        id: 1,
        name: 'He He',
        address: 'Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5',
        adContent: 'Cổ động chính trị',
        typeAd: 'Trụ/Cụm pano',
        locationType: 'Đất công/Công viên/Hành lang',
        contractStart: '10-01-2023',
        contractEnd: '21-10-2023',
        number: '2',
        url: ['./images/banner1.jpg', './images/banner2.jpg', './images/banner3.jpg'],
    },
    {
        id: 2,
        name: 'He He',
        address: 'Nguyễn Chí Thanh - Lý Thường Kiệt (Sở Văn hóa - Thể thao), Phường 1, Quận 10',
        adContent: 'Thương mại',
        typeAd: 'Trụ/Cụm pano',
        locationType: 'Đất công/Công viên',
        contractStart: '10-02-2023',
        contractEnd: '21-10-2024',
        number: '3',
        url: ['./images/banner1.jpg', './images/banner2.jpg', './images/banner3.jpg'],
    },
]

export default async function getDetailList() {
    return fakeDetailList;
}