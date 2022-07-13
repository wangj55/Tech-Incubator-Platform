// Import the functions you need from the SDKs you need https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFw4Wom5frFggBUiPG_WQdoMSOGdrQnUQ",
    authDomain: "tech-incubator-platform.firebaseapp.com",
    projectId: "tech-incubator-platform",
    storageBucket: "tech-incubator-platform.appspot.com",
    messagingSenderId: "322289459838",
    appId: "1:322289459838:web:70a84e637bc2b024c96e2f",
    measurementId: "G-BN0435Y2LP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (firstName, lastName, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            firstName: firstName,
            lastName: lastName,
            authProvider: "local",
            email
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout
};