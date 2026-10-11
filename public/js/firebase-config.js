// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDn1mf69_-7kFnsrpJTDjovA6-FS7nuSE",
    authDomain: "gamecoach-f111e.firebaseapp.com",
    databaseURL: "https://gamecoach-f111e-default-rtdb.firebaseio.com/",
    projectId: "gamecoach-f111e",
    storageBucket: "gamecoach-f111e.firebasestorage.app",
    messagingSenderId: "918377023604",
    appId: "1:918377023604:web:7130c16d3b39db3791a921",
    measurementId: "G-XF9QHYVQRM"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
