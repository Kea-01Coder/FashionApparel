document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // prevent form from submitting

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Email regex
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Password regex: 8+ chars, upper, lower, digit, special
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

        if(!emailPattern.test(email)) {
            errorMessage.textContent = 'Incorrect email format.';
            return false;
        }

        if(!passwordPattern.test(password)) {
            errorMessage.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.';
            return false;
        }

        errorMessage.textContent = ''; // clear error

        // Save user to localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful!');
        form.reset();
        window.location.href = "registered.html";
    });
});


function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const found = users.find(user => user.username === username && user.password === password);
  if (found) {
    alert("Login successful!");
  } else {
    alert("Invalid username or password");
  }
}
