const ownerName = document.getElementById("ownerName");
const logoutBtn = document.getElementById("logoutBtn");
const menuButtons = document.querySelectorAll(".menu-btn");
const sections = document.querySelectorAll(".panel-section");

function showSection(sectionId) {
  sections.forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });

  menuButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.section === sectionId);
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

window.addEventListener("load", () => {
  const isLogged = localStorage.getItem("domiyaAuth");
  const savedUser = localStorage.getItem("domiyaUser");

  if (isLogged !== "true") {
    window.location.href = "login.html";
    return;
  }

  ownerName.textContent = savedUser || "Dueño";
  showSection("resumen");
});