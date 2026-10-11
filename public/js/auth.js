import { auth, db } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { ref, set, update } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

// Signup Function
export async function signup(email, password, name) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Initialize User in Realtime DB
        await set(ref(db, `users/${user.uid}`), {
            name: name,
            email: email,
            selectedGames: [],
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        });

        return user;
    } catch (error) {
        console.error('Signup Error:', error.message);
        throw error;
    }
}

// Login Function
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update Last Login in Realtime DB
        await update(ref(db, `users/${user.uid}`), {
            lastLogin: new Date().toISOString()
        });

        return user;
    } catch (error) {
        console.error('Login Error:', error.message);
        throw error;
    }
}

// Logout Function
export async function logout() {
    try {
        await signOut(auth);
        window.location.href = '../index.html';
    } catch (error) {
        console.error('Logout Error:', error.message);
    }
}

// Check Auth State
export function checkAuthState(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            callback(user);
        } else {
            // Redirect if not on login/signup page
            const path = window.location.pathname;
            if (!path.includes('login.html') && !path.includes('signup.html') && path !== '/' && !path.includes('index.html')) {
                window.location.href = '/pages/login.html';
            }
        }
    });
}
