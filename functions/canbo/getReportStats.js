export default async function getReportStatInfo() {
    let data1 = await fetch("/assets/so/data/thongkebaocao.json");
    let data1Json = await data1.json();
    return [data1Json];
}