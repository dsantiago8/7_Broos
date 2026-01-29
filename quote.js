// quote.js
const params = new URLSearchParams(window.location.search);
const serviceFromUrl = params.get("service"); // e.g. "Full Detail"

const pillText = document.getElementById("selectedServiceText");
const select = document.getElementById("serviceSelect");
const hidden = document.getElementById("serviceFromUrl");

const allowed = ["Exterior Detail", "Interior Detail", "Full Detail"];

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

// Demo submit handler (static sites)
const form = document.getElementById("quoteForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const service = data.get("service");
    alert(`Thanks! We received your request for: ${service}. We'll reach out ASAP.`);

    form.reset();
    // Keep the selected service visible after reset
    setSelectedService(select?.value || "");
  });
}
