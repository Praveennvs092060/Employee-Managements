document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       MOBILE MENU TOGGLE
       ========================================== */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            mobileToggle.classList.toggle('active', isOpen);
            
            // Toggle hamburger animation state
            const spans = mobileToggle.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    /* ==========================================
       SCROLL ACTIVE NAV LINK & REVEAL SECTIONS
       ========================================== */
    const sections = document.querySelectorAll('section');
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const handleScroll = () => {
        const scrollPosition = window.scrollY + 120;

        // Update active nav link based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Scroll Reveal effect
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    // Call once initially to reveal top sections
    handleScroll();

    /* ==========================================
       FORM VALIDATION & AJAX SUBMISSION
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    const submitBtn = document.getElementById('submitBtn');
    const btnSpinner = document.getElementById('btnSpinner');
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');

    // Email regex check
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Real-time input clear styling on focus/typing
    const clearError = (input, errorElement) => {
        input.classList.remove('invalid');
        errorElement.style.display = 'none';
    };

    nameInput.addEventListener('input', () => clearError(nameInput, nameError));
    emailInput.addEventListener('input', () => clearError(emailInput, emailError));
    messageInput.addEventListener('input', () => clearError(messageInput, messageError));

    // Show custom toast notification
    const showToast = (message, isSuccess = true) => {
        toastMessage.textContent = message;
        
        const icon = toast.querySelector('.toast-icon');
        if (isSuccess) {
            toast.style.borderLeftColor = 'var(--success)';
            icon.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
            icon.style.color = 'var(--success)';
            icon.textContent = '✓';
        } else {
            toast.style.borderLeftColor = 'var(--error)';
            icon.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
            icon.style.color = 'var(--error)';
            icon.textContent = '!';
        }

        toast.classList.add('show');

        // Hide toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            let hasErrors = false;

            // Validate Name
            if (!nameInput.value.trim()) {
                nameInput.classList.add('invalid');
                nameError.style.display = 'block';
                hasErrors = true;
            } else {
                clearError(nameInput, nameError);
            }

            // Validate Email
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
                emailInput.classList.add('invalid');
                emailError.style.display = 'block';
                hasErrors = true;
            } else {
                clearError(emailInput, emailError);
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                messageInput.classList.add('invalid');
                messageError.style.display = 'block';
                hasErrors = true;
            } else {
                clearError(messageInput, messageError);
            }

            // Halt if validation fails
            if (hasErrors) return;

            // Disable submit button & show loading state
            submitBtn.disabled = true;
            btnSpinner.style.display = 'inline-block';
            
            // Format form parameters as x-www-form-urlencoded
            const params = new URLSearchParams();
            params.append('name', nameInput.value.trim());
            params.append('email', emailInput.value.trim());
            params.append('message', messageInput.value.trim());

            try {
                // Post request to Spring Boot controller
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params
                });

                if (response.ok) {
                    const resultText = await response.text();
                    
                    // Reset form and show success toast
                    contactForm.reset();
                    showToast(resultText, true);
                } else {
                    showToast('Failed to submit the form. Please try again.', false);
                }
            } catch (error) {
                console.error('Submission error:', error);
                showToast('A network error occurred. Please check connection.', false);
            } finally {
                // Re-enable button & hide loading state
                submitBtn.disabled = false;
                btnSpinner.style.display = 'none';
            }
        });
    }
});
