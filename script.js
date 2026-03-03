// Adds a subtle shadow to the navbar when scrolling
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        navbar.style.background = 'rgba(10, 10, 12, 0.95)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(10, 10, 12, 0.8)';
    }
});

// Card Hover Glow Effect
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
        // Get the card's dimensions and position on the screen
        const rect = card.getBoundingClientRect();
        
        // Calculate the mouse position relative to the top-left of the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update the CSS variables with the exact coordinates
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// =========================================
// Lightbox Image Zoom Functionality
// =========================================
const lightbox = document.getElementById('image-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const images = document.querySelectorAll('.article-hero-img, .inline-img');

// Only run this script if the lightbox exists on the current page
if (lightbox) {
    images.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src; // Copy the clicked image source
            lightbox.classList.add('active'); // Turn on the modal
            document.body.style.overflow = 'hidden'; // Freeze background scrolling
        });
    });

    // Close the lightbox when clicking anywhere on the dark background
    lightbox.addEventListener('click', (e) => {
        // As long as they didn't click the exact image itself, close it
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Unfreeze background scrolling
            
            // Wait for the fade-out animation to finish before clearing the image
            setTimeout(() => {
                if (!lightbox.classList.contains('active')) {
                    lightboxImg.src = ''; 
                }
            }, 300);
        }
    });
}

// =========================================
// Article Sorting Functionality
// =========================================
const sortFilter = document.getElementById('sort-filter');
const researchGrid = document.getElementById('research-grid');

// Only run this if we are actually on the Archive page
if (sortFilter && researchGrid) {
    sortFilter.addEventListener('change', (e) => {
        const sortValue = e.target.value;
        
        // Grab all the cards and turn them into an array we can sort
        const cards = Array.from(researchGrid.querySelectorAll('.card'));

        // Sort the cards based on the invisible data-date attribute
        cards.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));

            if (sortValue === 'newest') {
                return dateB - dateA; // Newest dates get pushed to the top
            } else {
                return dateA - dateB; // Oldest dates get pushed to the top
            }
        });

        // Re-add the newly sorted cards back into the grid instantly
        cards.forEach(card => researchGrid.appendChild(card));
    });
}

// =========================================
// Personal Stats Modal Functionality
// =========================================
const statsBtn = document.getElementById('stats-btn');
const statsModal = document.getElementById('stats-modal');
const closeStats = document.getElementById('close-stats');

if (statsBtn && statsModal) {
    // Open the modal when clicking the button
    statsBtn.addEventListener('click', () => {
        statsModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Freeze background
    });

    // Close when clicking the X
    closeStats.addEventListener('click', () => {
        statsModal.classList.remove('active');
        document.body.style.overflow = ''; // Unfreeze background
    });

    // Close when clicking the dark blurry background
    statsModal.addEventListener('click', (e) => {
        if (e.target === statsModal) {
            statsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// =========================================
// Email Contact Modal Functionality
// =========================================
const emailBtn = document.getElementById('email-btn');
const emailModal = document.getElementById('email-modal');
const closeEmail = document.getElementById('close-email');

if (emailBtn && emailModal) {
    // Open the modal when clicking the button
    emailBtn.addEventListener('click', () => {
        emailModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Freeze background
    });

    // Close when clicking the X
    closeEmail.addEventListener('click', () => {
        emailModal.classList.remove('active');
        document.body.style.overflow = ''; // Unfreeze background
    });

    // Close when clicking the dark blurry background
    emailModal.addEventListener('click', (e) => {
        if (e.target === emailModal) {
            emailModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent background scrolling when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});