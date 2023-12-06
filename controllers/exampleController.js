const admin = require("../config/firebaseAdmin");
//https://firebase.google.com/docs/firestore/manage-data/add-data
const db = admin.firestore();
//create

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
    //biết ID document
    const docRef = db.collection("accounts").doc(id);
    //ko biết ID document, biết 1 attributes trong document
    const docRef2 = db.collection("accounts").where("id", "==", id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("Document not found");
    }

    res.send(doc.data());
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//update
app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userRef = db.collection("accounts").doc(id);
    //tương tự bên trên
    const docRef2 = db.collection("accounts").where("id", "==", id);
    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      // Add other fields you want to update
    };

    await userRef.update(updateData);

    res.send("Document updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//delete
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //tương tự bên trên
    const userRef = db.collection("accounts").doc(id);
    const docRef2 = db.collection("accounts").where("id", "==", id);
    await userRef.delete();

    res.send("Document deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//CRUD 
