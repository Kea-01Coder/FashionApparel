function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("User registered successfully!");
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const found = users.find(user => user.username === username && user.password === password);
  if (found) {
    alert("Login successful!");
  } else {
    alert("Invalid username or password");
  }
}
