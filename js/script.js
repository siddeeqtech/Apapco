// APAPCO PAINTS Website JavaScript
const bootstrap = window.bootstrap // Declare the bootstrap variable

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  initSmoothScrolling()

  // Contact form handling
  initContactForm()

  // Fade in animations
  initScrollAnimations()

  // Mobile menu handling
  initMobileMenu()

  // Add active state to navigation
  updateActiveNavigation()

  // New functions for complete header/footer
  initBackToTopButton()
  initClickablePhoneNumbers()
  initSocialMediaLinks()
})

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = 80 // Account for fixed header
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse)
          bsCollapse.hide()
        }
      }
    })
  })
}

// Contact form handling
function initContactForm() {
  const form = document.getElementById("contact-form")
  const successMessage = document.getElementById("success-message")
  const errorMessage = document.getElementById("error-message")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]')
      submitBtn.classList.add("loading")
      submitBtn.disabled = true

      // Hide previous messages
      successMessage.classList.add("d-none")
      errorMessage.classList.add("d-none")

      // Get form data
      const formData = new FormData(form)
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        service: formData.get("service"),
        message: formData.get("message"),
      }

      // Simulate form submission (replace with actual endpoint)
      setTimeout(() => {
        // Reset loading state
        submitBtn.classList.remove("loading")
        submitBtn.disabled = false

        // Validate form data
        if (validateFormData(data)) {
          // Show success message
          successMessage.classList.remove("d-none")
          form.reset()

          // Scroll to success message
          successMessage.scrollIntoView({ behavior: "smooth", block: "center" })

          // In a real implementation, you would send the data to your server
          console.log("Form submitted:", data)

          // You can integrate with services like:
          // - EmailJS for client-side email sending
          // - Netlify Forms
          // - Formspree
          // - Your own backend API
        } else {
          // Show error message
          errorMessage.classList.remove("d-none")
          errorMessage.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 2000) // Simulate network delay
    })
  }
}

// Form validation
function validateFormData(data) {
  // Basic validation
  if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
    return false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return false
  }

  return true
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add fade-in class to elements you want to animate
  const animatedElements = document.querySelectorAll(".service-card, .gallery-item")
  animatedElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
}

// Mobile menu handling
function initMobileMenu() {
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  if (navbarToggler && navbarCollapse) {
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !navbarToggler.contains(e.target) &&
        !navbarCollapse.contains(e.target) &&
        navbarCollapse.classList.contains("show")
      ) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })

    // Close menu when clicking on nav links (mobile)
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse)
          bsCollapse.hide()
        }
      })
    })
  }
}

// Utility function to send email (example with EmailJS)
function sendEmail(data) {
  // Example integration with EmailJS
  // You would need to include EmailJS library and configure it
  /*
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
        to_email: 'ApapcoPaints@gmail.com'
    })
    .then(function(response) {
        console.log('Email sent successfully:', response);
        return true;
    })
    .catch(function(error) {
        console.error('Email sending failed:', error);
        return false;
    });
    */
}

// Function to update active navigation
function updateActiveNavigation() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')

  window.addEventListener("scroll", () => {
    let current = ""
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
}

// Back to top button functionality
function initBackToTopButton() {
  const backToTopBtn = document.getElementById("backToTop")

  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove("d-none")
      } else {
        backToTopBtn.classList.add("d-none")
      }
    })

    // Scroll to top when clicked
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Enhanced phone number functionality
function initClickablePhoneNumbers() {
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]')

  phoneLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Track phone clicks for analytics
      console.log("Phone number clicked:", link.href)

      // You can add analytics tracking here
      // gtag('event', 'phone_click', { phone_number: link.href })
    })
  })
}

// Social media links functionality
function initSocialMediaLinks() {
  const socialLinks = document.querySelectorAll("footer a[title]")

  socialLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const platform = link.getAttribute("title")

      // Prevent default for placeholder links
      if (link.getAttribute("href") === "#") {
        e.preventDefault()

        // Show message for placeholder social links
        alert(`${platform} page coming soon! For now, contact us directly at +234 810 032 7185`)
      }

      // Track social media clicks
      console.log("Social media clicked:", platform)
    })
  })
}
