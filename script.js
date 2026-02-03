// ---------- Navbar "scrolled" state ----------
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// ---------- Smooth scroll helper ----------
function scrollToContact() {
  const contact = document.querySelector("#contact");
  if (contact) {
    contact.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    alert("Contact section coming soon!");
  }
}


// Contact Us Now button (hero CTA) -> Contact
// Works whether it's a <button class="cta"> or <a class="cta" href="#contact">
document.querySelectorAll(".cta, .nav-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // If it's an anchor to #contact, prevent the hard jump
    if (btn.tagName === "A") e.preventDefault();
    scrollToContact();
  });
});

// Membership buttons -> placeholder alert
document.querySelectorAll(".membership-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tier = btn.dataset.tier || "Membership";
    alert(`${tier} details coming soon!`);
  });
});

// ---------- Hamburger Menu ----------
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector("#mobileMenu"); // your nav element


// ---------- Hero Frames Scroll Effect ----------

const heroBgFrames = document.querySelectorAll('.hero-bg-frames .hero-frame');
const heroBgSection = document.querySelector('.hero');
let heroFrameIdx = 0;
if (heroBgSection && heroBgFrames.length > 0) {
  const heroEndLogo = document.querySelector('.hero-end-logo');
  const heroSideLogo = document.querySelector('.hero-side-logo');
  const animateLogoBtn = document.getElementById('animateLogoBtn');
  let endLogoAnimated = false;
  function showHeroFrame(idx) {
    heroBgFrames.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
    // Show/hide right logo, but do not animate end logo on scroll
    if (heroSideLogo) heroSideLogo.style.display = (idx === heroBgFrames.length - 1) ? 'none' : '';
    if (heroEndLogo && !endLogoAnimated) {
      heroEndLogo.style.display = 'none';
      heroEndLogo.classList.remove('animated');
    }
  }

  if (animateLogoBtn && heroEndLogo) {
    animateLogoBtn.addEventListener('click', () => {
      heroEndLogo.style.display = '';
      heroEndLogo.classList.remove('animated');
      // Force reflow to restart animation if button is clicked again
      void heroEndLogo.offsetWidth;
      heroEndLogo.classList.add('animated');
      endLogoAnimated = true;
    });
  }

  function updateHeroFrameByScroll() {
    const rect = heroBgSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = heroBgSection.offsetHeight;
    const scrollY = window.scrollY;
    // Calculate progress through hero section (0 to 1)
    let progress = (scrollY - sectionTop + windowHeight * 0.5) / sectionHeight;
    progress = Math.max(0, Math.min(1, progress));
    const idx = Math.round(progress * (heroBgFrames.length - 1));
    heroFrameIdx = idx;
    showHeroFrame(idx);
  }

  window.addEventListener('scroll', updateHeroFrameByScroll);
  window.addEventListener('resize', updateHeroFrameByScroll);
  // Initial state
  updateHeroFrameByScroll();
}
// navbar already defined above

function openMenu() {
  if (!navbar || !hamburger || !menu) return;
  navbar.classList.add("open");
  hamburger.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  if (!navbar || !hamburger || !menu) return;
  navbar.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
}

function toggleMenu(e) {
  // Stop the click from bubbling up to the document and instantly closing it
  e.stopPropagation();
  if (!navbar) return;

  const isOpen = navbar.classList.contains("open");
  if (isOpen) closeMenu();
  else openMenu();
}

if (hamburger && navbar && menu) {
  hamburger.addEventListener("click", toggleMenu);

  // Close menu when a link is clicked (mobile)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Click outside closes menu (only if open)
  document.addEventListener("click", (e) => {
    if (!navbar.classList.contains("open")) return;
    if (!navbar.contains(e.target)) closeMenu();
  });

  // Escape closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // If resizing to desktop, close menu so it doesn't stay stuck open
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}
