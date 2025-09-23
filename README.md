# Learning Modules 📚

Koleksi modul pembelajaran interaktif untuk meningkatkan kemampuan programming dan teknologi.

## 🚀 Demo

Lihat halaman utama: [Learning Modules](https://raisramadhani.github.io/learning-modules/)

## 📦 Modul Tersedia

### 1. Mengenal Penulisan Case 📝

- **Kategori**: Fundamental
- **Level**: Pemula
- **Deskripsi**: Pelajari berbagai jenis penulisan case dalam programming
- **Link**: [mengenal-penulisan-case/](./mengenal-penulisan-case/)

### 2. AI Coding Prompt Generator 🤖

- **Kategori**: AI Tools
- **Level**: Menengah
- **Deskripsi**: Tools untuk membuat prompt AI coding yang efektif
- **Link**: [prompting-ai-coding/](./prompting-ai-coding/)

## 🛠️ Fitur

- ✅ **Auto-Detection**: Otomatis mendeteksi modul yang tersedia
- ✅ **Responsive Design**: Tampil sempurna di semua perangkat
- ✅ **Interactive UI**: Antarmuka yang menarik dan mudah digunakan
- ✅ **Status Monitoring**: Memantau ketersediaan setiap modul
- ✅ **GitHub Pages Ready**: Siap deploy di GitHub Pages

## 🏗️ Struktur Direktori

```
learning-modules/
├── index.html                 # Halaman utama (auto-generated)
├── README.md                  # Dokumentasi
├── mengenal-penulisan-case/   # Modul 1
│   └── index.html
├── prompting-ai-coding/       # Modul 2
│   └── index.html
└── [modul-baru]/             # Modul tambahan
    └── index.html
```

## 📝 Cara Menambah Modul Baru

1. **Buat direktori baru** dengan nama yang deskriptif menggunakan kebab-case:

   ```
   nama-modul-baru/
   ```

2. **Buat file `index.html`** di dalam direktori tersebut

3. **Update konfigurasi** di `index.html` root (opsional):

   ```javascript
   const knownModules = {
     "nama-modul-baru": {
       title: "Nama Modul Baru",
       description: "Deskripsi modul",
       icon: "🎯",
       category: "Kategori",
       difficulty: "Level",
     },
   };
   ```

4. **Tambahkan ke moduleList**:
   ```javascript
   const moduleList = [
     "mengenal-penulisan-case",
     "prompting-ai-coding",
     "nama-modul-baru",
   ];
   ```

## 🎨 Kustomisasi

### Ikon Otomatis

Sistem akan otomatis memberikan ikon berdasarkan kata kunci dalam nama direktori:

- `case` → 📝
- `ai`, `prompt` → 🤖
- `web` → 🌐
- `javascript` → ⚡
- `python` → 🐍
- `react` → ⚛️
- dll.

### Kategori Otomatis

Kategori juga ditentukan otomatis berdasarkan nama direktori:

- `case` → Fundamental
- `ai`, `prompt` → AI Tools
- `web` → Web Development
- `javascript`, `python` → Programming
- dll.

## 🚀 Deployment

### GitHub Pages

1. Push semua file ke repository GitHub
2. Aktifkan GitHub Pages di Settings → Pages
3. Pilih source: Deploy from a branch → main
4. Akses melalui: `https://username.github.io/repository-name/`

### Local Development

```bash
# Jika menggunakan Python
python -m http.server 8000

# Jika menggunakan Node.js
npx serve .

# Akses: http://localhost:8000
```

## 🔧 Teknologi

- **HTML5** - Struktur dasar
- **CSS3** - Styling dengan animasi
- **JavaScript ES6+** - Interaktivitas dan auto-detection
- **Tailwind CSS** - Framework CSS
- **GitHub Pages** - Hosting

## 📱 Responsive Design

Halaman dirancang responsif dan akan tampil sempurna di:

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch baru: `git checkout -b feature/modul-baru`
3. Tambahkan modul pembelajaran baru
4. Commit changes: `git commit -m 'Menambah modul baru'`
5. Push ke branch: `git push origin feature/modul-baru`
6. Buat Pull Request

## 📄 Lisensi

Project ini bersifat open source dan dapat digunakan untuk pembelajaran.

---

**Happy Learning! 🎓✨**
