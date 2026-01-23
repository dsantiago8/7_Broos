document.querySelectorAll(".service-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const contact = document.querySelector("#contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
    else alert("Contact section coming soon!");
  });
});