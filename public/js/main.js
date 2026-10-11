import { db } from './firebase-config.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

document.addEventListener('DOMContentLoaded', () => {
    // Check Firebase Connection
    const connectionStatus = document.getElementById('connection-status');
    if (connectionStatus) {
        onValue(ref(db, '.info/connected'), (snapshot) => {
            if (snapshot.val() === true) {
                connectionStatus.innerHTML = '<span class="status-dot online"></span> Firebase Online';
                connectionStatus.classList.add('connected');
                console.log("🚀 Firebase Connected!");
            } else {
                connectionStatus.innerHTML = '<span class="status-dot offline"></span> Firebase Offline';
                connectionStatus.classList.remove('connected');
                console.log("❌ Firebase Disconnected.");
            }
        });
    }

    // Mobile Menu Toggle (Simple implementation)
    const setupMobileMenu = () => {
        // This can be expanded if a hamburger menu is added to the landing page
    };

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle Theme Toggling (Optional enhancement)
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
});
