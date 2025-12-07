document.addEventListener('DOMContentLoaded', () => {
    // Reveal animation on scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation delay based on element's position in view
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -80px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background change on scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Chat animation - typing effect simulation
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
        const messages = chatMessages.querySelectorAll('.message');
        messages.forEach((msg, index) => {
            msg.style.opacity = '0';
            msg.style.transform = 'translateY(20px)';
            setTimeout(() => {
                msg.style.transition = 'all 0.5s ease';
                msg.style.opacity = '1';
                msg.style.transform = 'translateY(0)';
            }, 800 + (index * 600));
        });
    }
});

