// quote.js
const params = new URLSearchParams(window.location.search);
const serviceFromUrl = params.get("service"); // e.g. "Paint Enhancement"

const pillText = document.getElementById("selectedServiceText");
const select = document.getElementById("serviceSelect");
const hidden = document.getElementById("serviceFromUrl");

const allowed = [
  "Essential Clean Detail",
  "Machine Wax",
  "Premium Deep Detail",
  "Paint Enhancement",
  "1 Step Paint Correction",
  "2 Step Paint Correction",
  "Add-Ons"
];

function setSelectedService(service) {
  const safeService = allowed.includes(service) ? service : "";

  // Show selected service at top
  pillText.textContent = safeService || "Not selected";

  // Fill hidden field so you can track what they clicked
  if (hidden) hidden.value = service || "";

  // Auto-select dropdown if valid
  if (select && safeService) {
    select.value = safeService;
  }
}

if (serviceFromUrl) {
  // decode %20, etc.
  const decoded = decodeURIComponent(serviceFromUrl);
  setSelectedService(decoded);
} else {
  setSelectedService("");
}

// Keep pill in sync if user changes dropdown
if (select) {
  select.addEventListener("change", () => {
    setSelectedService(select.value);
  });
}



