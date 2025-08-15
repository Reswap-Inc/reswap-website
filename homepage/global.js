// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0px';
                }
            });
            
            // Toggle current item
            const isActive = item.classList.contains('active');
            
            if (isActive) {
                // Close current item
                item.classList.remove('active');
                answer.style.maxHeight = '0px';
            } else {
                // Open current item
                item.classList.add('active');
                // Calculate the height needed for the content
                const scrollHeight = answer.scrollHeight;
                answer.style.maxHeight = scrollHeight + 'px';
            }
        });
    });

    // Header background change on scroll
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 249, 242, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
        }
    });

    // Form submission for newsletter
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing! We\'ll keep you updated with the latest from ReSwap.');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
});