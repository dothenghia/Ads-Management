const fs = require("fs")

// Get local data for HCM city's wards and districts
var areas;
(async () => {
    const dataFile = await fs.promises.readFile("./html/data/hochiminh.json");
    areas = JSON.parse(dataFile);
})();

globalVars = {}
function createGlobal(name, value) {
    globalVars[name] = value;
}
function getGlobal(globalName) {
    return globalVars[globalName];
}
function removeGlobal(globalName) {
    if (globalVars.hasOwnProperty(globalName))
        delete globalVars[globalName];
}
function incrementGlobal(globalName) {
    if (globalName in globalVars)
        globalVars[globalName] += 1;
}

function onclickAction(htmlAction) {
    return `onclick="${htmlAction}"`;
}

function onclickRedirect(url) {
    return `onclick="window.location.href='${url}'"`;
}

function toJSON(data) {
    return JSON.stringify(data);
}

function fromJSON(json) {
    return JSON.parse(json);
}

function arrayLength(array) {
    return array.length;
}

function arrayIndex(array, index) {
    return array[index];
}

function mapToArray(map) {
    let result = [];
    for (let key in map) {
        result.push(map[key]);
    }
    return result;
}

function equalString(string1, string2) {
    console.log(string1 == string2);
    return string1 == string2;
}

function shortenString(string) {
    if (string.length > 15) string = string.substring(0, 15) + "...";

    return string;
}

function filterById(data, idField, idValue) {
    return data.filter((datum) => datum[idField] == idValue)[0];
}

function filterAllById(data, idField, idValue) {
    return data.filter((datum) => datum[idField] == idValue);
}

// 0: Only ward, 1: Ward and district
function getAddress(districtId, wardId, resultType = 0) {
    let districts = areas.districts;
    let district = districts.filter((district) => district.idQuan == districtId)[0];
    let ward = district.wards.filter((ward) => ward.idPhuong == wardId)[0];

    if (resultType == 0) {
        return ward.name;
    }
    else {
        return ward.name + ", " + district.name;
    }
}

function getAdLocationFromAd(adLocationData, adId) {
    for (loc in adLocationData) {
        let locData = adLocationData[loc];

        let filter = locData.adList.filter((ad) => adId == ad.adId)
        if (filter.length > 0) return locData;
    }

    return null;
}

function getAdLocationById(adLocationData, locationId) {
    let filter = adLocationData.filter((loc) => locationId == loc.locationId);
    if (filter.length > 0) return filter[0];

    return null;
}

function mongoDateToLocaleString(date) {
    let dateObject = new Date(date);
    //return "Ngày " + dateObject.getDate().toString().padStart(2, 0) + " Tháng " + (dateObject.getMonth() + 1).toString().padStart(2, 0) + " Năm " + dateObject.getFullYear();
    return dateObject.getDate().toString().padStart(2, 0) + "/" + (dateObject.getMonth() + 1).toString().padStart(2, 0) + "/" + dateObject.getFullYear();
}

module.exports = {
    createGlobal: createGlobal,
    getGlobal: getGlobal,
    incrementGlobal: incrementGlobal,
    removeGlobal: removeGlobal,

    onclickAction: onclickAction,
    onclickRedirect: onclickRedirect,
    toJSON: toJSON,
    fromJSON: fromJSON,
    arrayLength: arrayLength,
    arrayIndex: arrayIndex,
    mapToArray: mapToArray,
    equalString: equalString,
    shortenString: shortenString,

    filterById: filterById,
    filterAllById: filterAllById,
    getAddress: getAddress,
    getAdLocationFromAd: getAdLocationFromAd,
    getAdLocationById: getAdLocationById,

    mongoDateToLocaleString: mongoDateToLocaleString
};