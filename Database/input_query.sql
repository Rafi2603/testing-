INSERT INTO rekap_data_k3 
(
    bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops, jumlah_jam_kerja, 
    kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops, kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, 
    kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops, fire_accident_ops, fire_accident_non_ops, damaged_property_ops, damaged_property_non_ops, 
    jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops, jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops
) 
VALUES 
(
    'February', 
    115, 
    75,  
    20,  
    19,  
    1600, 
    1,   
    0,   
    1,   
    2,   
    0,   
    1,   
    2,   
    1,   
    0,   
    0,   
    1,   
    0,   
    1,   
    1,   
    21,  
    17,  
    90,  
    70,  
    1500, 
    1300  
);

INSERT INTO kecelakaan_kerja_jagorawi 
(Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS) 
VALUES 
('2023-09-15', '1234567890', 'Pekerja 1', 'Supervisor', 'JAGORAWI', 'Kecelakaan terjadi saat bekerja di lapangan.', 'Ringan', 'Memberikan istirahat selama 2 hari', '2023-09-16');
