const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./configs/db.configs.js');
const path = require('path');
const cors = require('cors');
// Middleware (session)

app.use(cors({
    origin: 'https://jmto-k3-dashboard.vercel.app' // or '*' for all origins
}));

app.use(
    session({
        secret: 'ini contoh secret',
        saveUninitialized: false,
        resave: false
    })
);
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(express.static('public'));

// Route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Routing TABEL REKAP DATA K3
// Menampilkan seluruh data dari Tabel
router.get('/getdata', (req, res) => {
    db.query('SELECT * FROM rekap_data_k3', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


// Menampilkan seluruh data dari Tabel Jagorawi
router.get('/getdatajagorawi', (req, res) => {
    db.query('SELECT * FROM rekap_data_k3_jagorawi', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


// Menampilkan seluruh data dari Tabel Cipularang
router.get('/getdatacipularang', (req, res) => {
    db.query('SELECT * FROM rekap_data_k3_cipularang', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


// Menampilkan seluruh personel dari Tabel Jagorawi
router.get('/getpersoneljagorawi', (req, res) => {
    db.query('SELECT * FROM personel_k3_jagorawi', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


// Menampilkan seluruh personel dari Tabel Cipularang
router.get('/getpersonelcipularang', (req, res) => {
    db.query('SELECT * FROM personel_k3_cipularang', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


// Menampilkan seluruh kecelakaan dari Tabel Jagorawi
router.get('/getkecelakaanjagorawi', (req, res) => {
    db.query('SELECT * FROM kecelakaan_kerja_jagorawi', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});


// Menampilkan seluruh kecelakaan dari Tabel Jagorawi
// router.get('/getkejadianjagorawi', (req, res) => {
//     db.query('SELECT * FROM kejadian_darurat_jagorawi', (err, results) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         res.json({ message: 'Data Found', showItems: results.rows });
//     });
// });



// Assuming you're using Express and pg for PostgreSQL
router.get('/getkejadianjagorawi', (req, res) => {
    const query = 'SELECT * FROM kejadian_darurat_jagorawi';
    db.query(query)
        .then(result => {
            const showItems = result.rows.map(row => {
                // Convert BYTEA to Base64
                const evidenceBase64 = row.evidence ? Buffer.from(row.evidence).toString('base64') : null;

                return {
                    ...row,
                    evidence: evidenceBase64 // Set the encoded image
                };
            });

            res.status(200).json({ message: 'Data Found', showItems });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Error fetching data' });
        });
});



router.get('/getstrukturjagorawi', (req, res) => {
    db.query('SELECT * FROM struktur_organisasi_jagorawi ORDER BY jabatan', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});

router.get('/getchecklistjagorawi', (req, res) => {
    db.query('SELECT * FROM checklist_k3_jagorawi', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});



// Menampilkan seluruh kecelakaan dari Tabel Cipularang
router.get('/getkecelakaancipularang', (req, res) => {
    db.query('SELECT * FROM personel_k3_cipularang', (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Data Found', showItems: results.rows });
    });
});



// Routing TABEL REKAP DATA K3
// Menambahkan data baru ke dalam Tabel Jagorawi
// Route untuk menambahkan data
// Menambahkan data baru ke dalam Tabel Jagorawi
router.post('/adddatajagorawi', (req, res) => {
    const {
        tahun,
        bulan,
        jumlah_karyawan_ops,
        jumlah_karyawan_non_ops,
        jumlah_hari_kerja_ops,
        jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja,
        kecelakaan_berat_ops,
        kecelakaan_berat_non_ops,
        kecelakaan_ringan_ops,
        kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops,
        kecelakaan_meninggal_non_ops,
        kecelakaan_near_miss_ops,
        kecelakaan_near_miss_non_ops,
        fire_accident,
        damaged_property,
        jumlah_hari_hilang_ops,
        jumlah_hari_hilang_non_ops,
        jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops,
        lti_ops,
        lti_non_ops,
        man_hour_ops,
        man_hour_non_ops
    } = req.body;

    const query = `
        INSERT INTO rekap_data_k3_jagorawi (
                tahun, bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
                jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
                kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
                fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
                jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
    `;
    const values = [
        tahun, bulan, jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
        fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Database Error' });
            return;
        }
        res.json({ message: 'Success' }); // Pastikan 'Success' ini dikirim
    });
    
});


// Menambahkan kecelakaan baru ke dalam Tabel Jagorawi
router.post('/addkecelakaanjagorawi', (req, res) => {
    const { Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS } = req.body;

    // Query untuk insert data
    const query = `
        INSERT INTO kecelakaan_kerja_jagorawi 
        (Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    // Eksekusi query dengan parameter dari request body
    db.query(query, [Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS])
        .then(() => {
            res.status(200).json({ message: 'Success' });
        })
        .catch((error) => {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'Error inserting data' });
        });
});


// Menambahkan personel baru ke dalam Tabel Jagorawi
router.post('/addpersoneljagorawi', (req, res) => {
    const { nama, role_personel_k3, batas_masa_berlaku } = req.body;
    
    // Query untuk memasukkan data ke dalam tabel personel_k3_jagorawi
    const query = `
        INSERT INTO personel_k3_jagorawi (nama, role_personel_k3, batas_masa_berlaku) 
        VALUES ($1, $2, $3) 
    `;

    // Eksekusi query dengan parameter dari request body
    db.query(query, [nama, role_personel_k3, batas_masa_berlaku])
        .then(() => {
            res.status(200).json({ message: 'Success' });
        })
        .catch((error) => {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'Error inserting data' });
        });
});


// Menambahkan personel baru ke dalam Tabel Jagorawi
router.post('/addkejadianjagorawi', (req, res) => {
    const { kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence } = req.body;
    
    // Query untuk memasukkan data ke dalam tabel personel_k3_jagorawi
    const query = `
        INSERT INTO kejadian_darurat_jagorawi (kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence) 
            VALUES ($1, $2, $3, $4, $5)
    `;

    // Eksekusi query dengan parameter dari request body
    db.query(query, [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence])
        .then(() => {
            res.status(200).json({ message: 'Success' });
        })
        .catch((error) => {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'Error inserting data' });
        });
});


// Menambahkan personel baru ke dalam Tabel Jagorawi
router.post('/addchecklistjagorawi', (req, res) => {
    const { 
        section,
        indikator_k3,
        jumlah_item,
        expired_date,
        check_list_Pemeriksaan,
        rambu_apar,
        kelengkapan_box_hydrant,
        ruang_laktasi,
        ruang_p3k,
        organik,
        non_organik,
        limbah_b3,
        smoking_area,
        dll
    } = req.body;
    
    // Query untuk memasukkan data ke dalam tabel personel_k3_jagorawi
    const query = `
            INSERT INTO checklist_k3_jagorawi (
            section, indikator_k3, jumlah_item, expired_date, 
            check_list_Pemeriksaan, rambu_apar, kelengkapan_box_hydrant, 
            ruang_laktasi, ruang_p3k, organik, non_organik, limbah_b3, 
            smoking_area, dll
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `;

    // Eksekusi query dengan parameter dari request body
    db.query(query, [
        section,
        indikator_k3,
        jumlah_item,
        expired_date,
        check_list_Pemeriksaan,
        rambu_apar,
        kelengkapan_box_hydrant,
        ruang_laktasi,
        ruang_p3k,
        organik,
        non_organik,
        limbah_b3,
        smoking_area,
        dll
    ])
        .then(() => {
            res.status(200).json({ message: 'Success' });
        })
        .catch((error) => {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'Error inserting data' });
        });
});


// Mengupdate data personel berdasarkan personel_k3_id
// Route untuk memperbarui data personel K3
router.put('/updatepersoneljagorawi', (req, res) => {
    const { personel_k3_id, nama, role_personel_k3, batas_masa_berlaku } = req.body;

    // Query untuk memperbarui data berdasarkan ID
    const query = `
        UPDATE personel_k3_jagorawi 
        SET nama = $1, role_personel_k3 = $2, batas_masa_berlaku = $3
        WHERE personel_k3_id = $4
    `;

    // Eksekusi query dengan parameter dari request body
    db.query(query, [nama, role_personel_k3, batas_masa_berlaku, personel_k3_id])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch((error) => {
            console.error('Error updating data:', error);
            res.status(500).json({ message: 'Error updating data' });
        });
});


// Route untuk memperbarui data kejadian K3
router.put('/updatekejadianjagorawi', (req, res) => {
    const { kejadian_darurat_id, kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence } = req.body;

    // Query untuk memperbarui data berdasarkan ID
    const query = `
        UPDATE kejadian_darurat_jagorawi 
             SET kejadian_darurat = $1, lokasi = $2, kronologi_kejadian = $3, tindak_lanjut = $4, evidence = $5
             WHERE kejadian_darurat_id = $6 
    `;

    // Eksekusi query dengan parameter dari request body
    db.query(query, [kejadian_darurat, lokasi, kronologi_kejadian, tindak_lanjut, evidence, kejadian_darurat_id])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch((error) => {
            console.error('Error updating data:', error);
            res.status(500).json({ message: 'Error updating data' });
        });
});

// Mengupdate data personel berdasarkan kecelakaan_kerja_id
// Route untuk memperbarui data kecelakaan
router.put('/updatekecelakaanjagorawi', (req, res) => {
    const { kecelakaan_kerja_id, Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS } = req.body;

    // Query untuk memperbarui data berdasarkan ID
    const query = `
        UPDATE kecelakaan_kerja_jagorawi 
        SET Tanggal = $1, NIK = $2, Nama = $3, Jabatan = $4, Ruas = $5, Kronologis = $6, 
        Kategori_Kecelakaan = $7, Tindak_Lanjut = $8, Perawatan_di_RS = $9
        WHERE kecelakaan_kerja_id = $10
    `;

    // Eksekusi query dengan parameter dari request body
    db.query(query, [Tanggal, NIK, Nama, Jabatan, Ruas, Kronologis, Kategori_Kecelakaan, Tindak_Lanjut, Perawatan_di_RS, kecelakaan_kerja_id])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch((error) => {
            console.error('Error updating data:', error);
            res.status(500).json({ message: 'Error updating data' });
        });
});


// Mengupdate data personel berdasarkan data rekap id
// Update rekap data k3 entry
router.put('/updaterekapdatajagorawi', (req, res) => {
    const {
        tahun,
        bulan,
        jumlah_karyawan_ops,
        jumlah_karyawan_non_ops,
        jumlah_hari_kerja_ops,
        jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja,
        kecelakaan_berat_ops,
        kecelakaan_berat_non_ops,
        kecelakaan_ringan_ops,
        kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops,
        kecelakaan_meninggal_non_ops,
        kecelakaan_near_miss_ops,
        kecelakaan_near_miss_non_ops,
        fire_accident,
        damaged_property,
        jumlah_hari_hilang_ops,
        jumlah_hari_hilang_non_ops,
        jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops,
        lti_ops,
        lti_non_ops,
        man_hour_ops,
        man_hour_non_ops
    } = req.body;

    // Calculate FR dynamically
    const fr = (
        (kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
        kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
        kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property) * 1000000
    ) / (man_hour_ops + man_hour_non_ops);

    const sr = (
        (jumlah_hari_hilang_ops + jumlah_hari_hilang_non_ops) * 1000000 / (man_hour_ops + man_hour_non_ops)
    )

    const ir = (
        ((kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
            kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
            kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property) / (jumlah_karyawan_ops + jumlah_karyawan_non_ops)) * 10000
    )

    const atlr = (
         (jumlah_hari_hilang_ops + jumlah_hari_hilang_non_ops) / (kecelakaan_berat_ops + kecelakaan_berat_non_ops + kecelakaan_ringan_ops +
            kecelakaan_ringan_non_ops + kecelakaan_meninggal_ops + kecelakaan_meninggal_non_ops +
            kecelakaan_near_miss_ops + kecelakaan_near_miss_non_ops + fire_accident + damaged_property)
    )

    const query = `
        UPDATE rekap_data_k3_jagorawi SET
            jumlah_karyawan_ops = $1, jumlah_karyawan_non_ops = $2, jumlah_hari_kerja_ops = $3, jumlah_hari_kerja_non_ops = $4,
            jumlah_jam_kerja = $5, kecelakaan_berat_ops = $6, kecelakaan_berat_non_ops = $7, kecelakaan_ringan_ops = $8, kecelakaan_ringan_non_ops = $9,
            kecelakaan_meninggal_ops = $10, kecelakaan_meninggal_non_ops = $11, kecelakaan_near_miss_ops = $12, kecelakaan_near_miss_non_ops = $13,
            fire_accident = $14, damaged_property = $15, jumlah_hari_hilang_ops = $16, jumlah_hari_hilang_non_ops = $17, jumlah_hari_tanpa_hilang_ops = $18,
            jumlah_hari_tanpa_hilang_non_ops = $19, lti_ops = $20, lti_non_ops = $21, man_hour_ops = $22, man_hour_non_ops = $23, fr = $24, sr = $25, ir = $26,
            atlr = $27
        WHERE tahun = $28 AND bulan = $29
    `;

    db.query(query, [
        jumlah_karyawan_ops, jumlah_karyawan_non_ops, jumlah_hari_kerja_ops, jumlah_hari_kerja_non_ops,
        jumlah_jam_kerja, kecelakaan_berat_ops, kecelakaan_berat_non_ops, kecelakaan_ringan_ops, kecelakaan_ringan_non_ops,
        kecelakaan_meninggal_ops, kecelakaan_meninggal_non_ops, kecelakaan_near_miss_ops, kecelakaan_near_miss_non_ops,
        fire_accident, damaged_property, jumlah_hari_hilang_ops, jumlah_hari_hilang_non_ops, jumlah_hari_tanpa_hilang_ops,
        jumlah_hari_tanpa_hilang_non_ops, lti_ops, lti_non_ops, man_hour_ops, man_hour_non_ops, fr, sr, ir, atlr, tahun, bulan
    ])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch(error => {
            console.error('Error updating data:', error);
            res.status(500).json({ message: 'Error updating data' });
        });
});


// PUT route to update the organizational structure
router.put('/updatestrukturjagorawi', (req, res) => {
    const { ketua, sekretaris, anggota1, anggota2, anggota3, anggota4, anggota5 } = req.body;

    // SQL query to update the structure
    const query = `
        UPDATE struktur_organisasi_jagorawi
        SET nama = CASE 
            WHEN jabatan = 'Ketua' THEN $1
            WHEN jabatan = 'Sekretaris' THEN $2
            WHEN jabatan = 'Anggota 1' THEN $3
            WHEN jabatan = 'Anggota 2' THEN $4
            WHEN jabatan = 'Anggota 3' THEN $5
            WHEN jabatan = 'Anggota 4' THEN $6
            WHEN jabatan = 'Anggota 5' THEN $7
        END
        WHERE jabatan IN ('Ketua', 'Sekretaris', 'Anggota 1', 'Anggota 2', 'Anggota 3', 'Anggota 4', 'Anggota 5')
    `;

    // Execute the query with the provided data
    db.query(query, [ketua, sekretaris, anggota1, anggota2, anggota3, anggota4, anggota5])
        .then(() => {
            res.status(200).json({ message: 'Update Success' });
        })
        .catch(error => {
            console.error('Error updating organizational structure:', error);
            res.status(500).json({ message: 'Error updating organizational structure' });
        });
});


router.put('/nullifydatajagorawi', (req, res) => {
    const { tahun, bulan } = req.body;

    const query = `
        UPDATE rekap_data_k3_jagorawi SET
            jumlah_karyawan_ops = NULL, jumlah_karyawan_non_ops = NULL, jumlah_hari_kerja_ops = NULL, jumlah_hari_kerja_non_ops = NULL,
            jumlah_jam_kerja = NULL, kecelakaan_berat_ops = NULL, kecelakaan_berat_non_ops = NULL, kecelakaan_ringan_ops = NULL, kecelakaan_ringan_non_ops = NULL,
            kecelakaan_meninggal_ops = NULL, kecelakaan_meninggal_non_ops = NULL, kecelakaan_near_miss_ops = NULL, kecelakaan_near_miss_non_ops = NULL,
            fire_accident = NULL, damaged_property = NULL, jumlah_hari_hilang_ops = NULL, jumlah_hari_hilang_non_ops = NULL, jumlah_hari_tanpa_hilang_ops = NULL,
            jumlah_hari_tanpa_hilang_non_ops = NULL, lti_ops = NULL, lti_non_ops = NULL, man_hour_ops = NULL, man_hour_non_ops = NULL, fr = NULL, sr = NULL, ir = NULL,
            atlr = NULL
        WHERE tahun = $1 AND bulan = $2
    `;

    db.query(query, [tahun, bulan], (error, result) => {
        if (error) {
            console.error('Error updating data:', error);
            return res.status(500).send('Gagal mengubah data menjadi NULL');
        }

        res.send(`Data berhasil diubah menjadi NULL untuk tahun ${tahun} dan bulan ${bulan}`);
    });
});


router.delete('/deletedatajagorawi', (req, res) => {
    //const no = req.params.id;

    const {no} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM rekap_data_k3_jagorawi WHERE no = $1`;
    
    db.query(query, [no], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});



router.delete('/deletepersoneljagorawi', (req, res) => {
    //const no = req.params.id;

    const {personel_k3_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM personel_k3_jagorawi WHERE personel_k3_id = $1`;
    
    db.query(query, [personel_k3_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});



router.delete('/deletekecelakaanjagorawi', (req, res) => {
    //const no = req.params.id;

    const {kecelakaan_kerja_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM kecelakaan_kerja_jagorawi WHERE kecelakaan_kerja_id = $1`;
    
    db.query(query, [kecelakaan_kerja_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});


router.delete('/deletekejadianjagorawi', (req, res) => {
    //const no = req.params.id;

    const {kejadian_darurat_id} = req.body
    // Lakukan penghapusan data dari database
    const query = `DELETE FROM kejadian_darurat_jagorawi WHERE kejadian_darurat_id = $1`;
    
    db.query(query, [kejadian_darurat_id], (error, result) => {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send('Gagal menghapus data');
        }

        res.send('Data berhasil dihapus');
    });
});


router.post('/login', async (req, res) => {
    const { ruas, pass_ruas } = req.body;
    const query = 'SELECT ruas, pass_ruas, userrole FROM akun_ruas WHERE ruas = $1;';
    
    db.query(query, [ruas], (err, results) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
  
      if (results.rowCount < 1) {
        return res.status(401).send('Nama Ruas salah'); // Nama tidak ditemukan
      }
  
      const storedPassword = results.rows[0].pass_ruas;
      const userRole = results.rows[0].userrole;
  
      if (pass_ruas === storedPassword) {
        if (userRole === 'admin' || userRole === 'user') {
          // Set session setelah login berhasil
          req.session.userRole = userRole;
          req.session.ruas = ruas;
          req.session.isLoggedIn = true; // Tandai bahwa user telah login
          
          return res.status(200).json({
              message: "Login successful",
              showItems: results.rows
          });
        } else {
          return res.status(401).send('Hanya user dan admin yang dapat login');
        }
      } else {
        return res.status(401).send('Password salah');
      }
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.send('Logout successful');
    });
});


app.get('/session', (req, res) => {
    const sessionData = req.session;
    res.json(sessionData);
});

app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});
