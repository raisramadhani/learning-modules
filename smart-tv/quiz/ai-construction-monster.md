# AI Construction: Project Quiz Monster (Boss Battle Mode)

**Filename:** `ai-construction-monster.md`
**Type:** Technical Specification & Implementation Guide
**Target Stack:** HTML5, Tailwind CSS, Vanilla JS (GitHub Pages Compatible)
**Version:** 1.0.0
**Author:** User & Gemini Assistant

---

## 1. Overview & Objective

Mengubah mekanisme permainan dari **"Competitive Race"** (siapa cepat dia sampai) menjadi **"Cooperative Boss Battle"** (bersama-sama mengalahkan musuh).

### Perubahan Paradigma Gameplay

| Fitur             | Mode Lama (Race)            | Mode Baru (Monster Battle)             |
| :---------------- | :-------------------------- | :------------------------------------- |
| **Tujuan**        | Mencapai poin 10 duluan     | Mengurangi HP Monster dari 100 ke 0    |
| **Posisi Player** | Bergerak dari kiri ke kanan | Diam di posisi bawah (statis)          |
| **Aksi Benar**    | Maju 1 langkah              | Menembakkan proyektil ke Boss (Damage) |
| **Aksi Salah**    | Diam / Mundur               | Terkena serangan balik / Stun          |
| **Kemenangan**    | Individual (Juara 1, 2, 3)  | Kolektif (Menang atau Kalah bersama)   |

---

## 2. Layout Architecture (UI/UX)

Karena tidak lagi balapan horizontal, layout layar dibagi menjadi dua area vertikal utama.

### A. The Arena (Top 60%)

Area visual utama tempat pertarungan terjadi.

- **Center Top:** Posisi "Monster" (Boss). Menggunakan CSS Shape atau Emoji besar (misal: 👾, 🐉, 🤖).
- **Top Bar:** Boss HP Bar (besar dan lebar).
- **Center Screen:** Area kosong untuk lintasan peluru/proyektil.

### B. The Player Base (Bottom 40%)

Area tempat tim berpijak.

- Terbagi menjadi 4 kolom (Grid) untuk masing-masing tim (Merah, Biru, Hijau, Kuning).
- Setiap kolom berisi:
  - Avatar Tim (Tank/Pesawat/Penyihir).
  - Statistik Tim (Total Damage Dealt).
  - Status Effect (misal: "Frozen" jika salah jawab).

---

## 3. Core Mechanics & Logic

### 3.1. Data Structure (State Management)

Simpan state game dalam objek JavaScript sederhana.

```javascript
const gameState = {
  boss: {
    maxHp: 100,
    currentHp: 100,
    state: "idle", // idle, hit, attack, dead
  },
  players: [
    { id: "red", name: "Tim Merah", damage: 0, isStunned: false },
    { id: "blue", name: "Tim Biru", damage: 0, isStunned: false },
    { id: "green", name: "Tim Hijau", damage: 0, isStunned: false },
    { id: "yellow", name: "Tim Kuning", damage: 0, isStunned: false },
  ],
  config: {
    damagePerHit: 5, // Berapa HP berkurang per jawaban benar
    critChance: 0.1, // 10% peluang damage ganda
  },
};
```

3.2. Projectile Logic (Tanpa Canvas)
Menggunakan manipulasi DOM dan CSS Transition (seperti dibahas sebelumnya).

Trigger: Saat jawaban benar terdeteksi.

Origin: Koordinat div Tim (Bawah).

Destination: Koordinat div Monster (Atas).

Action:

Create elemen div (peluru).

Animate gerakan.

OnFinish: Update HP Bar Boss + Animasi "Getar" pada Boss.

3.3. Boss AI (Sederhana)
Agar monster terasa "hidup" tanpa script backend:

Passive Animation: CSS Keyframes float (naik turun perlahan).

Reaction: Jika HP < 50%, ubah warna monster (filter CSS hue-rotate) menjadi merah/marah.

Random Taunt: Setiap 10 detik, tampilkan bubble chat di dekat monster ("Kalian lemah!", "Cuma segitu?").

4. Technical Implementation Steps
   Step 1: HTML Structure (Tailwind)
   Ganti struktur table atau flex-row lama dengan struktur vertikal ini.

