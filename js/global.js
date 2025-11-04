// ReSwap Global JavaScript - Unified functionality

// Theme Management
class ThemeManager {
  constructor() {
    this.currentTheme = 'default';
    this.init();
  }

  init() {
    // Set theme based on page
    this.detectPageTheme();
    this.setupThemeListeners();
  }

  detectPageTheme() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    
    if (path.includes('fitshare') || page === 'fitshare') {
      this.setTheme('fitshare');
    } else if (path.includes('needshare') || page === 'needshare') {
      this.setTheme('needshare');
    } else {
      this.setTheme('default');
    }
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
    
    // Update active navigation
    this.updateActiveNavigation();
  }

  updateActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      // Add active class based on current theme/page
      if (this.currentTheme === 'fitshare' && link.textContent.includes('FitShare')) {
        link.classList.add('active');
      } else if (this.currentTheme === 'needshare' && link.textContent.includes('NeedShare')) {
        link.classList.add('active');
      } else if (this.currentTheme === 'default' && link.textContent.includes('Home')) {
        link.classList.add('active');
      }
    });
  }

  setupThemeListeners() {
    // Listen for navigation clicks to update theme
    document.addEventListener('click', (e) => {
      if (e.target.matches('.nav-link')) {
        const text = e.target.textContent;
        if (text.includes('FitShare')) {
          this.setTheme('fitshare');
        } else if (text.includes('NeedShare')) {
          this.setTheme('needshare');
        } else if (text.includes('Home')) {
          this.setTheme('default');
        }
      }
    });
  }
}

// FAQ Functionality
class FAQManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupFAQToggles();
  }

  setupFAQToggles() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const arrow = item.querySelector('.faq-arrow');
      
      if (question && answer) {
        // Initially hide all answers
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        
        question.addEventListener('click', () => {
          const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
          
          // Close all other FAQ items
          faqItems.forEach(otherItem => {
            const otherAnswer = otherItem.querySelector('.faq-answer');
            const otherArrow = otherItem.querySelector('.faq-arrow');
            if (otherAnswer !== answer) {
              otherAnswer.style.maxHeight = '0';
              if (otherArrow) {
                otherArrow.style.transform = 'rotate(0deg)';
              }
            }
          });
          
          // Toggle current item
          if (isOpen) {
            answer.style.maxHeight = '0';
            if (arrow) arrow.style.transform = 'rotate(0deg)';
          } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            if (arrow) arrow.style.transform = 'rotate(180deg)';
          }
        });
      }
    });
  }
}

// Smooth Scrolling
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // Handle smooth scrolling for anchor links
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }
}

// Header Scroll Effect
class HeaderManager {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.init();
  }

  init() {
    if (this.header) {
      this.setupScrollEffect();
      // Add body padding to account for fixed header
      document.body.style.paddingTop = '0';
    }
  }

  setupScrollEffect() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 50) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
      
      lastScrollTop = scrollTop;
    });
  }
}

// Form Handling
class FormManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupFormSubmissions();
  }

  setupFormSubmissions() {
    const forms = document.querySelectorAll('.subscribe-form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (this.validateEmail(email)) {
          this.handleSubscription(email, form);
        } else {
          this.showError('Please enter a valid email address', form);
        }
      });
    });
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  handleSubscription(email, form) {
    // Simulate subscription process
    const button = form.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    setTimeout(() => {
      button.textContent = 'Subscribed!';
      button.style.backgroundColor = '#31a050';
      form.querySelector('input').value = '';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.backgroundColor = '';
      }, 2000);
    }, 1000);
  }

  showError(message, form) {
    // Create or update error message
    let errorDiv = form.querySelector('.error-message');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.color = '#df3f42';
      errorDiv.style.fontSize = '14px';
      errorDiv.style.marginTop = '8px';
      form.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    
    // Remove error after 3 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 3000);
  }
}

// Mobile Menu (for responsive design)
class MobileMenu {
  constructor() {
    this.init();
  }

  init() {
    this.createMobileMenuToggle();
    this.setupMobileMenuListeners();
  }

