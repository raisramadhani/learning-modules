# Ringkasan Materi OOP Java (Week 1–7)

## Week 1: Class & Object

- **Pemrograman Berorientasi Objek (OOP)** adalah paradigma pemrograman yang berbasis pada konsep "objek" yang merepresentasikan entitas dunia nyata.
- **Class** adalah blueprint/template untuk membuat objek; berisi atribut (variabel) dan perilaku (metode).
- **Object** adalah instance dari suatu class yang menyimpan data dan dapat memanggil metode.
- **Constructor** adalah metode khusus yang dipanggil saat objek dibuat; namanya sama dengan nama class dan tidak memiliki tipe return.
- **Memory Allocation**:
  - **Heap**: Menyimpan objek yang dibuat dengan `new`.
  - **Stack**: Menyimpan referensi ke objek dan variabel lokal.
  - **Garbage Collection**: Java mengelola memori secara otomatis; objek yang tidak lagi digunakan akan dihapus.

## Week 2: Java Variables & Data Types

- **Variabel** adalah lokasi memori bernama yang menyimpan nilai dan bisa berubah selama eksekusi program.
- **Deklarasi variabel**: `tipeData namaVariabel = nilai;`
- **Jenis Data**:
  - **Primitif**: `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`.
  - **Non-primitif (Reference)**: `String`, `Integer`, array, dan objek class lainnya.
- **Autoboxing**: Konversi otomatis dari tipe primitif ke wrapper class (misal: `int` → `Integer`).
- **Unboxing**: Konversi otomatis dari wrapper class ke tipe primitif (misal: `Integer` → `int`).
- **Aturan Penamaan Variabel**:
  - Dimulai dengan huruf kecil, boleh mengandung angka, `_`, `$`.
  - Tidak boleh mengandung spasi atau kata kunci Java.
  - Bersifat case-sensitive.
- **Jenis Variabel Berdasarkan Cakupan (Scope)**:
  - **Local**: Dideklarasikan dalam metode/blok; harus diinisialisasi sebelum digunakan.
  - **Instance**: Dideklarasikan di luar metode tapi di dalam class; memiliki nilai default.
  - **Static (Class Variable)**: Milik class, bukan objek; hanya ada satu salinan per class.

## Week 3: Java Variables & Data Types (Penguatan)

_(Catatan: Materi Week 3 identik dengan Week 2 — fokus pada pemahaman mendalam variabel dan tipe data di Java.)_

- Penekanan pada perbedaan antara tipe primitif dan referensi.
- Pemahaman tentang nilai default untuk instance/static variable.
- Contoh deklarasi dan inisialisasi variabel tunggal/multipel.

## Week 4: Inheritance

- **Inheritance (Pewarisan)** memungkinkan class baru (subclass/anak) mewarisi atribut dan metode dari class yang sudah ada (superclass/induk).
- Tujuan: **Reuse kode**, **ekstensibilitas**, dan **relasi hierarkis**.
- Kata kunci: `extends`.
- **Method Overriding**: Subclass memberikan implementasi baru untuk metode yang sudah ada di superclass.
  - Syarat: nama, tipe return, dan parameter sama.
  - Tidak bisa meng-override method `final`, `static`, atau `private`.
- **Keyword `super`**:
  - Digunakan untuk mengakses metode atau konstruktor dari superclass.
  - Contoh: `super.methodName()` atau `super()` di awal konstruktor.
- **Jenis Pewarisan**:
  - **Single**: Satu anak dari satu induk.
  - **Multilevel**: A → B → C.
  - **Hierarchical**: Banyak anak dari satu induk.
  - **Multiple**: Tidak didukung untuk class di Java, tapi bisa melalui **interface**.

## Week 5: Encapsulation

_(Catatan: Berdasarkan dokumen, file “Week5 - Encapsulation.pdf” sebenarnya berisi materi “Java Variables & Data Types”. Namun, dalam konteks OOP, enkapsulasi tetap dikaitkan sebagai prinsip penting.)_

- **Enkapsulasi** adalah prinsip OOP untuk menyembunyikan detail internal objek dan hanya mengekspos antarmuka publik.
- Dalam Java, diimplementasikan menggunakan **modifier akses** (`private`, `protected`, `public`).
- Atribut biasanya dibuat `private`, dan diakses/melalui metode `public` seperti **getter** dan **setter**.
- Tujuan: meningkatkan keamanan data, fleksibilitas, dan kontrol akses.

## Week 6: Polymorphism

- **Polymorphism** berarti “banyak bentuk”; memungkinkan objek diperlakukan sebagai instance dari superclass-nya.
- Dua jenis:
  1. **Runtime Polymorphism (Dynamic Binding)**:
     - Dicapai melalui **method overriding**.
     - Resolusi metode terjadi saat runtime.
     - Menggunakan **upcasting**: `SuperClass obj = new SubClass();`
  2. **Compile-time Polymorphism (Static Binding)**:
     - Dicapai melalui **method overloading**.
     - Nama metode sama, tapi berbeda parameter (jumlah/tipe).
     - Resolusi terjadi saat kompilasi.
- **Catatan**: Java **tidak mendukung operator overloading** (berbeda dengan C++).

## Week 7: Abstraction

- **Abstraksi** adalah konsep menyembunyikan detail implementasi kompleks dan hanya menampilkan fitur esensial dari objek.
- Tujuan: menyederhanakan penggunaan, meningkatkan maintainability, dan memisahkan **apa yang dilakukan** dari **bagaimana melakukannya**.
- Dalam Java, abstraksi diwujudkan melalui:
  1. **Abstract Class**:
     - Tidak bisa diinstansiasi (`new`).
     - Bisa berisi **metode abstrak** (tanpa body) dan **metode konkret** (dengan body).
     - Harus di-`extends` oleh subclass; subclass wajib mengimplementasikan semua metode abstrak.
  2. **Interface**:
     - Seperti class abstrak penuh (sebelum Java 8).
     - Semua metode bersifat `public abstract` secara default.
     - Atribut bersifat `public static final`.
     - Mendukung **multiple inheritance** (class bisa `implements` banyak interface).
     - Mulai Java 8, interface bisa memiliki **default method** dan **static method**.
- **Kapan Menggunakan**:
  - Saat ingin menyediakan template umum dengan variasi implementasi.
  - Saat ingin memisahkan definisi dari implementasi.
  - Saat membutuhkan multiple inheritance secara konseptual.

---

_Disusun berdasarkan materi OOP Java dari Week 1 hingga Week 7._
