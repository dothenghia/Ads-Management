
const fakeDetailList = [
    {
        id: 1,
        address: 'Nguyễn Văn Cừ - An Dương Vương (Sở Văn hóa - Thể thao), Phường 4, Quận 5',
        typeReport: 'Cổ động chính trị',
        typeAd: 'Trụ/Cụm pano',
        locationType: 'Đất công/Công viên/Hành lang',
        contractStart: '10-01-2023',
        contractEnd: '21-10-2023',
        number: '2',
        url: ['./images/banner1.jpg', './images/banner2.jpg', './images/banner3.jpg'],
    },
    {
        id: 2,
        address: 'Nguyễn Chí Thanh - Lý Thường Kiệt (Sở Văn hóa - Thể thao), Phường 1, Quận 10',
        typeReport: 'Thương mại',
        typeAd: 'Trụ/Cụm pano',
        locationType: 'Đất công/Công viên',
        contractStart: '10-02-2023',
        contractEnd: '21-10-2024',
        number: '3',
        url: ['./images/banner1.jpg', './images/banner2.jpg', './images/banner3.jpg'],
    },
]

function parseDate(data){
    var arr = data.split('-');
    return arr;
}

export default async function getDetailList(ID) {
    var res = fakeDetailList.map(function(place) {
        var cS = parseDate(place.contractStart);
        var cE = parseDate(place.contractEnd);

        if (place.id == ID) 
            return {
                address: place.address,
                typeReport: place.typeReport,
                typeAd: place.typeAd,
                locationType: place.locationType,
                contractStart: `Ngày ${cS[0]} Tháng ${cS[1]} Năm ${cS[2]}`,
                contractEnd: `Ngày ${cE[0]} Tháng ${cE[1]} Năm ${cE[2]}`,
                number: place.number,
                url: place.url,
            };
        
    });

    return res;
}