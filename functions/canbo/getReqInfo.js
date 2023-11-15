export default async function getReqInfo() {
    let data = await fetch("/assets/chung/data/ad4.json");
    let dataJson = await data.json();
    return dataJson;
}