
const mongoose = require('mongoose');
//Import model o day
// Define the mongoose model
const accountsSchema = new mongoose.Schema({
  _id: String, // Assuming _id is a string in your case
  email: String,
  firstName: String,
  lastName: String,
});

const Account = mongoose.model('Account', accountsSchema);

// Create
app.post('/create', async (req, res) => {
  try {
    const id = req.body.email;
    const userJson = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    await Account.updateOne({ _id: id }, { $set: userJson }, { upsert: true }); // update and insert
    res.send('User created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Read all documents
app.get('/get-all', async (req, res) => {
  try {
    const result = await Account.find({});
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Read
app.get('/get/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Account.findOne({ _id: id });

    if (!result) {
      return res.status(404).send('Document not found');
    }

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Update
app.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Account.updateOne({ _id: id }, { $set: req.body });
    res.send('Document updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete
app.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Account.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).send('Document not found');
    }

    res.send('Document deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
