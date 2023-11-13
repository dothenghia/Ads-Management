
const fakeReportList = [
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
    },
    {
        id: 2,
        type: 'qc',
        longitude: 106.681622,
        latitude: 10.765123,

        name: 'Bảng quảng cáo 2',
        address: "Nguyễn Văn Cừ - Trần Phú",
        region: "Phường 4, Quận 5",
        form: 'Đăng ký nội dung',
        status: 'Đã xử lý',
        time: '04/06/2023 - 04:06:23',
    },
    {
        id: 3,
        type: 'dd',
        longitude: 106.689628,
        latitude: 10.761667,

        name: '123 Trần Đình Xu',
        address: "Trần Đình Xu - Trần Hưng Đạo",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        form: 'Giải đáp thắc mắc',
        status: 'Đã xử lý',
        time: '18/10/2023 - 18:10:23',
    },
    {
        id: 4,
        type: 'dd',
        longitude: 106.686656,
        latitude: 10.762573,

        name: '666 Nguyễn Trãi',
        address: "Nguyễn Trãi - Nguyễn Cư Trinh",
        region: "Phường Nguyễn Cư Trinh, Quận 1",
        form: 'Đóng góp ý kiến',
        status: 'Từ chối',
        time: '21/10/2023 - 21:10:23',
    }
]

export default async function getReportList() {
    return fakeReportList;
}