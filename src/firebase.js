import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAf11dSflFQTAsNCo2s-37S-qaBr1opnuQ",
  authDomain: "apptrix-22335.firebaseapp.com",
  projectId: "apptrix-22335",
  storageBucket: "apptrix-22335.appspot.com",
  messagingSenderId: "1087599733576",
  appId: "1:1087599733576:web:7fb713cc9e3291b962217d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function addDish(
  cfg = { name: "test", price: 0, description: "test", image: "" }
) {
  try {
    const docRef = await addDoc(collection(db, "dishes"), cfg);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getDishes() {
  const dishesCol = collection(db, "dishes");
  const dishSnapshot = await getDocs(dishesCol);
  const dishList = dishSnapshot.docs.map((doc) => doc.data());
  return dishList;
}

export async function addCart(cfg) {
  try {
    const docRef = await addDoc(collection(db, "cart"), cfg);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getCart() {
  const cartCol = collection(db, "cart");
  const cartSnapshot = await getDocs(cartCol);
  const cartList = cartSnapshot.docs.map((doc) => doc.data());
  return cartList;
}
