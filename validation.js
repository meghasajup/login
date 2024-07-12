document.addEventListener('DOMContentLoaded', function() {
    // Ensure signup form exists before adding event listener
    var signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Clear previous error messages
            clearErrorMessages();

            let fullName = document.getElementById('fullName').value;
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            let confirmPassword = document.getElementById('confirmPassword').value;

            let valid = true;

            if (!fullName) {
                displayError('fullNameError', 'Full Name is required.');
                valid = false;
            }
            if (!email) {
                displayError('emailError', 'Email is required.');
                valid = false;
            } else if (!validateEmail(email)) {
                displayError('emailError', 'Email is not valid.');
                valid = false;
            }
            if (!password) {
                displayError('passwordError', 'Password is required.');
                valid = false;
            }
            if (!confirmPassword) {
                displayError('confirmPasswordError', 'Confirm Password is required.');
                valid = false;
            } else if (password !== confirmPassword) {
                displayError('confirmPasswordError', 'Passwords do not match.');
                valid = false;
            }

            if (valid) {
                // Store credentials in localStorage
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);

                alert('Signup successful!');
                window.location.href = 'login.html';
            }
        });
    }

    // Ensure login form exists before adding event listener
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Clear previous error messages
            clearErrorMessages();

            let email = document.getElementById('loginEmail').value;
            let password = document.getElementById('loginPassword').value;

            let valid = true;

            if (!email) {
                displayError('loginEmailError', 'Email is required.');
                valid = false;
            } else if (!validateEmail(email)) {
                displayError('loginEmailError', 'Email is not valid.');
                valid = false;
            }
            if (!password) {
                displayError('loginPasswordError', 'Password is required.');
                valid = false;
            }

            // Validate credentials
            let storedEmail = localStorage.getItem('email');
            let storedPassword = localStorage.getItem('password');

            if (valid) {
                if (email === storedEmail && password === storedPassword) {
                    alert('Login successful!');
                    window.location.href = 'https://profile-xi-ten.vercel.app/';
                } else {
                    displayError('loginPasswordError', 'Invalid credentials.');
                }
            }
        });
    }

    function displayError(elementId, message) {
        let element = document.getElementById(elementId);
        element.innerText = message;
        element.style.display = 'block';
    }

    function clearErrorMessages() {
        let errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(element) {
            element.style.display = 'none';
            element.innerText = '';
        });
    }

    function validateEmail(email) {
        let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
