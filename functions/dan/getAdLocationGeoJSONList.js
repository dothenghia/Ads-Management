// @ Hàm lấy danh sách các địa điểm quảng cáo và chuyền về dạng GeoJSON ##########

import { db } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import mappingRegion from "./mappingRegion.js";

// Hàm chuyển đổi dữ liệu Ad thành GeoJSON
function convertToGeoJSON(adLocation) {
    let {quan, phuong} = mappingRegion(adLocation.idQuan, adLocation.idPhuong);
    
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [adLocation.longitude, adLocation.latitude]
        },
        properties: {
            locationId: adLocation.locationId,
            planning: adLocation.planning,
            address: adLocation.address,
            idQuan: adLocation.idQuan,
            idPhuong: adLocation.idPhuong,
            adType: adLocation.adType,
            numberOfAds: adLocation.adList.length,
            locationType: adLocation.locationType,
            quan,
            phuong,

            numberOfReports: adLocation.numberOfReports,

            markerType: 'Ad' // Thêm cái này để filter marker trên map
        }
    };
}

async function getAdLocationGeoJSONList() {

    // Lấy collection "adLocations" và "ads"
    let adLocationsCollection = collection(db, "adLocations");
    let adsCollection = collection(db, "ads");

    try {
        // Lấy tất cả document của collection "adLocations"
        let adLocationDocs = await getDocs(adLocationsCollection);

        // Lượt qua từng document
        let adLocationPromises = adLocationDocs.docs.map(async (adLocationDoc) => {

            let adLocationData = adLocationDoc.data();
            let numberOfReports = adLocationData.reportId == "" ? 0 : 1;

            // Nếu adLocationData.adList có dữ liệu
            if (adLocationData.adList && adLocationData.adList.length > 0) {

                // Thì Check reportId của của adId tương ứng
                // Sử dụng Promise.all để đợi tất cả các promise được giải quyết
                let adPromises = adLocationData.adList.map(async (ad) => {

                    let adQuery = query(adsCollection, where("adId", "==", ad.adId));
                    let adDocs = await getDocs(adQuery);
                    
                    // Nếu reportId != "" thì tăng numberOfReports
                    numberOfReports += adDocs.docs.some(adDoc => adDoc.data().reportId !== "") ? 1 : 0;
                });

                await Promise.all(adPromises);
            }

            return { ...adLocationData, numberOfReports };
        });

        let results = await Promise.all(adLocationPromises);
        
        // Chuyển đổi toàn bộ dữ liệu về định dạng JSON
        let adLocationGeoJSONList = results.map(ad => convertToGeoJSON(ad))
        // console.log(adLocationGeoJSONList);
        
        return adLocationGeoJSONList;
    }
    catch (error) {
        console.error("Error getting documents: ", error);
    }
}


export default getAdLocationGeoJSONList;