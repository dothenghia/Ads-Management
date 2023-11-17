export default async function getAreaInfo() {
    let data = await fetch("/assets/chung/data/area.json");
    let dataJson = await data.json();
    return dataJson;
}