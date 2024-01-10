

async function sendReport(uploadData) {

    const response = await fetch(`https://adsmap-group07.onrender.com/dan/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
    });

    const data = await response.json();
    console.log(data);

    // return data;
    
}

export default sendReport;