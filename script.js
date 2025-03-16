
lucide.createIcons();

// Update current time
function updateTime() {
    const timeElement = document.getElementById('current-time');
    timeElement.textContent = new Date().toLocaleString();
}

setInterval(updateTime, 1000);
updateTime();

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Form validation
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

function showError(elementId, message) {
    const errorElement = document.getElementById(`${elementId}-error`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    document.getElementById(elementId).classList.add('error');
}

function clearError(elementId) {
    const errorElement = document.getElementById(`${elementId}-error`);
    errorElement.style.display = 'none';
    document.getElementById(elementId).classList.remove('error');
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    formSuccess.style.display = 'none';
    clearError('name');
    clearError('email');
    clearError('message');

    // Validate name
    const name = document.getElementById('name').value.trim();
    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email').value.trim();
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message
    const message = document.getElementById('message').value.trim();
    if (!message) {
        showError('message', 'Message is required');
        isValid = false;
    }

    if (isValid) {
        console.log('Form submitted:', { name, email, message });
        
        // Clear form
        contactForm.reset();
        
        // Show success message
        formSuccess.style.display = 'block';
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Clear errors on input
['name', 'email', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => clearError(id));
});