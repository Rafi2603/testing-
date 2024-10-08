document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/getdata')
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Data Found') {
                const tableBody = document.querySelector('#data-table tbody');
                tableBody.innerHTML = ''; // Clear existing rows

                data.showItems.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.no || ''}</td>
                        <td>${item.bulan || ''}</td>
                        <td>${item.jumlah_karyawan_ops || ''}</td>
                        <td>${item.jumlah_karyawan_non_ops || ''}</td>
                        <td>${item.jumlah_hari_kerja_ops || ''}</td>
                        <td>${item.jumlah_hari_kerja_non_ops || ''}</td>
                        <td>${item.jumlah_jam_kerja || ''}</td>
                        <td>${item.kecelakaan_berat_ops || ''}</td>
                        <td>${item.kecelakaan_berat_non_ops || ''}</td>
                        <td>${item.kecelakaan_ringan_ops || ''}</td>
                        <td>${item.kecelakaan_ringan_non_ops || ''}</td>
                        <td>${item.kecelakaan_meninggal_ops || ''}</td>
                        <td>${item.kecelakaan_meninggal_non_ops || ''}</td>
                        <td>${item.kecelakaan_near_miss_ops || ''}</td>
                        <td>${item.kecelakaan_near_miss_non_ops || ''}</td>
                        <td>${item.fire_accident_ops || ''}</td>
                        <td>${item.fire_accident_non_ops || ''}</td>
                        <td>${item.damaged_property_ops || ''}</td>
                        <td>${item.damaged_property_non_ops || ''}</td>
                        <td>${item.jumlah_hari_hilang_ops || ''}</td>
                        <td>${item.jumlah_hari_hilang_non_ops || ''}</td>
                        <td>${item.jumlah_hari_tanpa_hilang_ops || ''}</td>
                        <td>${item.jumlah_hari_tanpa_hilang_non_ops || ''}</td>
                        <td>${item.lti_ops || ''}</td>
                        <td>${item.lti_non_ops || ''}</td>
                        <td>${item.man_hour_ops || ''}</td>
                        <td>${item.man_hour_non_ops || ''}</td>
                    `;
                    tableBody.appendChild(row);
                });

                // Inisialisasi DataTables
                $('#data-table').DataTable();
            } else {
                console.error('Data not found');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

