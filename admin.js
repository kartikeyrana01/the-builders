// admin.js - Simple admin dashboard for viewing contact form submissions

// Hardcoded credentials (as per user request)
const ADMIN_EMAIL = "rana.kartikey05@gmail.com";
const ADMIN_PASS = "123456789";

const loginForm = document.getElementById("admin-login");
const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const loginError = document.getElementById("login-error");
const messagesDiv = document.getElementById("messages");
const logoutBtn = document.getElementById("logout-btn");

// Helper to create a message card UI
function createMessageCard(msg) {
  const card = document.createElement("div");
  card.className = "contact-card"; // reuse existing card styling
  card.style.marginBottom = "1.5rem";
  const html = `
    <h3>${msg.name}</h3>
    <p><strong>Email:</strong> ${msg.email}</p>
    <p><strong>Message:</strong><br>${msg.message.replace(/\n/g, "<br>")}</p>
    <p style="font-size:0.8rem;color:var(--text-muted);">Submitted at: ${new Date(msg.time).toLocaleString()}</p>
  `;
  card.innerHTML = html;
  return card;
}

function showDashboard() {
  // Load messages from localStorage
  const stored = JSON.parse(localStorage.getItem("contactMessages") || "[]");
  messagesDiv.innerHTML = "";
  if (stored.length === 0) {
    messagesDiv.innerHTML = "<p>No submissions yet.</p>";
  } else {
    stored.reverse().forEach(msg => {
      messagesDiv.appendChild(createMessageCard(msg));
    });
  }
  loginSection.style.display = "none";
  dashboardSection.style.display = "block";
}

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("admin-email").value.trim();
  const pass = document.getElementById("admin-pass").value;
  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    loginError.style.display = "none";
    showDashboard();
  } else {
    loginError.style.display = "block";
  }
});

logoutBtn.addEventListener("click", () => {
  // Simple logout – just reload the page to reset state
  location.reload();
});
