const { initializeApp } = require("firebase/app");
const { getFirestore, collection } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDE1duXAT0u-04wCsDQHNZSfe989RJY9rw",
  authDomain: "carenow-24fc2.firebaseapp.com",
  projectId: "carenow-24fc2",
  storageBucket: "carenow-24fc2.appspot.com",
  messagingSenderId: "431472941519",
  appId: "1:431472941519:web:6869d6f5699d6b123b9aba",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, "entries");

module.exports = { colRef };
