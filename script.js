document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Mobile Menu Toggler
    // ==========================================
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });

        // Close mobile navbar when clicking any link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 2. Sticky Header and Scroll Active Links (Scroll Spy)
    // ==========================================
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header effect
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 50);
        }

        // Active Navigation Link on Scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // ==========================================
    // 3. Typewriter Animation Effect
    // ==========================================
    const typedTarget = document.querySelector('#typed-target');
    const words = ["Full Stack Developer", "Laravel Enthusiast", "Java Developer", "UI/UX Specialist"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        if (!typedTarget) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedTarget.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting speed
        } else {
            typedTarget.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Natural typing speed
        }

        // Handle word switching
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1500; // Pause at the end of the word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Brief pause before typing next word
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Initialize typewriter
    if (typedTarget) {
        typeWriter();
    }

    // ==========================================
    // 4. Interactive Tabs (About Section)
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Deactivate all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Deactivate all contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate clicked button and target content
            button.classList.add('active');
            const targetElement = document.getElementById(targetTab);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });

    // ==========================================
    // 5. Contact Form Handler (Success Toast)
    // ==========================================
    const contactForm = document.getElementById('portfolio-contact-form');
    const successToast = document.getElementById('success-toast');

    if (contactForm && successToast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Perform simple frontend validation/processing
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;

            if (name && email && subject && message) {
                // Show success toast
                successToast.classList.add('show');

                // Clear input fields
                contactForm.reset();

                // Hide success toast after 3.5 seconds
                setTimeout(() => {
                    successToast.classList.remove('show');
                }, 3500);
            }
        });
    }
});