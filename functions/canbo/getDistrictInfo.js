export default async function getAdsInfo() {
    let data1 = await fetch("/assets/so/data/thongtinchung.json");
    let data1Json = await data1.json();
    return [data1Json];
}