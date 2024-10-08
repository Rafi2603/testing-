const { Client } = require('pg');


//Insiasi koneksi ke database
const db = new Client({
    user: 'jmto_owner',
    host: 'ep-royal-snowflake-a1gudpyv.ap-southeast-1.aws.neon.tech',
    database: 'jmto',
    password: 'saN4LcZbUQO9',
    port: 5432,
    ssl: {
        rejectUnauthorized: false, // Atur SSL untuk koneksi aman
    }
});

//Melakukan koneksi dan menunjukkan indikasi database terhubung
db.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database JMTO Connected');
});

module.exports = db