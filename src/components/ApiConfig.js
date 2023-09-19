// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuAfzQACacoy17SHDok3BWDZN8-fz-KOc",
  authDomain: "projeto-aula-421f4.firebaseapp.com",
  databaseURL: "https://projeto-aula-421f4-default-rtdb.firebaseio.com",
  projectId: "projeto-aula-421f4",
  storageBucket: "projeto-aula-421f4.appspot.com",
  messagingSenderId: "150881422773",
  appId: "1:150881422773:web:7b5592f3b8079b2d2f1dfc"
};

// Initialize Firebase
const appi = initializeApp(firebaseConfig);

export default appi