HTML

<div class="h-screen w-full bg-gray-900 flex flex-col overflow-hidden relative">
    
    <div class="flex-1 flex flex-col items-center justify-center relative">
        <div class="w-1/2 h-8 bg-gray-700 rounded-full border-2 border-white mb-4 overflow-hidden relative">
            <div id="boss-hp-bar" class="h-full bg-red-600 transition-all duration-500" style="width: 100%"></div>
        </div>
        
        <div id="boss-avatar" class="text-[150px] animate-float transition-transform duration-200 cursor-pointer filter drop-shadow-[0_0_30px_rgba(255,0,0,0.5)]">
            👾
        </div>
        
        <div id="boss-chat" class="absolute top-20 right-20 bg-white text-black p-4 rounded-xl rounded-bl-none hidden">
            Rasakan ini!
        </div>
    </div>

    <div class="h-48 grid grid-cols-4 gap-4 p-4 bg-gray-800 border-t-4 border-gray-700 z-10">
        <div id="p1" class="flex flex-col items-center justify-end relative">
            <div class="text-4xl mb-2">🚀</div> <div class="font-bold text-red-400">TEAM MERAH</div>
            <div class="text-xs text-gray-400">Dmg: <span id="p1-score">0</span></div>
        </div>
        </div>

</div>
Step 2: CSS Animations (Style Tag)
Tambahkan di <head> untuk efek visual tanpa aset eksternal.

CSS
/_ Monster Floating Idle _/
@keyframes float {
0%, 100% { transform: translateY(0px); }
50% { transform: translateY(-20px); }
}
.animate-float {
animation: float 3s ease-in-out infinite;
}

/_ Efek Kena Hit (Flash Putih) _/
.hit-effect {
filter: brightness(10) !important;
transform: scale(0.9) !important;
}

/_ Efek Layar Getar (Boss Mati/Critical) _/
.screen-shake {
animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
Step 3: JS Controller Functions
JavaScript
function attackBoss(teamId) {
// 1. Logika Data
const dmg = gameState.config.damagePerHit;
gameState.boss.currentHp -= dmg;

    // Update Score Tim
    const player = gameState.players.find(p => p.id === teamId);
    player.damage += dmg;
    document.getElementById(`${teamId}-score`).innerText = player.damage;

    // 2. Visual: Tembakkan Peluru
    fireProjectile(teamId, 'boss-avatar', () => {
        // Callback saat peluru kena boss:
        updateBossVisuals();
    });

}

function updateBossVisuals() {
const bossElem = document.getElementById('boss-avatar');
const hpBar = document.getElementById('boss-hp-bar');

    // Hitung Persentase HP
    const pct = (gameState.boss.currentHp / gameState.boss.maxHp) * 100;
    hpBar.style.width = `${pct}%`;

    // Efek Kena Hit
    bossElem.classList.add('hit-effect');
    setTimeout(() => bossElem.classList.remove('hit-effect'), 100);

    // Cek Win Condition
    if (gameState.boss.currentHp <= 0) {
        triggerWin();
    } else if (gameState.boss.currentHp < 30) {
        // Fase Marah (Boss berkedip cepat / Warna berubah)
        bossElem.innerText = '👹'; // Ganti wajah
    }

} 5. Rekomendasi Fitur Tambahan (Optional)
Combo Multiplier: Jika satu tim menjawab benar 3x berturut-turut, peluru mereka menjadi lebih besar (Damage x2).

Monster Counter-Attack: Jika jawaban salah, jalankan fungsi monsterAttack(teamId).

Visual: Bola api keluar dari Boss ke arah Player.

Efek: Player terkena class grayscale dan tidak bisa menjawab selama 3 detik (Stun).

Sound Effects (Synthesized): Karena menghindari aset file MP3, gunakan Web Audio API sederhana (Beep/Noise) yang digenerate browser saat menembak.

6. Action Items
   [ ] Backup file index.html saat ini.

[ ] Buat file baru monster-mode.html.

[ ] Copy struktur HTML Layout di atas.

[ ] Integrasikan logika fetching soal dari Spreadsheet yang sudah ada agar men-trigger fungsi attackBoss() saat jawaban benar.

[ ] Implementasikan fungsi fireProjectile (dari chat sebelumnya).
