const admin = require("../config/firebaseAdmin");
//https://firebase.google.com/docs/firestore/manage-data/add-data
const db = admin.firestore();
//create with doc id
app.post("/create", async (req, res) => {
  try {
    const id = req.body.email; // Change res.body to req.body

    const userJson = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    // Wait for the Firestore operation to complete
    await db.collection("accounts").doc(id).set(userJson); //có document id (khác id trong mỗi document) cụ thể
    //hoặc
    //await db.collection("accounts").add(user) // tạo document id tự động
    res.send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//create not care dociD
app.post("/create", async (req, res) => {
  try {
    const userJson = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    // Wait for the Firestore operation to complete
    await db.collection("accounts").add(userJson); // Firestore generates a random document ID
    res.send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//read all 
app.get("/get-all", async (req, res) => {
  try {
    const collectionRef = db.collection("accounts");
    const snapshot = await collectionRef.get();

    const result = [];
    snapshot.forEach((doc) => {
      result.push(doc.data());
    });

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//read
app.get("/get/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    // Use where query to get documents matching the condition and limit to 1
    const querySnapshot = await db.collection("accounts").where("id", "==", id).limit(1).get();

    // Check if there's at least one document
    if (querySnapshot.empty) {
      return res.status(404).send("Document not found");
    }

    // Extract the first document from the query result
    const doc = querySnapshot.docs[0];

    res.send(doc.data());
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


//update
// app.put("/update/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const userRef = db.collection("accounts").doc(id);
//     //tương tự bên trên
//     const updateData = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       // Add other fields you want to update
//     };

//     await userRef.update(updateData);

//     res.send("Document updated successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });
//update with document with know attributes
app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Use where query to get documents matching the condition
    const querySnapshot = await db.collection("accounts").where("id", "==", id).get();

    // Initialize an array to store promises for each update operation
    const updatePromises = [];

    // Iterate over the documents in the query result
    querySnapshot.forEach((doc) => {
      const updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        // Add other fields you want to update
      };

      // Update each document and add the resulting promise to the array
      updatePromises.push(doc.ref.update(updateData));
    });

    // Wait for all update operations to complete
    await Promise.all(updatePromises);

    res.send("Documents updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//delete
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    // Use where query to get documents matching the condition
    const querySnapshot = await db.collection("accounts").where("id", "==", id).get();

    // Initialize an array to store promises for each delete operation
    const deletePromises = [];

    // Iterate over the documents in the query result
    querySnapshot.forEach((doc) => {
      // Delete each document and add the resulting promise to the array
      deletePromises.push(doc.ref.delete());
    });

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    res.send("Documents deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


//CRUD 
