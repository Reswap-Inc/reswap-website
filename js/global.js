// ReSwap Global JavaScript - Unified functionality

const SUBSCRIBE_ENDPOINT = 'https://reswap.tmithun.com:443/api/global/v1.2/public/subscribe';

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
    this.updateFooterYear();
  }

  detectPageTheme() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    
    if (path.includes('fitshare') || page === 'fitshare') {
      this.setTheme('fitshare');
    } else if (path.includes('needshare') || page === 'needshare') {
      this.setTheme('needshare');
    } else if (path.includes('spaceshare') || page === 'spaceshare') {
      this.setTheme('spaceshare');
    } else if (path.includes('tripshare') || page === 'tripshare') {
      this.setTheme('tripshare');
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
      } else if (this.currentTheme === 'spaceshare' && link.textContent.includes('SpaceShare')) {
        link.classList.add('active');
      } else if (this.currentTheme === 'tripshare' && link.textContent.includes('TripShare')) {
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
        } else if (text.includes('SpaceShare')) {
          this.setTheme('spaceshare');
        } else if (text.includes('TripShare')) {
          this.setTheme('tripshare');
        } else if (text.includes('Home')) {
          this.setTheme('default');
        }
      }
    });
  }
  
  updateFooterYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
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
      if (form.dataset.validationBound === 'true') {
        return;
      }

      form.dataset.validationBound = 'true';
      form.setAttribute('novalidate', 'novalidate');

      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput) {
        return;
      }

      emailInput.addEventListener('input', () => {
        this.clearError(form, emailInput);
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (this.validateEmail(email)) {
          this.clearError(form, emailInput);
          await this.handleSubscription(email, form);
        } else {
          this.showError('Please enter a valid email address', form, emailInput);
        }
      });
    });
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async handleSubscription(email, form) {
    const button = form.querySelector('button');
    const emailInput = form.querySelector('input[type="email"]');
    const originalText = button ? button.textContent : 'Subscribe';
    const honeypotInput = form.querySelector('.hp-field');

    if (button) {
      button.textContent = 'Subscribing...';
      button.disabled = true;
    }

    const tags = (form.dataset.subscribeTags || 'website')
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);

    const payload = {
      email,
      page: window.location.pathname,
      tags,
      url: honeypotInput ? honeypotInput.value : '',
      meta: {
        referrer: document.referrer || '',
        location: window.location.href,
      },
    };

    try {
      const response = await fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data?.status?.error) {
        throw new Error(data?.status?.message || 'Subscription failed');
      }

      if (button) {
        button.textContent = 'Subscribed!';
        button.style.backgroundColor = '#31a050';
      }
      if (emailInput) {
        emailInput.value = '';
      }
    } catch (error) {
      console.error('Subscription failed', error);
      this.showError('Unable to subscribe right now. Please try again later.', form);
    } finally {
      setTimeout(() => {
        if (button) {
          button.textContent = originalText;
          button.disabled = false;
          button.style.backgroundColor = '';
        }
      }, 2000);
    }
  }

  showError(message, form, input) {
    // Create or update error message
    let errorDiv = form.querySelector('.error-message');
    if (!errorDiv) {
      errorDiv = document.createElement('p');
      errorDiv.className = 'error-message';
      errorDiv.setAttribute('role', 'alert');
      errorDiv.setAttribute('aria-live', 'polite');
      form.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;

    if (input) {
      input.classList.add('input-error');
      input.setAttribute('aria-invalid', 'true');
      input.focus();
    }
  }

  clearError(form, input) {
    if (input) {
      input.classList.remove('input-error');
      input.removeAttribute('aria-invalid');
    }

    const errorDiv = form.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
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

// Calendar Manager (for SpaceShare Partners page)
class CalendarManager {
  constructor() {
    this.currentMonth = new Date();
    this.selectedDate = null;
    this.selectedTime = null;
    this.availabilityData = {}; // Loaded from API
    this.apiEndpoint = 'https://reswap.tmithun.com:443/api/partners/v1/';
    this.calendarElement = null;
    this.timeSlotsElement = null;
    this.init();
  }

  async init() {
    this.calendarElement = document.querySelector('.partners-calendar');
    if (!this.calendarElement) return;

    this.timeSlotsElement = document.querySelector('.time-slots-list');

    try {
      await this.loadAvailability();
      this.renderCalendar();
      this.attachEventListeners();
    } catch (error) {
      console.error('Calendar initialization failed:', error);
      this.loadMockAvailability();
      this.renderCalendar();
      this.attachEventListeners();
    }
  }

  async loadAvailability() {
    // Fetch available dates/times from API
    const month = this.formatMonth();
    try {
      const response = await fetch(`${this.apiEndpoint}availability?month=${month}`);
      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      this.availabilityData = data.availability || {};
    } catch (error) {
      console.warn('Failed to load availability from API, using mock data:', error);
      this.loadMockAvailability();
    }
  }

  loadMockAvailability() {
    // Temporary mock data for development/testing
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    this.availabilityData = {};

    // Generate mock availability for next 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(currentYear, currentMonth, today.getDate() + i);
      const dateStr = this.formatDate(date);

      // Only add availability for weekdays
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        this.availabilityData[dateStr] = [
          '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
          '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM',
          '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
        ];
      }
    }
  }

  formatMonth() {
    const year = this.currentMonth.getFullYear();
    const month = String(this.currentMonth.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  renderCalendar() {
    const calendarGrid = this.calendarElement.querySelector('.calendar-days');
    if (!calendarGrid) return;

    // Update month display
    const monthDisplay = this.calendarElement.querySelector('.calendar-month');
    if (monthDisplay) {
      const monthName = this.currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      monthDisplay.textContent = monthName;
    }

    // Clear existing days
    calendarGrid.innerHTML = '';

    // Get first day of month and number of days
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day-empty';
      calendarGrid.appendChild(emptyCell);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = this.formatDate(date);
      const isAvailable = this.availabilityData[dateStr] && this.availabilityData[dateStr].length > 0;
      const isPast = date < today;
      const isSelected = this.selectedDate === dateStr;

      const dayButton = document.createElement('button');
      dayButton.className = 'calendar-day';
      dayButton.textContent = day;
      dayButton.dataset.date = dateStr;

      if (isSelected) {
        dayButton.classList.add('selected');
      }

      if (isPast || !isAvailable) {
        dayButton.classList.add('disabled');
        dayButton.disabled = true;
      }

      calendarGrid.appendChild(dayButton);
    }
  }

  attachEventListeners() {
    // Month navigation
    const prevBtn = this.calendarElement.querySelector('.calendar-prev');
    const nextBtn = this.calendarElement.querySelector('.calendar-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.navigateMonth(-1));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.navigateMonth(1));
    }

    // Day selection (use event delegation)
    const calendarGrid = this.calendarElement.querySelector('.calendar-days');
    if (calendarGrid) {
      calendarGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('calendar-day') && !e.target.disabled) {
          this.selectDate(e.target.dataset.date);
        }
      });
    }

    // Time slot selection (use event delegation)
    if (this.timeSlotsElement) {
      this.timeSlotsElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('time-slot-btn')) {
          this.selectTime(e.target.dataset.time);
        }
      });
    }

    // Form submission
    const bookingForm = document.querySelector('.partners-booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = bookingForm.querySelector('input[type="email"]');
        if (emailInput) {
          this.submitBooking(emailInput.value);
        }
      });
    }
  }

  async navigateMonth(direction) {
    // Update current month
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + direction,
      1
    );

    // Reload availability for new month
    await this.loadAvailability();

    // Re-render calendar
    this.renderCalendar();

    // Clear selections if navigating away from selected month
    if (this.selectedDate) {
      const selectedDateObj = new Date(this.selectedDate);
      if (selectedDateObj.getMonth() !== this.currentMonth.getMonth()) {
        this.selectedDate = null;
        this.selectedTime = null;
        this.renderTimeSlots([]);
      }
    }
  }

  selectDate(dateStr) {
    this.selectedDate = dateStr;
    this.selectedTime = null; // Clear time selection when date changes

    // Update UI
    this.renderCalendar();

    // Load and display available times
    const times = this.availabilityData[dateStr] || [];
    this.renderTimeSlots(times);

    // Update date display
    const dateDisplay = document.querySelector('.selected-date-display');
    if (dateDisplay) {
      const date = new Date(dateStr);
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
      dateDisplay.textContent = formattedDate;
    }
  }

  renderTimeSlots(times) {
    if (!this.timeSlotsElement) return;

    this.timeSlotsElement.innerHTML = '';

    if (times.length === 0) {
      this.timeSlotsElement.innerHTML = '<p class="no-slots">No available time slots for this date</p>';
      return;
    }

    times.forEach(time => {
      const button = document.createElement('button');
      button.className = 'time-slot-btn';
      button.textContent = time;
      button.dataset.time = time;

      if (this.selectedTime === time) {
        button.classList.add('selected');
      }

      this.timeSlotsElement.appendChild(button);
    });
  }

  selectTime(time) {
    this.selectedTime = time;

    // Update UI
    const timeButtons = this.timeSlotsElement.querySelectorAll('.time-slot-btn');
    timeButtons.forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.time === time);
    });

    // Enable booking button
    const bookingBtn = document.querySelector('.confirm-booking-btn');
    if (bookingBtn) {
      bookingBtn.disabled = false;
      bookingBtn.classList.add('enabled');
    }
  }

  async submitBooking(email) {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showError('Please enter a valid email address');
      return;
    }

    // Validate selections
    if (!this.selectedDate || !this.selectedTime) {
      this.showError('Please select a date and time');
      return;
    }

    // Show loading state
    this.setButtonLoading(true);

    try {
      // POST to booking API
      const response = await fetch(`${this.apiEndpoint}book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          date: this.selectedDate,
          time: this.selectedTime,
          type: 'partnership_consultation'
        })
      });

      const data = await response.json();

      if (response.ok) {
        this.showSuccess('Booking confirmed! Check your email for details.');
        this.resetForm();

        // Reload availability to remove booked slot
        await this.loadAvailability();
        this.renderCalendar();
        if (this.selectedDate) {
          this.renderTimeSlots(this.availabilityData[this.selectedDate] || []);
        }
      } else {
        this.showError(data.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      this.showError('Network error. Please check your connection.');
    } finally {
      this.setButtonLoading(false);
    }
  }

  showError(message) {
    const errorElement = document.querySelector('.booking-error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';

      // Auto-hide after 5 seconds
      setTimeout(() => {
        errorElement.style.display = 'none';
      }, 5000);
    }
  }

  showSuccess(message) {
    const successElement = document.querySelector('.booking-success');
    if (successElement) {
      successElement.textContent = message;
      successElement.style.display = 'block';

      // Auto-hide after 10 seconds
      setTimeout(() => {
        successElement.style.display = 'none';
      }, 10000);
    }
  }

  setButtonLoading(isLoading) {
    const btn = document.querySelector('.confirm-booking-btn');
    if (!btn) return;

    if (isLoading) {
      btn.disabled = true;
      btn.dataset.originalText = btn.textContent;
      btn.textContent = 'Booking...';
      btn.classList.add('loading');
    } else {
      btn.disabled = false;
      btn.textContent = btn.dataset.originalText || 'Confirm Booking';
      btn.classList.remove('loading');
    }
  }

  resetForm() {
    this.selectedDate = null;
    this.selectedTime = null;

    // Clear form inputs
    const form = document.querySelector('.partners-booking-form');
    if (form) {
      form.reset();
    }

    // Disable booking button
    const bookingBtn = document.querySelector('.confirm-booking-btn');
    if (bookingBtn) {
      bookingBtn.disabled = true;
      bookingBtn.classList.remove('enabled');
    }

    // Clear time slots
    if (this.timeSlotsElement) {
      this.timeSlotsElement.innerHTML = '';
    }

    // Re-render calendar
    this.renderCalendar();
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
  new CalendarManager();
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
