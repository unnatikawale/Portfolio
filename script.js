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
    const words = ["Full Stack Developer", "Laravel Enthusiast", "Java Developer", "Python Developer"];
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
    // 5. Contact Form Handler (Success Toast & Python API)
    // ==========================================
    const contactForm = document.getElementById('portfolio-contact-form');
    const successToast = document.getElementById('success-toast');
    const submitBtn = document.getElementById('contact-submit-btn');

    if (contactForm && successToast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Perform simple frontend validation/processing
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const phone = document.getElementById('contact-phone').value || 'N/A';
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;

            if (name && email && subject && message) {
                // Change button state to sending
                const originalBtnText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending Message...';
                submitBtn.style.opacity = '0.7';

                // Send request to Python backend
                fetch('http://127.0.0.1:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone,
                        subject: subject,
                        message: message
                    })
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to send message');
                    }
                })
                .then(data => {
                    // Success Path
                    successToast.textContent = 'Message Sent Successfully!';
                    successToast.style.background = 'var(--primary-gradient)'; // Default purple
                    successToast.classList.add('show');
                    
                    // Reset Form and Button
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    submitBtn.style.opacity = '1';

                    // Hide toast after 3.5 seconds
                    setTimeout(() => {
                        successToast.classList.remove('show');
                    }, 3500);
                })
                .catch(error => {
                    // Error Path
                    successToast.textContent = 'Connection Error: Please verify Python backend is running.';
                    successToast.style.background = 'linear-gradient(135deg, #ff416c, #ff4b2b)'; // Sleek neon red warning
                    successToast.classList.add('show');

                    // Reset Button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    submitBtn.style.opacity = '1';

                    // Hide toast after 4.5 seconds
                    setTimeout(() => {
                        successToast.classList.remove('show');
                    }, 4500);
                });
            }
        });
    }

    // ==========================================
    // 6. Premium Custom Trailing Cursor
    // ==========================================
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (cursorDot && cursorOutline) {
        let mouseX = -100;
        let mouseY = -100;
        let outlineX = -100;
        let outlineY = -100;
        let isCursorActive = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!isCursorActive) {
                cursorDot.style.opacity = '1';
                cursorOutline.style.opacity = '1';
                isCursorActive = true;
            }
        });

        // Use requestAnimationFrame for fluid outline tracking
        function animateCursor() {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            
            // Lerp mathematical smoothing
            outlineX = outlineX + distX * 0.14;
            outlineY = outlineY + distY * 0.14;
            
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            requestAnimationFrame(animateCursor);
        }
        requestAnimationFrame(animateCursor);

        // Fade out cursor when leaving window viewport
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
            isCursorActive = false;
        });

        // Re-fade in on mouse reentry
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            isCursorActive = true;
        });

        // Query all hoverable items for interactive scaling effects
        const interactiveElements = document.querySelectorAll(
            'a, button, .tab-btn, .social-icons a, .service-box, .project-card, .certificate-card, .info-card, input, textarea, #menu-icon'
        );

        interactiveElements.forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            elem.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // ==========================================
    // 7. Scroll Reveal Viewport Observer
    // ==========================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if (revealElements.length > 0) {
        const revealOptions = {
            root: null,
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Fire animation only once
                }
            });
        }, revealOptions);

        revealElements.forEach(elem => {
            revealObserver.observe(elem);
        });
    }

    // ==========================================
    // 8. Certificates Lightbox Modal Viewer
    // ==========================================
    const certModal = document.getElementById('cert-lightbox-modal');
    const certCloseBtn = document.getElementById('cert-modal-close');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const certViewBtns = document.querySelectorAll('.cert-view-btn');

    if (certModal && certCloseBtn && lightboxImg && lightboxCaption) {
        // Open Modal
        certViewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const certSrc = btn.getAttribute('data-cert');
                const certTitle = btn.getAttribute('data-title');
                const certIssuer = btn.getAttribute('data-issuer');

                // If the source is a PDF, open it in a new tab/window
                if (certSrc.toLowerCase().endsWith('.pdf')) {
                    window.open(certSrc, '_blank');
                } else {
                    lightboxImg.src = certSrc;
                    lightboxCaption.textContent = `${certTitle} - ${certIssuer}`;
                    certModal.classList.add('show');
                    certModal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden'; // Disable background scrolling
                }
            });
        });

        // Close Modal Function
        const closeCertModal = () => {
            certModal.classList.remove('show');
            certModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Re-enable background scrolling
            // Clear source after transition to prevent flicker on reopen
            setTimeout(() => {
                lightboxImg.src = '';
                lightboxCaption.textContent = '';
            }, 400);
        };

        // Close events
        certCloseBtn.addEventListener('click', closeCertModal);
        
        certModal.addEventListener('click', (e) => {
            // Close if clicking outside the image container content
            if (e.target === certModal) {
                closeCertModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certModal.classList.contains('show')) {
                closeCertModal();
            }
        });
    }
});