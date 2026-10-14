const siteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
const form = document.querySelector('form');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Basic validation
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  // Disable button while processing
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  grecaptcha.ready(() => {
    grecaptcha.execute(siteKey, { action: 'contact_form' }).then(token => {
      document.getElementById('recaptchaToken').value = token;

      fetch('/send.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, recaptcha_token: token })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Message sent! We\'ll get back to you soon.');
          form.reset();
          document.getElementById('name').focus();
        } else {
          alert('Bot detected or server error. Please try again.');
        }
      })
      .catch(() => {
        alert('Network error. Please check your connection and try again.');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      });
    });
  });
});