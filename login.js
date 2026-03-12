const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const demoBtn = document.getElementById("demoBtn");
const message = document.getElementById("message");

togglePasswordBtn.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePasswordBtn.textContent = isPassword ? "Ocultar" : "Ver";
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    message.textContent = "Completa correo y contraseña.";
    return;
  }

  const userName = email.split("@")[0];

  localStorage.setItem("domiyaAuth", "true");
  localStorage.setItem("domiyaUser", capitalize(userName));

  message.textContent = "Ingresando...";
  window.location.href = "domiya.html";
});

demoBtn.addEventListener("click", () => {
  localStorage.setItem("domiyaAuth", "true");
  localStorage.setItem("domiyaUser", "Administrador");
  window.location.href = "domiya.html";
});

function capitalize(text) {
  if (!text) return "Dueño";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

window.addEventListener("load", () => {
  const isLogged = localStorage.getItem("domiyaAuth");
  if (isLogged === "true") {
    window.location.href = "domiya.html";
  }
});