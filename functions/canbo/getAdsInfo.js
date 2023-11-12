export default async function getReportList() {
    let data = await fetch("/assets/phuong/data/ad1.json");
    let dataJson = await data.json();
    return dataJson;
}
