export async function getChangeReqInfo() {
    let data = await fetch("/assets/chung/data/ad4.json");
    let dataJson = await data.json();
    return dataJson;
}

export async function getPermissionReqInfo() {
    let data = await fetch("/assets/chung/data/ad6.json");
    let dataJson = await data.json();
    return dataJson;
}