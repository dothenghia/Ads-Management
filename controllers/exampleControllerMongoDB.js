const {client}  = require("../config/mongodbConfig");
const ObjectId = require('mongodb').ObjectId; // Import ObjectId from the MongoDB library
const dbName = 'Ads-Management';

'Bên mongoDB có 1 primary key là "_id", nó giống cái "id" mà mình xài ở firestore, do đó lúc tạo hay update thì kiểm tra = "_id"'
'Date trong mongoDB có dạng: new Date("YYYY-mm-dd"), muốn đọc kĩ hơn thì vào: https://www.mongodb.com/docs/manual/reference/method/Date/'
'Mọi cái ngày trong mongoDB tao đã chuyển qua dạng Date'
'Trong cái collection của đứa nào mà ko xài field "id" để làm primary key thì vào collection trên mongoDB sửa, t convert từ firestore qua mongoDB thì chỉ chuyền từ "id" qua "_id" thôi'
//Create with doc id
app.post("/create", async (req, res) => {
  try {
    const id = req.body.email;

    const userJson = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    // Wait for the MongoDB operation to complete
    await client.db(dbName).collection("accounts").updateOne({ _id: id }, { $set: userJson }, { upsert: true }); //upsert = update and insert
    res.send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
'Cái bên dưới này gần như sẽ không xài vì chungs ta cần "_id"'
// app.post("/create", async (req, res) => {
//     try {
//       // Extract user information from the request body
//       const userJson = {
//         email: req.body.email,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//       };
  
//       // Wait for the MongoDB operation to complete (inserting a new user)
//       await client.db(dbName).collection("accounts").insertOne(userJson);
  
//       // Respond with a success message
//       res.status(201).json({ message: "User created successfully", user: userJson });
//     } catch (error) {
//       console.error(error);
//       // If an error occurs, respond with a 500 Internal Server Error
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

// Read all documents
app.get("/get-all", async (req, res) => {
    try {
      const result = await client.db(dbName).collection("accounts").find({}).toArray();
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
});

// Read
app.get("/get/:id", async (req, res) => {
    try {
      const id = req.params.id;
  
      // Use findOne to get a single document by ID
      const result = await client.db(dbName).collection("accounts").findOne({ _id: id });
  
      // Check if the document exists
      if (!result) {
        return res.status(404).send("Document not found");
      }
  
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

// Update
app.put("/update/:id", async (req, res) => {
    try {
      const id = req.params.id;
  
      // Use updateOne to update a document by ID
      await client.db(dbName).collection("accounts").updateOne({ _id: id }, { $set: req.body });
  
      res.send("Document updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  

// Delete
app.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
  
      // Use deleteOne to delete a document by ID
      const result = await client.db(dbName).collection("accounts").deleteOne({ _id: id });
  
      // Check if the document was found and deleted
      if (result.deletedCount === 0) {
        return res.status(404).send("Document not found");
      }
  
      res.send("Document deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

// CRUD

