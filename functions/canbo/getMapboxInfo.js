export default async function getMapboxInfo() {
    let data = await fetch("/assets/chung/data/ad1.json");
    let dataJson = await data.json();
    return dataJson;
}