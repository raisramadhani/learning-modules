public class Mahasiswa {
    // 1. Data disembunyikan (private)
    private String nama;
    private int umur;

    // 2. Getter: membaca data
    public String getNama() {
        return nama;
    }

    public int getUmur() {
        return umur;
    }

    // 3. Setter: mengatur data dengan validasi
    public void setNama(String nama) {
        if (nama != null && !nama.trim().isEmpty()) {
            this.nama = nama;
        } else {
            System.out.println("Nama tidak boleh kosong!");
        }
    }

    public void setUmur(int umur) {
        if (umur >= 0 && umur <= 150) {
            this.umur = umur;
        } else {
            System.out.println("Umur harus antara 0–150!");
        }
    }
}