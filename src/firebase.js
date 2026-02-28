import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHoO1_zNAAS0zSjK0PWFbhnA93rxn7azc",
  authDomain: "secondserve-e0b92.firebaseapp.com",
  projectId: "secondserve-e0b92",
  storageBucket: "secondserve-e0b92.firebasestorage.app",
  messagingSenderId: "359697775392",
  appId: "1:359697775392:web:13f90f95a2a8ca94ba3545"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);