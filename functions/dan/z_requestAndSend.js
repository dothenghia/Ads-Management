'MongoDB là 1 Database serverside only, do đó phải có nodejs để xử lí, nên nếu gửi json từ client side phải cần có nodejs để đưa lên database'
'Viết 1 cái routing với 1 cái controller như này'
'Tao đã có bỏ file mẫu upload (create) ở trong controller: "exampleControllerMongoDB'
app.post('/uploadData', (req, res) => {
    const jsonData = req.body;

    // Process the JSON data (e.g., validate, sanitize, and save to MongoDB)
    console.log('Received JSON data:', jsonData);

    // Respond to the client
    res.status(200).send('Data received successfully');
});

'Phần bên dưới dùng để gửi về serverside'
// client.js
const jsonData = {
    key1: 'value1',
    key2: 'value2',
    // ... other key-value pairs
};

fetch('http://localhost:3000/uploadData', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
})
    .then(response => response.text())
    .then(data => {
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

'Tương tự ta sẽ có việc request data từ client side = AJAX, sau đó từ mongoDB sẽ gửi về JSON, từ đó client xử lí'
'server side'
//cái này có trong exampleControllerMongoDB
app.get("/get-all", async (req, res) => {
    try {
        // Retrieve data from MongoDB
        const result = await client.db(dbName).collection("baocao").find({}).toArray();

        // Send the JSON data to the client
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

'request = AJAX của client side '
fetch('http://localhost:3000/get-all')
    .then(response => response.json())
    .then(data => {
        console.log('Data received from server:', data);
        // Do something with the received data
    })
    .catch(error => {
        console.error('Error:', error);
    });