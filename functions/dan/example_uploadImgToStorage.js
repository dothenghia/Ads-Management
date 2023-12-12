import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getStorage, ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

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
const storage = getStorage(firebaseApp);

// Function to upload an image to Firebase Storage and get its direct URL
async function uploadImageAndGetURL(file) {
  try {
    // Create a reference to the storage bucket and specify a unique path for the file
                                    //folder toi file name
    const storageRef = ref(storage, `images/${file.name}`);

     // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    console.log("Image uploaded successfully. Download URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    throw error;
  }
}

// Example usage
const fileInput = document.getElementById('file-input'); // Replace with the actual ID of your file input element

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];

  if (file) {
    try {
      const imageURL = await uploadImageAndGetURL(file);
      // Use the imageURL as needed (e.g., save it in the database, display it to the user, etc.)
    } catch (error) {
      // Handle the error
    }
  }
});
