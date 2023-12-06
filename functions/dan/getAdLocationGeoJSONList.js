// !!! Hàm lấy danh sách các địa điểm quảng cáo và chuyền về dạng GeoJSON ##########

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// ========== Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCwBk70gZo4XITye1w7ffkjbkFbeRBHw8",
    authDomain: "firstproject-90f9e.firebaseapp.com",
    projectId: "firstproject-90f9e",
    storageBucket: "firstproject-90f9e.appspot.com",
    messagingSenderId: "502907593610",
    appId: "1:502907593610:web:6971222eb80fc8f4225e73",
    measurementId: "G-YNQP3S54HB"
};

// ========== Initialize Firebase 
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Hàm chuyển đổi dữ liệu Ad thành GeoJSON
function convertToGeoJSON(adLocation) {
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
        let adLocationGeoJSONList = {
            type: 'FeatureCollection',
            features: results.map(ad => convertToGeoJSON(ad))
        };
        
        console.log(adLocationGeoJSONList);
        return adLocationGeoJSONList;
    }
    catch (error) {
        console.error("Error getting documents: ", error);
    }
}


export default getAdLocationGeoJSONList;