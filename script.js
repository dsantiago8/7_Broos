document.querySelectorAll(".service-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const contact = document.querySelector("#contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
    else alert("Contact section coming soon!");
  });
});

document.querySelectorAll(".membership-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tier = btn.dataset.tier;
    alert(`${tier} Membership details coming soon!`);
  });
});