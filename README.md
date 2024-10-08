# Dashboard Monitoring K3

**Dashboard Monitoring K3** adalah aplikasi berbasis web yang digunakan untuk mengelola dan memonitor data keselamatan kerja (K3). Aplikasi ini memiliki fitur untuk menampilkan data dalam bentuk tabel, menambah data baru, serta mengekspor tabel ke dalam format PDF.

## Fitur Utama

1. **Menampilkan Tabel Rekap Data K3**: 
   - Data K3 ditampilkan dalam tabel interaktif dengan fitur sorting dan searching menggunakan **DataTables**.
   - Ekspor tabel ke file PDF menggunakan **jsPDF** dan **autoTable**.

2. **Menambah Data K3**:
   - Halaman input untuk menambah data baru dengan form yang sudah disesuaikan.
   - Fitur dropdown untuk input bulan.

3. **Ekspor PDF**:
   - Tombol untuk mengekspor tabel K3 menjadi file PDF.

## Teknologi yang Digunakan

- **Node.js**: Backend server.
- **Express.js**: Framework untuk membangun API dan routing.
- **PostgreSQL**: Database untuk menyimpan data rekap K3.
- **Bootstrap 5**: Untuk styling halaman web.
- **DataTables**: Menyediakan fitur sorting dan searching pada tabel.
- **jsPDF** dan **autoTable**: Untuk mengekspor tabel menjadi file PDF.

## Struktur Folder

```plaintext
├── Backend/
│   ├── index.js        # File utama backend
│   └── db.js           # Koneksi dan query ke PostgreSQL
├── public/
│   ├── index.html      # Halaman utama untuk menampilkan tabel rekap K3
│   ├── add-data.html   # Halaman untuk menambahkan data baru
│   ├── script.js       # JavaScript frontend
│   └── style.css       # CSS tambahan
└── README.md           # Dokumentasi project
```

## Instalasi
1. **Clone repository ini:**: 
git clone https://github.com/username/repository-name.git

2. **Masuk ke direktori project:**
cd repository-name

3. **Install dependencies:**
npm install

4. **Siapkan file .env untuk konfigurasi koneksi ke PostgreSQL:**
- DB_USER=your_database_user,
- DB_PASSWORD=your_database_password,
- DB_HOST=your_database_host,
- DB_PORT=your_database_port,
- DB_NAME=your_database_name

5. **Jalankan server:**
node Backend/index.js

6. **Akses aplikasi di browser:**
http://localhost:3000



