const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const demoBtn = document.getElementById("demoBtn");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

togglePasswordBtn.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";

  passwordInput.type = isPassword ? "text" : "password";
  togglePasswordBtn.textContent = isPassword ? "Ocultar" : "Ver";
  togglePasswordBtn.setAttribute(
    "aria-label",
    isPassword ? "Ocultar contraseña" : "Mostrar contraseña"
  );
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  clearMessage();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showMessage("Completa correo y contraseña.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showMessage("Ingresa un correo válido.", "error");
    emailInput.focus();
    return;
  }

  setLoading(true, "Ingresando...");

  const userName = email.split("@")[0];

  setTimeout(() => {
    localStorage.setItem("domiyaAuth", "true");
    localStorage.setItem("domiyaUser", capitalize(userName));
    showMessage("Acceso correcto. Redirigiendo...", "success");
    window.location.href = "domiya.html";
  }, 700);
});

demoBtn.addEventListener("click", () => {
  clearMessage();
  setLoading(true, "Cargando demo...");

  setTimeout(() => {
    localStorage.setItem("domiyaAuth", "true");
    localStorage.setItem("domiyaUser", "Administrador");
    window.location.href = "domiya.html";
  }, 500);
});

function setLoading(state, text = "Procesando...") {
  submitBtn.disabled = state;
  demoBtn.disabled = state;
  emailInput.disabled = state;
  passwordInput.disabled = state;
  togglePasswordBtn.disabled = state;

  const btnText = submitBtn.querySelector(".btn-text");
  btnText.textContent = state ? text : "Entrar";
}

function showMessage(text, type = "") {
  message.textContent = text;
  message.className = "message";
  if (type) {
    message.classList.add(type);
  }
}

function clearMessage() {
  message.textContent = "";
  message.className = "message";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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