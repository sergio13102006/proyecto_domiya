const ownerName = document.getElementById("ownerName");
const logoutBtn = document.getElementById("logoutBtn");
const menuButtons = document.querySelectorAll(".menu-btn");
const sections = document.querySelectorAll(".panel-section");
const liveStatus = document.getElementById("liveStatus");
const mapUpdatedAt = document.getElementById("mapUpdatedAt");

function showSection(sectionId) {
  sections.forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });

  menuButtons.forEach((button) => {
    const isActive = button.dataset.section === sectionId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-current", isActive ? "page" : "false");
  });
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showSection(button.dataset.section);
  });
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("domiyaAuth");
  localStorage.removeItem("domiyaUser");
  window.location.href = "login.html";
});

function startLiveClock() {
  let seconds = 10;

  updateStatus(seconds);

  setInterval(() => {
    seconds += 5;
    if (seconds >= 60) seconds = 5;
    updateStatus(seconds);
  }, 5000);
}

function updateStatus(seconds) {
  const text = `Actualizado hace ${seconds} s`;

  if (liveStatus) liveStatus.textContent = text;
  if (mapUpdatedAt) mapUpdatedAt.textContent = text;
}

window.addEventListener("load", () => {
  const isLogged = localStorage.getItem("domiyaAuth");
  const savedUser = localStorage.getItem("domiyaUser");

  if (isLogged !== "true") {
    window.location.href = "login.html";
    return;
  }

  ownerName.textContent = savedUser || "Dueño";
  showSection("resumen");
  startLiveClock();
});