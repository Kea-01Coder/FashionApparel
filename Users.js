document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    const errorMessage = document.getElementById('error-message');

    if(form){
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
        const existingUsername = users.find(user => user.username === username);
        if (existingUser) {
            window.alert = 'Email already registered.';
            return false;
        }
        if (existingUsername) {
            window.alert = 'Username already taken.';
            return false;
        }

        // Save user
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem(username + "_cart", JSON.stringify([])); // optional cart

        alert('Registration successful!');
        window.location.href = "registered.html"; // redirect AFTER alert
    });
} else{
    console.warn("Register form not found on this page.");
}

    // When a user logs in — move this here so element exists
    const usernameField = document.getElementById("username");
    if (usernameField) {
        let currentUser = usernameField.value || '';
        if (currentUser) {
            localStorage.setItem("loggedInUser", currentUser);
        }
    }

    // Enable/disable orders option safely
    const ordersOption = document.getElementById("ordersOption");
    const user = localStorage.getItem("loggedInUser");
    if (ordersOption) {
        ordersOption.disabled = !user;
    }

});

function login(event) 
{
    // prevent the form from submitting and causing navigation
    if (event && event.preventDefault) event.preventDefault();

  const usernameEl = document.getElementById("Loginusername");
  const passwordEl = document.getElementById("Loginpassword");

  if (!usernameEl || !passwordEl ) {
    alert("Login form fields are missing.");
    return false;
  }

  const identifier = usernameEl.value.trim(); // allow username or email
  const password = passwordEl.value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const found = users.find(user =>
    (user.username === identifier || user.email === identifier) &&
    user.password === password
  );

  function goTo(pageName) {
    // If current page is inside /pages/, navigate to same folder; otherwise go into pages/
    return location.pathname.includes('/pages/') ? `${pageName}.html` : `pages/${pageName}.html`;
  }

  if (found) {
    localStorage.setItem("loggedInUser", found.username);
    localStorage.setItem("loggedIn", "true");
    alert("Login successful!");
    window.location.href = goTo('design');
    return true;
  } else {
    alert("Invalid username or password");
    return false;
  }
}

function searchSite() 
{
    const inputEl = document.getElementById("searchInput");
    const raw = inputEl ? inputEl.value : "";
    const input = raw.trim().toLowerCase();

    if (!input) {
        alert("Enter a search term.");
        return;
    }

    const pages = {
        "home": "index.html",
        "about": "pages/about.html",
        "contact": "pages/contact.html",
        "design": "pages/design.html",
        "orders": "pages/orders.html",
        "ecoedu": "pages/EcoEdu.html",
        "enquiry": "pages/Enquiry.html",
        "register": "pages/register.html"
    };

    function resolvePath(target) {
        // If current page is inside /pages/, strip "pages/" from target paths that include it
        if (location.pathname.includes("/pages/")) {
            return target.startsWith("pages/") ? target.slice(6) : target;
        }
        return target;
    }

    // exact key match
    if (pages[input]) {
        window.location.href = resolvePath(pages[input]);
        return;
    }

    // key substring or path contains input
    for (const [key, path] of Object.entries(pages)) {
        if (key.includes(input) || path.toLowerCase().includes(input)) {
            window.location.href = resolvePath(path);
            return;
        }
    }

    // fallback: partial word match (e.g., "about us" -> "about")
    for (const [key, path] of Object.entries(pages)) {
        const words = key.split(/[\W_]+/);
        if (words.some(w => w.startsWith(input) || w.includes(input))) {
            window.location.href = resolvePath(path);
            return;
        }
    }

    alert("No matching page found.");
}

// When a user logs in
let currentUser = document.getElementById("username").value;
localStorage.setItem("loggedInUser", currentUser);

// When adding to cart
function addToCart(item) {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
        alert("Please log in first!");
        return;
    }

    const key = user + "_cart";
    const cart = JSON.parse(localStorage.getItem(key)) || [];
    cart.push(item);
    localStorage.setItem(key, JSON.stringify(cart));
    return true;
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
