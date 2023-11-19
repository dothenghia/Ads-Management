export default async function getRepInfo() {
    let data = await fetch("/assets/so/data/thongtinvipham.json");
    let dataJson = await data.json();
    return dataJson;
}