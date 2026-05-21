/**
 * ============================================
 * EMAIL.JS - Contact Form Integration
 * ============================================
 * Uses EmailJS to send emails without backend.
 * 
 * HOW TO SETUP:
 * 1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
 * 2. Create an Email Service (Gmail, Outlook, etc.)
 * 3. Create an Email Template with variables: name, email, subject, message
 * 4. Get your Service ID, Template ID, and Public Key
 * 5. Replace the placeholder values below
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {

  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');
  const formStatus = document.getElementById('form-status');

  if (!contactForm) return;

  // ==========================================
  // EMAILJS CONFIGURATION
  // ==========================================
  // TODO: Replace these with your actual EmailJS credentials
  const EMAILJS_CONFIG = {
    publicKey: 'kFmEXjdQkyrzXciI4',     // Get from EmailJS Dashboard -> Account -> API Keys
    serviceID: 'service_130vayg',     // Get from EmailJS Dashboard -> Email Services
    templateID: 'template_nxxmdth',   // Get from EmailJS Dashboard -> Email Templates
  };

  // Initialize EmailJS with public key
  emailjs.init(EMAILJS_CONFIG.publicKey);

  // ==========================================
  // FORM SUBMISSION HANDLER
  // ==========================================
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim(),
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showStatus('Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(formData.email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Update button state
    setButtonLoading(true);

    try {
      // Send email via EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceID,
        EMAILJS_CONFIG.templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Khaibar Raeeskhil', // Your name
        }
      );

      if (response.status === 200) {
        showStatus('Message sent successfully! I will get back to you soon. 🎉', 'success');
        contactForm.reset();
      } else {
        showStatus('Failed to send message. Please try again later.', 'error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      showStatus('Failed to send message. Please check your EmailJS configuration.', 'error');
    } finally {
      setButtonLoading(false);
    }
  });

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================

  /**
   * Validates email format
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Shows form status message
   */
  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'text-center text-sm font-medium hidden';

    // Force reflow for animation
    void formStatus.offsetWidth;

    formStatus.classList.remove('hidden');
    if (type === 'success') {
      formStatus.classList.add('text-green-600', 'dark:text-green-400');
    } else {
      formStatus.classList.add('text-red-600', 'dark:text-red-400');
    }

    // Auto-hide after 5 seconds
    setTimeout(() => {
      formStatus.classList.add('hidden');
    }, 5000);
  }

  /**
   * Toggles button loading state
   */
  function setButtonLoading(isLoading) {
    if (isLoading) {
      btnText.textContent = 'Sending...';
      btnSpinner.classList.remove('hidden');
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.8';
      submitBtn.style.cursor = 'not-allowed';
    } else {
      btnText.textContent = 'Send Message';
      btnSpinner.classList.add('hidden');
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
    }
  }

});
