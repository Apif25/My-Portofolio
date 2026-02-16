const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// AUTO CLOSE MOBILE MENU SAAT LINK DIKLIK
const mobileLinks = document.querySelectorAll("#mobile-menu a");

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

let lastScroll = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // kalau di paling atas, navbar selalu muncul
  if (currentScroll <= 0) {
    navbar.classList.remove("-translate-y-[150%]");
    return;
  }

  // scroll ke bawah → sembunyikan
  if (currentScroll > lastScroll) {
    navbar.classList.add("-translate-y-[150%]");
  }
  // scroll ke atas → tampilkan
  else {
    navbar.classList.remove("-translate-y-[150%]");
  }

  lastScroll = currentScroll;
});

function typeWriter(element, speed = 25) {
  const text = element.getAttribute("data-text");
  let i = 0;
  element.innerHTML = "";

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

// jalan saat web selesai load
window.addEventListener("load", () => {
  const el = document.getElementById("typing");
  typeWriter(el, 25);
});

function showTab(tab) {
  const skillsTab = document.getElementById("skillsTab");
  const certTab = document.getElementById("certTab");
  const indicator = document.getElementById("tabIndicator");

  if (tab === "skillsTab") {
    skillsTab.classList.remove("hidden");
    certTab.classList.add("hidden");

    // geser ke kiri
    indicator.style.transform = "translateX(0px)";
  } else {
    certTab.classList.remove("hidden");
    skillsTab.classList.add("hidden");

    // geser ke kanan
    indicator.style.transform = "translateX(116px)";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bgMusic");
  const disc = document.getElementById("disc");
  const player = document.getElementById("musicPlayer");
  const icon = document.getElementById("musicIcon");

  music.volume = 0.25;

  // ========= AUTOPLAY SAAT PAGE LOAD =========
  window.addEventListener("load", async () => {
    try {
      await music.play(); // autoplay muted
      disc.classList.add("spinning");
      icon.innerHTML = "⏸"; // karena musik lagi jalan
    } catch (err) {
      console.log("Autoplay blocked");
    }
  });

  // ========= AKTIFKAN SUARA SETELAH INTERAKSI =========
  function enableSound() {
    music.muted = false;
    music.play();
    document.removeEventListener("click", enableSound);
    document.removeEventListener("scroll", enableSound);
  }
  document.addEventListener("click", enableSound);
  document.addEventListener("scroll", enableSound);

  // ========= TOGGLE PLAY / PAUSE =========
  player.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      disc.classList.add("spinning");
      icon.innerHTML = "⏸";
    } else {
      music.pause();
      disc.classList.remove("spinning");
      icon.innerHTML = "🎵";
    }
  });
});

window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const splashText = document.getElementById("splashText");

  // tampilkan tulisan dengan fade in
  splashText.classList.add("fade-in");

  // setelah 2.5 detik → fade out splash
  setTimeout(() => {
    splash.style.transition = "opacity 0.8s ease";
    splash.style.opacity = "0";

    splash.addEventListener("transitionend", () => {
      splash.style.display = "none";
    });
  }, 2500); // durasi splash
});

function flipCard(card) {
  card.classList.toggle("flipped");
}

// Optional: Auto flip back after some time
function flipCard(card) {
  card.classList.toggle("flipped");

  // Auto flip back after 3 seconds (optional)
  if (card.classList.contains("flipped")) {
    setTimeout(() => {
      card.classList.remove("flipped");
    }, 3000);
  }
}

document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

const themeToggle = document.getElementById("themeToggle");
const themeToggleMobile = document.getElementById("themeToggleMobile");

const themeIcon = document.getElementById("themeIcon");
const themeIconMobile = document.getElementById("themeIconMobile");

function setTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    themeIcon.textContent = "☀️";
    if (themeIconMobile) themeIconMobile.textContent = "☀️";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    themeIcon.textContent = "🌙";
    if (themeIconMobile) themeIconMobile.textContent = "🌙";
  }
}

// load saved theme
const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme === "dark");

// desktop toggle
themeToggle.addEventListener("click", () => {
  setTheme(!document.documentElement.classList.contains("dark"));
});

// mobile toggle
themeToggleMobile.addEventListener("click", () => {
  setTheme(!document.documentElement.classList.contains("dark"));
});
