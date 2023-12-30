const controller = {}
const currentPage = 0;

const jwt = require("jsonwebtoken");
// MongoDB
const {client}  = require("../../../config/mongodbConfig");
const fs = require("fs");

const dbName = 'Ads-Management';

controller.show = async (req,res) => {
    // Get current account
    const token = req.cookies.jwtToken;
    const decoded = await jwt.verify(token, "suffering");
    let currentAccount = { accountType: decoded.accountType, areaId: decoded.areaId, areaName: decoded.areaName, name: decoded.name };

    // Get current page's data
    const adSnapshot = await client.db(dbName).collection("ads").find({}).toArray();
    const adLocationSnapshot = await client.db(dbName).collection("adLocations").find({}).toArray();

    // Get local data for HCM city's wards and districts
    const dataFile = await fs.promises.readFile("./html/data/hochiminh.json");
    let areas = JSON.parse(dataFile);

    let FeatureCollection = {
        "type": "FeatureCollection",
        "features": []
    };

    let Ad = [];
    adSnapshot.forEach((doc) => {
        Ad.push(doc);
    });
    let AdLocation = []; let AdArea = {};
    adLocationSnapshot.forEach((doc) => {
        let docDistrict = areas.districts.filter((district) => district.idQuan == doc.idQuan)[0];
            if (!(docDistrict.idQuan in AdArea))
                AdArea[docDistrict.idQuan] = {name: docDistrict.name, idQuan: docDistrict.idQuan, wards: {}};
            
            let docWard = docDistrict.wards.filter((ward) => ward.idPhuong == doc.idPhuong)[0];

            if (!(docWard.idPhuong in AdArea[docDistrict.idQuan].wards)) {
                AdArea[docDistrict.idQuan].wards[docWard.idPhuong] = {name: docWard.name, idPhuong: docWard.idPhuong, adLocations: []}
            }
            
            AdArea[docDistrict.idQuan].wards[docWard.idPhuong].adLocations.push({address: doc.address, locationId: doc.locationId});

        let coords = [doc.longitude, doc.latitude];
        let ads = [];
        for (ad in doc.adList) {
            let adId = doc.adList[ad].adId;

            let adDetail = Ad.filter((ad) => ad.adId == adId)[0];

            ads.push(adDetail);
        }
        let properties = {
            locationId: doc.locationId,
            locationType: doc.locationType,
            adForm: doc.adForm,
            planning: doc.planning,
            adType: doc.adType,
            adList: ads,
            district: AdArea[doc.idQuan].name,
            ward: AdArea[doc.idQuan].wards[doc.idPhuong].name,
            street: doc.address,
            thumbnails: doc.thumbnails
        };
        let feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": coords
            },
            "properties": properties
        }
        FeatureCollection.features.push(feature);

        AdLocation.push(doc);
    });

    // Get current page's data
    res.render("partials/screens/phuong/index", {
        "current": currentPage,
        "account": currentAccount,
        "ad": Ad,
        "adLocation": AdLocation,
        "featureCollection": FeatureCollection,
        body: function() {
            return "screens/phuong/bando";
        }
    });
}

module.exports = controller;