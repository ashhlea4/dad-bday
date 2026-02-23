document.addEventListener("DOMContentLoaded", function () {

  // ===============================
  // ELEMENT REFERENCES
  // ===============================
  const celebrateBtn = document.getElementById("celebrate");
  const title = document.querySelector(".center-circle h2");
  const subtitle = document.getElementById("subtitle");
  const envelope = document.querySelector(".envelope");
  const typedText = document.getElementById("typedText");
  const paperSound = document.getElementById("paperSound");
  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  // ===============================
// PASSWORD PROTECTION
// ===============================

const unlockBtn = document.getElementById("unlock");
const passwordInput = document.getElementById("password-input");
const passwordScreen = document.getElementById("password-screen");
const mainSite = document.getElementById("main-site");
const errorMessage = document.getElementById("error-message");

const correctPassword = "022368"; 

function unlockSite() {
  if (passwordInput.value === correctPassword) {
    passwordScreen.style.opacity = "0";
    setTimeout(() => {
      passwordScreen.style.display = "none";
      mainSite.style.display = "block";
    }, 500);
  } else {
    errorMessage.innerText = "Hint: special birthday";
  }
}

unlockBtn.addEventListener("click", unlockSite);

passwordInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    unlockSite();
  }
});

  const birthdayMessage = `
  Dear Dad,

  Happy 58th Birthday 🤍

  Thank you for being an amazing dad! You are always patient and loving to us and never stop working hard to make us happy. I love you so much!

  Love,
  Ashley
  `;


function typeLetter(text, element, speed = 40) {
  element.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {

      if (text.charAt(i) === "\n") {
        element.innerHTML += "<br>";
      } else {
        element.innerHTML += text.charAt(i);
      }

      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

  const weddingSong = document.getElementById("weddingSong");
  const birthdaySong = document.getElementById("birthdaySong");

// ===============================
// TIMELINE PHOTO PREVIEW
// ===============================

const photos = document.querySelectorAll(".photo");
const preview = document.querySelector(".photo-preview");
const previewImg = preview.querySelector("img");

photos.forEach(photo => {

  // DESKTOP
  photo.addEventListener("mouseenter", () => {
    if (!isTouchDevice) {
      previewImg.src = photo.querySelector("img").src;
      preview.classList.add("active");
    }
  });

  photo.addEventListener("mouseleave", () => {
    if (!isTouchDevice) {
      preview.classList.remove("active");
    }
  });

  // MOBILE
  photo.addEventListener("click", () => {
    if (isTouchDevice) {
      previewImg.src = photo.querySelector("img").src;
      preview.classList.add("active");
    }
  });

});

document.addEventListener("click", function(e) {
  if (isTouchDevice) {
    if (!e.target.closest(".photo") && !e.target.closest(".photo-preview")) {
      preview.classList.remove("active");
    }
  }
});

document.querySelector(".close-preview")
  .addEventListener("click", () => {
    preview.classList.remove("active");
  });


  // ===============================
  // BALLOON IMAGES
  // ===============================
  const balloonImages = [
    "balloons/blue.png",
    "balloons/purple.png",
    "balloons/pink.png",
    "balloons/yellow.png",
    "balloons/orange.png"
  ];

  if (!celebrateBtn) return;

  // ===============================
  // AUDIO INITIAL START (Browser requires interaction)
  // ===============================
  document.body.addEventListener("click", function initAudio() {
    weddingSong.volume = 0.5;
    weddingSong.play();
    document.body.removeEventListener("click", initAudio);
  });

  // ===============================
  // AUDIO FADE FUNCTIONS
  // ===============================
  function fadeOut(audio) {
    const fade = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume -= 0.05;
      } else {
        audio.volume = 0;
        audio.pause();
        clearInterval(fade);
      }
    }, 100);
  }

  function fadeIn(audio) {
    audio.volume = 0;
    audio.play();

    const fade = setInterval(() => {
      if (audio.volume < 0.5) {
        audio.volume += 0.05;
      } else {
        audio.volume = 0.5;
        clearInterval(fade);
      }
    }, 100);
  }

  // ===============================
  // CREATE BALLOON
  // ===============================
  function createBalloon() {

    const balloon = document.createElement("img");
    balloon.classList.add("balloon");

    const randomIndex = Math.floor(Math.random() * balloonImages.length);
    balloon.src = balloonImages[randomIndex];

    balloon.style.left = Math.random() * 100 + "vw";

    const size = 60 + Math.random() * 60;
    balloon.style.width = size + "px";

    const duration = 6 + Math.random() * 5;
    balloon.style.animationDuration = duration + "s";

    document.body.appendChild(balloon);

    setTimeout(() => {
      balloon.remove();
    }, duration * 1000);
  }

  // ===============================
  // PARTY TOGGLE
  // ===============================
  function togglePartyMode() {

    document.body.classList.toggle("party");

    if (document.body.classList.contains("party")) {

      title.innerText = "Happy Birthday Dad";
      subtitle.innerText = "58 Years Old";

      fadeOut(weddingSong);
      fadeIn(birthdaySong);

      // Spawn balloons
      for (let i = 0; i < 20; i++) {
        setTimeout(createBalloon, i * 300);
      }

    } else {

      title.innerText = "1995 → 2026";
      subtitle.innerText = "28 Years of Love";

      fadeOut(birthdaySong);
      fadeIn(weddingSong);

      if (envelope) {
        envelope.classList.remove("open");
      }
    }
  }

  celebrateBtn.addEventListener("click", togglePartyMode);

  // ===============================
