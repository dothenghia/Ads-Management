// getBaocao.js"
//nhớ add type module vào <script type="module" src="getBaocao.js" ></script>
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// Initialize Firebase 
const firebaseConfig = {
  apiKey: "AIzaSyCCwBk70gZo4XITye1w7ffkjbkFbeRBHw8",
  authDomain: "firstproject-90f9e.firebaseapp.com",
  projectId: "firstproject-90f9e",
  storageBucket: "firstproject-90f9e.appspot.com",
  messagingSenderId: "502907593610",
  appId: "1:502907593610:web:6971222eb80fc8f4225e73",
  measurementId: "G-YNQP3S54HB"
};
const firebaseApp = initializeApp(firebaseConfig);

// Create Firestore and Storage references
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// Function to get all documents from the "testCollection" collection
async function getAllDocuments() {
  // Reference to the "testCollection" collection
  //Thay tên collection ở đây
  const testCollection = collection(db, "testCollection");

  try {
    // Get all documents in the collection
    const querySnapshot = await getDocs(testCollection);

    // Process each document
    querySnapshot.forEach(async (doc) => {
      // Log the entire document data
      console.log("Document ID:", doc.id);
      console.log("Document Data:", doc.data());

      //Phần bên dưới này để xuất ra image, tuy nhiên bên trên đã có rồi nên không cần
      // Access the "image" array field and extract image URLs
      const imageUrls = doc.data().image || [];

      // Log or process the document ID
      // console.log("Image URLs:");

      // Iterate over each image URL and get the download URL
        // for (const imageUrl of imageUrls) {
        //   try {
        //     // Convert image URL to a Storage reference
        //     const storageRef = ref(storage, imageUrl);
        //     // Get the download URL
        //     const downloadURL = await getDownloadURL(storageRef);
        //     console.log(downloadURL);
        //   } catch (error) {
        //     console.error("Error getting download URL for image:", error);
        //   }
        // }
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

// Call the function to get all documents
getAllDocuments();
