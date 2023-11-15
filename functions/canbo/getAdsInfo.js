export default async function getAdsInfo() {
    let data1 = await fetch("/assets/chung/data/ad2.json");
    let data2 = await fetch("/assets/chung/data/ad3.json");
    let data1Json = await data1.json();
    let data2Json = await data2.json();
    return [data1Json, data2Json];
}