// ENVELOPE OPEN / CLOSE
// ===============================

if (envelope) {
  envelope.addEventListener("click", function () {

    if (!envelope.classList.contains("open")) {

      envelope.classList.add("open");

      paperSound.currentTime = 0;
      paperSound.play();

      setTimeout(() => {
        typeLetter(birthdayMessage, typedText);
      }, 500);
    }
  });
}

// ===============================
// CONFETTI BURST
// ===============================
function triggerConfetti() {

  const colors = ["#ff4d4d", "#ffd633", "#66ccff", "#ff66cc", "#66ff99"];

  for (let i = 0; i < 120; i++) {

    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const size = 6 + Math.random() * 6;
    confetti.style.width = size + "px";
    confetti.style.height = size * 1.5 + "px";

    const duration = 3 + Math.random() * 3;
    confetti.style.animationDuration = duration + "s";

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, duration * 1000);
  }
}

const flames = document.querySelectorAll(".flame");

flames.forEach(flame => {
  flame.addEventListener("click", function () {

    flame.classList.add("blown");

    // Check if BOTH flames are blown
    const allBlown = [...flames].every(f =>
      f.classList.contains("blown")
    );

    if (allBlown) {
      triggerConfetti();
    }
  });
});

const roseImages = [
  "images/redrose.png",
  "images/pinkrose.png",
  "images/lightpinkrose.png"
];

function createPetal() {

  const petal = document.createElement("img");
  petal.classList.add("petal");

  // pick random rose
  const randomIndex = Math.floor(Math.random() * roseImages.length);
  petal.src = roseImages[randomIndex];

  petal.style.left = Math.random() * 100 + "vw";

  const size = 20 + Math.random() * 25;
  petal.style.width = size + "px";

  const duration = 8 + Math.random() * 6;
  petal.style.animationDuration = duration + "s";

  document.body.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, duration * 1000);
}

setInterval(() => {
  if (!document.body.classList.contains("party")) {
    createPetal();
  }
}, 800);

const ringsWrapper = document.querySelector(".rings-wrapper");

if (ringsWrapper) {
  ringsWrapper.addEventListener("click", function (e) {
    ringsWrapper.classList.toggle("active");

    if (ringsWrapper.classList.contains("active")) {
      const diamonds = document.querySelectorAll(".diamond");

      diamonds.forEach(diamond => {
        const rect = diamond.getBoundingClientRect();

        for (let i = 0; i < 8; i++) {
          const offsetX = Math.random() * 30 - 15;
          const offsetY = Math.random() * 30 - 15;

          createSparkle(
            rect.left + rect.width / 2 + offsetX,
            rect.top + rect.height / 2 + offsetY
          );
        }
      });
    }
  });
}

function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");

  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 1200);
}

const text = document.querySelector(".rings-text");

if (text) {
  const rect = text.getBoundingClientRect();

  for (let i = 0; i < 6; i++) {
    const offsetX = Math.random() * rect.width;
    const offsetY = Math.random() * rect.height;

    createSparkle(
      rect.left + offsetX,
      rect.top + offsetY
    );
  }
}

const golfWrapper = document.querySelector(".golf-wrapper");

if (golfWrapper) {
  golfWrapper.addEventListener("click", function () {

    if (!golfWrapper.classList.contains("active")) {
      golfWrapper.classList.add("active");

      // simulate ball sinking
      setTimeout(() => {
        document.querySelector(".golf-ball").style.opacity = "0";
      }, 1000);
    }

  });
}

});