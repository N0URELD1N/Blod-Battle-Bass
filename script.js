const xpFromFile = 0; // ← عدّل هذه القيمة لإعطاء XP

const rewards = [
  { level: 1, free: "Select Place 📍", premium: null },
  { level: 2, free: "Max Members 12 🧍‍♂️", premium: null },
  { level: 3, free: null, premium: "Spray" },
  { level: 4, free: "Heavy Armor x10 🛡️", premium: null },
  { level: 5, free: "Max Members 14 🧍‍♂️", premium: "Jewelry Robbery Items" },
  { level: 6, free: "Spray", premium: null },
  { level: 7, free: null, premium: "Heavy Pistol x1" },
  { level: 8, free: "DivingKit x2", premium: "MedKit x2" },
  { level: 9, free: null, premium: "0115 Bay City Avenue APT 45 🏠" },
  { level: 10, free: "RepareKit x2", premium: null },
  { level: 11, free: "Pistol 50 x1", premium: "Karin Sultan Clas 🚘" },
  { level: 12, free: "Max Members 16 🧍‍♂️", premium: "Spray" },
  { level: 13, free: "7000$", premium: null },
  { level: 14, free: "Max Members 18 🧍‍♂️", premium: null },
  { level: 15, free: "Spray", premium: "Pistol MkII x1" },
];

function getLevel(xp) {
  return Math.floor(xp / 500) + 1;
}

function updateUI() {
  const xp = parseInt(localStorage.getItem("xp")) || xpFromFile;
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
      content += `<div class="free">🎁 ${reward.free}</div>`;
    }

    if (reward.premium) {
      content += `<div class="premium">💎 ${reward.premium}</div>`;
    }

    box.innerHTML = content;
    container.appendChild(box);
  });
}

// عند تحميل الصفحة → اظهر الـ dashboard مباشرة مع الفلات
window.onload = () => {
  document.getElementById("dashboard").style.display = "block";
  updateUI();
};