  createMobileMenuToggle() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;

    const toggleButton = document.createElement('button');
    toggleButton.className = 'mobile-menu-toggle';
    toggleButton.innerHTML = '☰';
    toggleButton.style.display = 'none';
    toggleButton.style.background = 'none';
    toggleButton.style.border = 'none';
    toggleButton.style.fontSize = '24px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.color = 'var(--color-primary)';

    // Insert toggle button before nav
    nav.parentNode.insertBefore(toggleButton, nav);

    // Show toggle on mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    this.handleMobileView(mediaQuery);
    mediaQuery.addListener(this.handleMobileView.bind(this));
  }

  handleMobileView(mediaQuery) {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (mediaQuery.matches) {
      // Mobile view
      if (toggle) toggle.style.display = 'block';
      if (nav) {
        nav.style.display = 'none';
        nav.classList.add('mobile-nav');
      }
    } else {
      // Desktop view
      if (toggle) toggle.style.display = 'none';
      if (nav) {
        nav.style.display = 'block';
        nav.classList.remove('mobile-nav');
      }
    }
  }

  setupMobileMenuListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.mobile-menu-toggle')) {
        const nav = document.querySelector('.main-nav');
        if (nav) {
          const isVisible = nav.style.display === 'block';
          nav.style.display = isVisible ? 'none' : 'block';
          
          if (!isVisible) {
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'var(--color-background)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            nav.style.padding = '20px';
            nav.style.zIndex = '1000';
            
            // Add header buttons to mobile menu if not already present
            const existingButtons = nav.querySelector('.mobile-menu-buttons');
            if (!existingButtons) {
              const headerButtons = document.querySelector('.header-buttons');
              if (headerButtons) {
                const mobileButtons = document.createElement('div');
                mobileButtons.className = 'mobile-menu-buttons';
                mobileButtons.innerHTML = headerButtons.innerHTML;
                nav.appendChild(mobileButtons);
              }
            }
          }
        }
      }
      
      // Close mobile menu when clicking on nav links
      if (e.target.matches('.nav-link')) {
        const nav = document.querySelector('.main-nav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        // Only close if we're in mobile view (toggle is visible)
        if (nav && toggle && toggle.style.display === 'block') {
          nav.style.display = 'none';
        }
      }
      
      // Close mobile menu when clicking outside
      if (!e.target.closest('.main-nav') && !e.target.matches('.mobile-menu-toggle')) {
        const nav = document.querySelector('.main-nav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        // Only close if we're in mobile view and menu is open
        if (nav && toggle && toggle.style.display === 'block' && nav.style.display === 'block') {
          nav.style.display = 'none';
        }
      }
    });
  }
}

// Animation and Interaction Effects
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
  }

  setupScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.feature-card, .community-card, .faq-item');
    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  setupHoverEffects() {
    // Add subtle hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .feature-card, .community-card, .faq-question');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      });
    });
  }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new FAQManager();
  new SmoothScroll();
  new HeaderManager();
  new FormManager();
  new MobileMenu();
  new AnimationManager();
});

// Navigation utilities
const NavigationUtils = {
  // Navigate to different pages
  goToPage(page) {
    const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
    
    switch(page) {
      case 'home':
        window.location.href = baseUrl + '/index.html';
        break;
      case 'fitshare':
        window.location.href = baseUrl + '/fitshare.html';
        break;
      case 'needshare':
        window.location.href = baseUrl + '/needshare.html';
        break;
      default:
        console.warn('Unknown page:', page);
    }
  },

  // Update community links
  updateCommunityLinks() {
    const communityLinks = document.querySelectorAll('a[href*="fitshare"], a[href*="needshare"]');
    
    communityLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        if (href.includes('fitshare')) {
          this.goToPage('fitshare');
        } else if (href.includes('needshare')) {
          this.goToPage('needshare');
        }
      });
    });
  }
};

// Export for use in other scripts if needed
window.ReSwapUtils = {
  ThemeManager,
  NavigationUtils
};
