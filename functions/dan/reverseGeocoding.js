

async function reverseGeocoding(longitude, latitude) {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYmFyb2xvaSIsImEiOiJjbG8ybW1ucHcwOTZjMnF0ZGFqdXpwemUwIn0._gUBQBWHcx7zDxxK6UEUbQ`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const extractData = {
            name: data.features[0].text, // Tên của địa điểm đó
            phuong: data.features[1].text,
            quan: data.features[3].text,
            
            // longitude: longitude,
            // latitude: latitude,
            // text2: data.features[2].text,
            // thanhpho: data.features[4].text,
        };

        return extractData;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default reverseGeocoding;