document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // prevent default form submission

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

        if (!emailPattern.test(email)) {
            errorMessage.textContent = 'Incorrect email format.';
            return false;
        }

        if (!passwordPattern.test(password)) {
            errorMessage.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.';
            return false;
        }

        errorMessage.textContent = '';

        // Get users and check duplicates
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            errorMessage.textContent = 'Email already registered.';
            return false;
        }

        // Save user
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem(username + "_cart", JSON.stringify([])); // optional cart

        alert('Registration successful!');
        window.location.href = "registered.html"; // redirect AFTER alert
    });
});


function login() {
  const username = document.getElementById("Loginusername").value;
  const password = document.getElementById("Loginpassword").value;
  const email = document.getElementById("Loginemail").value;

  
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const found = users.find(user => user.Loginusername === username && user.Loginpassword === Loginpassword);
  if (found) {
    alert("Login successful!");
  } else {
    alert("Invalid username or password");
  }

  localStorage.setItem("loggedIn", "true");
}

function searchSite() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let pages = {
        "home": "index.html",
        "about": "pages/about.html",
        "contact": "pages/contact.html",
        "design": "pages/design.html",
        "orders": "pages/orders.html",
        "eco": "pages/EcoEdu.html",
        "enquiry": "pages/Enquiry.html",
        "register": "pages/register.html"
    };

    for (let key in pages) {
        if (input.includes(key)) {
            window.location.href = pages[key];
            return;
        }
    }

    alert("No matching page found.");
}

window.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("loggedInUser");
    const ordersOption = document.getElementById("ordersOption");

    if (user) {
        ordersOption.disabled = false; // enable Orders
    } else {
        ordersOption.disabled = true;  // keep Orders locked
    }
});

// When a user logs in
let currentUser = document.getElementById("username").value;
localStorage.setItem("loggedInUser", currentUser);

// When adding to cart
function addToCart(item) {
    let user = localStorage.getItem("loggedInUser");
    if (!user) {
        alert("Please log in first!");
        return;
    }

    // Get user's cart
    let cart = JSON.parse(localStorage.getItem(user + "_cart")) || [];

    // Add item
    cart.push(item);

    // Save back to localStorage
    localStorage.setItem(user + "_cart", JSON.stringify(cart));
}


function displayCart() {
    let user = localStorage.getItem("loggedInUser");
    if (!user) return;

    let cart = JSON.parse(localStorage.getItem(user + "_cart")) || [];

    cart.forEach(item => {
        // display item in the table
        console.log(item.name, item.price, item.quantity);
    });
}
