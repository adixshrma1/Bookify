import { createContext, useContext, useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpUs6pmNLH_HhtErU_BmCwKsYRcN6Z4gM",
  authDomain: "bookify-df2bd.firebaseapp.com",
  projectId: "bookify-df2bd",
  storageBucket: "bookify-df2bd.firebasestorage.app",
  messagingSenderId: "911799064943",
  appId: "1:911799064943:web:1f14890663ac697405f09a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const storage = getStorage(app);

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, [auth]);
  const isLoggedIn = user ? true : false;
  // console.log(user);  // testing...
  const signupWithEmailPass = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const loginWithEmailPass = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleAuthProvider);
  };
  const logOut = () => {
    return signOut(auth);
  };

  const createNewListing = async (name, price, isbn, coverImg) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverImg.name}`
    );
    const uploadResult = await uploadBytes(imageRef, coverImg);
    return await addDoc(collection(firestore, "books"), {
      name,
      price,
      isbn,
      path: uploadResult.ref.fullPath,
      username: user.displayName,
      userImg: user.photoURL,
      email: user.email,
      userId: user.uid,
    });
  };

  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const listMyBooks = async ()=>{
    const q = query(collection(firestore, "books"), where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    return snapshot;
  }
  const getImgURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  
  const viewBook = async (id)=>{
    const bookRef = doc(firestore, "books", id);
    const snapshot = await getDoc(bookRef);
    return snapshot;
  }

  const placeOrder = (bookId, quantity) => {
    return addDoc(collection(firestore, "books/" + bookId + "/orders"), {
      name: user.displayName,
      email: user.email,
      quantity,
      time: Date.now()
    })
  }

  const getOrders = (bookId) =>{
    return getDocs(collection(firestore, "books", bookId, "orders"))
  }

  return (
    <FirebaseContext.Provider
      value={{
        signupWithEmailPass,
        loginWithEmailPass,
        signInWithGoogle,
        logOut,
        isLoggedIn,
        user,
        createNewListing,
        listAllBooks,
        listMyBooks,
        getImgURL,
        viewBook,
        placeOrder,
        getOrders,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
