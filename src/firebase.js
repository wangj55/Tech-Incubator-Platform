// Import the functions you need from the SDKs you need https://firebase.google.com/docs/web/setup#available-libraries
import {
    initializeApp
} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    doc,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc
} from "firebase/firestore";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes
} from "firebase/storage";

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
const storage = getStorage(app);

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
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            firstName: firstName,
            lastName: lastName,
            authProvider: "local",
            email: email,
            profileImagePath: null
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

const logout = async () => {
    await signOut(auth);
};

const fetchUserProfileImage = async () => {
    const userData = await fetchUserData(auth.currentUser.uid);
    console.log(userData);
    if (userData.profileImagePath) {
        return getDownloadURL(ref(storage, userData.profileImagePath));
    } else {
        return null;
    }
};

const setUserProfileImage = async (image) => {
    const userData = await fetchUserData(auth.currentUser.uid);

    try {
        // if a file exist, delete it first
        if (userData.profileImagePath) {
            // delete the current file and then upload new file
            const imageFolderRef = ref(storage, userData.profileImagePath);
            await deleteObject(imageFolderRef);
        }

        const imagePath = `users/${auth.currentUser.uid}/userProfileImages/${image.name}`;
        const imageRef = ref(storage, imagePath);
        uploadBytes(imageRef, image).then((snapshot) => {
            console.log("Profile image uploaded.");
            updateUserData({...userData, profileImagePath: imagePath}).then(() => {
                console.log("Profile path updated to user db");
            });
        });
    } catch (err) {
        console.error(err);
        alert("An error occurred while setting user profile image");
    }
};

const fetchUserData = async () => {
    try {
        const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (docSnap) {
            return docSnap.data();
        } else {
            console.log("Did not find data while fetching user data.");
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred while fetching user data.");
    }
};

const updateUserData = async (data) => {
    try {
        await updateDoc(doc(db, "users", data.uid), data);
    } catch (err) {
        console.error(err);
        alert("An error occurred while setting user data.");
    }
};

export {
    auth,
    db,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    fetchUserProfileImage,
    setUserProfileImage,
    fetchUserData,
    updateUserData
};