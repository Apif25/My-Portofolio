// ============= INIT AOS =============
if (window.AOS) {
  AOS.init({ once: true, duration: 700 });
}

// ============= MOBILE MENU =============
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.toggle("hidden");
  menuBtn.setAttribute("aria-expanded", String(!isHidden));
});

// AUTO CLOSE MOBILE MENU SAAT LINK DIKLIK
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// ============= NAVBAR HIDE ON SCROLL (throttled via rAF) =============
const navbar = document.getElementById("navbar");
let lastScroll = 0;
let ticking = false;

function handleNavbarScroll() {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.classList.remove("-translate-y-[150%]");
  } else if (currentScroll > lastScroll) {
    navbar.classList.add("-translate-y-[150%]");
  } else {
    navbar.classList.remove("-translate-y-[150%]");
  }

  lastScroll = currentScroll;
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(handleNavbarScroll);
      ticking = true;
    }
  },
  { passive: true },
);

// ============= TYPEWRITER EFFECT =============
function typeWriter(element, speed = 25) {
  const text = element.getAttribute("data-text");
  let i = 0;
  element.textContent = "";

  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("typing");
  if (el) typeWriter(el, 25);
});

// ============= SKILLS / CERTIFICATE TAB =============
function showTab(tab) {
  const skillsTab = document.getElementById("skillsTab");
  const certTab = document.getElementById("certTab");
  const indicator = document.getElementById("tabIndicator");
  const btnSkills = document.getElementById("btnSkills");
  const btnCert = document.getElementById("btnCert");

  if (tab === "skillsTab") {
    skillsTab.classList.remove("hidden");
    certTab.classList.add("hidden");
    indicator.style.transform = "translateX(0px)";
    btnSkills.setAttribute("aria-pressed", "true");
    btnCert.setAttribute("aria-pressed", "false");
  } else {
    certTab.classList.remove("hidden");
    skillsTab.classList.add("hidden");
    indicator.style.transform = "translateX(116px)";
    btnSkills.setAttribute("aria-pressed", "false");
    btnCert.setAttribute("aria-pressed", "true");
  }
}
window.showTab = showTab;

// ============= FLIP CARD (Skills grid) =============
function flipCard(card) {
  card.classList.toggle("flipped");

  if (card.classList.contains("flipped")) {
    setTimeout(() => {
      card.classList.remove("flipped");
    }, 3000);
  }
}
window.flipCard = flipCard;

// ============= FLIP CARD (Certificate tab) =============
document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

// ============= THEME TOGGLE (DARK MODE) =============
const themeToggle = document.getElementById("themeToggle");
const themeToggleMobile = document.getElementById("themeToggleMobile");
const themeIcon = document.getElementById("themeIcon");
const themeIconMobile = document.getElementById("themeIconMobile");

function setTheme(isDark) {
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
  const icon = isDark ? "☀️" : "🌙";
  if (themeIcon) themeIcon.textContent = icon;
  if (themeIconMobile) themeIconMobile.textContent = icon;
}

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme ? savedTheme === "dark" : prefersDark);

themeToggle?.addEventListener("click", () => {
  setTheme(!document.documentElement.classList.contains("dark"));
});
themeToggleMobile?.addEventListener("click", () => {
  setTheme(!document.documentElement.classList.contains("dark"));
});

// ============= BACKGROUND MUSIC PLAYER =============
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bgMusic");
  const disc = document.getElementById("disc");
  const player = document.getElementById("musicPlayer");
  const icon = document.getElementById("musicIcon");
  if (!music || !player) return;

  music.volume = 0.25;

  function togglePlay() {
    if (music.paused) {
      music.muted = false;
      music.play().catch(() => {});
      disc.classList.add("spinning");
      icon.textContent = "⏸";
    } else {
      music.pause();
      disc.classList.remove("spinning");
      icon.textContent = "🎵";
    }
  }

  player.addEventListener("click", togglePlay);
  player.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      togglePlay();
    }
  });
});

// ============= PAUSE GALERI PROJECT SAAT TIDAK TERLIHAT =============
// Animasi berjalan terus walau section-nya sudah discroll lewat, ini boros
// CPU/GPU dan bikin scroll di bagian lain jadi ikut lag. Di-pause pakai
// IntersectionObserver supaya cuma jalan kalau section-nya kelihatan.
const scrollingRows = document.querySelectorAll(
  ".animate-projects, .animate-projects-reverse",
);

if (scrollingRows.length && "IntersectionObserver" in window) {
  const rowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.style.animationPlayState = entry.isIntersecting
          ? "running"
          : "paused";
      });
    },
    { threshold: 0 },
  );
  scrollingRows.forEach((row) => rowObserver.observe(row));
}

// ============= FOOTER YEAR =============
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
