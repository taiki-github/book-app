// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBguI-kkvFKJisOcHCzGiprp4MRl58_1Og",
  authDomain: "nuxt-spa-book-app-ee9ea.firebaseapp.com",
  projectId: "nuxt-spa-book-app-ee9ea",
  storageBucket: "nuxt-spa-book-app-ee9ea.appspot.com",
  messagingSenderId: "367925123219",
  appId: "1:367925123219:web:2597ec977a143825ff1566"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default(context, inject)=>{
    inject("firebase",firebaseApp)
}