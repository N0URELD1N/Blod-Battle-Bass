
const xpFromFile = 0; // ← عدّل هذه القيمة لإعطاء XP

const rewards = [
{ level: 1, free: "Select Place 📍", premium: null },

  { level: 2, free: "Max Members 12 🧍‍♂️", premium: null },

  { level: 3, free: "", premium: "Spray " },

  { level: 4, free: "Heavy Armor x10 🛡️", premium: null },

  { level: 5, free: "Max Members 14 🧍‍♂️", premium: "Jewelry Robbery Items" },

  { level: 6, free: "spray ", premium: null },

  { level: 7, free: null, premium: " Heavy Pistol x1" },

  { level: 8, free: "DivingKit x2", premium: "MedKit x2" },

  { level: 9, free: null, premium: "0115 Bay City Avenue APT 45 🏠" },

  { level: 10, free: "RepareKit x2", premium: null },

  { level: 11, free: "Pistol 50 x1", premium: "Karin Sultan Clas 🚘" },

  { level: 12, free: "Max Members 16 🧍‍♂️", premium: "Spray" },

  { level: 13, free: "7000$", premium: null },

  { level: 14, free: "Max Members 18 🧍‍♂️", premium: null },

  { level: 15, free: "Spray", premium: "Pistol MkII x1" },
  // أضف المزيد كما تريد
];



function showDashboard() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  updateUI();
}

function getLevel(xp) {
  return Math.floor(xp / 500) + 1;
}

function updateUI() {
  const xp = parseInt(localStorage.getItem("xp")) || 0;
  const level = getLevel(xp);
  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;

  const container = document.getElementById("battlePass");
  container.innerHTML = "";

  rewards.forEach(reward => {
    const box = document.createElement("div");
    box.classList.add("level-box");
    if (reward.level === level) box.classList.add("current");

    let content = `<h4>Level ${reward.level}</h4>`;

    if (reward.free) {
      content += `<div class="free"> ${reward.free}</div>`;
    }

    if (reward.premium) {
      content += `<div class="premium">💎 ${reward.premium}</div>`;
    }

    box.innerHTML = content;
    container.appendChild(box);
  });
}

window.onload = () => {
  if (localStorage.getItem("scrapCode")) {
    localStorage.setItem("xp", xpFromFile); // ← تحديث XP دائمًا من الملف
    showDashboard();
  }
};





// TNT :

document.addEventListener('DOMContentLoaded', () => {
  const explosionSound = document.getElementById('explosionSound');
  const body = document.body;
  const effectsContainer = document.getElementById('effectsContainer');

  function shakeScreen() {
    body.classList.add('shake');
    setTimeout(() => {
      body.classList.remove('shake');
    }, 500);
  }

  function createSmoke(x, y) {
    const smoke = document.createElement('div');
    smoke.className = 'smoke';
    smoke.style.left = x + 'px';
    smoke.style.top = y + 'px';
    effectsContainer.appendChild(smoke);
    setTimeout(() => smoke.remove(), 2000);
  }

  function createSpark(x, y) {
    for (let i = 0; i < 10; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      spark.style.left = x + 'px';
      spark.style.top = y + 'px';
      effectsContainer.appendChild(spark);

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 100;

      spark.animate([
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`, opacity: 0 }
      ], {
        duration: 800 + Math.random() * 400,
        easing: 'ease-out',
        fill: 'forwards'
      });

      setTimeout(() => spark.remove(), 1000);
    }
  }

  function explodePage() {
    explosionSound.currentTime = 0;
    explosionSound.play();
    shakeScreen();

    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, button, a');
    elements.forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      for (let char of text) {
        if (char.trim() === '') {
          el.appendChild(document.createTextNode(' '));
          continue;
        }
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = char;
        const rect = el.getBoundingClientRect();
        const offsetX = Math.random() * rect.width;
        const offsetY = Math.random() * rect.height;
        particle.style.left = (rect.left + offsetX) + 'px';
        particle.style.top = (rect.top + offsetY) + 'px';
        document.body.appendChild(particle);
      }
      el.style.visibility = 'hidden';
    });

    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = 200 + Math.random() * 300;
      const x = parseFloat(particle.style.left);
      const y = parseFloat(particle.style.top);

      createSmoke(x, y);
      createSpark(x, y);

      particle.animate([
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: 1800,
        easing: 'ease-out',
        fill: 'forwards'
      });

      setTimeout(() => particle.remove(), 1800);
    });
  }

  const btn = document.getElementById('explodeBtn');
  if (btn) {
    btn.addEventListener('click', explodePage);
  }
});
