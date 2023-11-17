export default async function getRepInfo() {
    let data = await fetch("/assets/chung/data/ad5.json");
    let dataJson = await data.json();
    return dataJson;
}