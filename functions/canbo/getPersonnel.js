export default async function getReportStatInfo() {
    let data1 = await fetch("/assets/so/data/thongkenhansu.json");
    let data1Json = await data1.json();
    return data1Json;
}
