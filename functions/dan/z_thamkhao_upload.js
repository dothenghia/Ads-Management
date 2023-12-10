// ! ============ FILE NÀY ĐỪNG ĐỤNG VÀO ============
// ! CHỈ DÙNG ĐỂ UPLOAD DỮ LIỆU MẪU LÊN FIREBASE
// ! THAY VÌ PHẢI UPLOAD THỦ CÔNG TỪNG Field

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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
const db = getFirestore(firebaseApp);

function uploadExampleData() {
    const targetCollection = collection(db, "test");

    let uploadData = [
        
    ]

    try {
        for (const data of uploadData) {
            addDoc(targetCollection, data)
                .then((docRef) => {
                    console.log("ID document mới :", docRef.id);
                })
        }
    }
    catch (error) {
        console.error("Lỗi khi thêm document:", error);
    }
}

export default uploadExampleData;