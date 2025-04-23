
    class Kendaraan {
        constructor(id, jenis, model, tahun, hargaSewa) {
            this.id = id;
            this.jenis = jenis;
            this.model = model;
            this.tahun = tahun;
            this.hargaSewa = hargaSewa;
            this.tersedia = true;
        }

        getInfo() {
            return `${this.jenis} ${this.model} (${this.tahun}) - Rp${this.hargaSewa}/hari`;
        }

        setStatus(status) {
            this.tersedia = status;
        }
    }

    class Pelanggan {
        constructor(nama, nomorTelepon) {
            this.nama = nama;
            this.nomorTelepon = nomorTelepon;
            this.kendaraanDisewa = null;
            this.tanggalMulai = null;
            this.lamaSewa = 0;
        }

        sewaKendaraan(kendaraan, lamaSewa) {
            if (!kendaraan.tersedia) {
                return `Maaf, ${kendaraan.getInfo()} sudah disewa`;
            }
            
            this.kendaraanDisewa = kendaraan;
            this.tanggalMulai = new Date();
            this.lamaSewa = lamaSewa;
            kendaraan.setStatus(false); // Set kendaraan menjadi tidak tersedia
            
            return `${this.nama} berhasil menyewa ${kendaraan.getInfo()} selama ${lamaSewa} hari`;
        }

        kembalikanKendaraan() {
            if (!this.kendaraanDisewa) {
                return `${this.nama} tidak sedang menyewa kendaraan`;
            }
            
            const kendaraan = this.kendaraanDisewa;
            const totalBiaya = this.lamaSewa * kendaraan.hargaSewa;
            
            kendaraan.setStatus(true); // Set kendaraan menjadi tersedia kembali
            
            const infoPengembalian = `${this.nama} mengembalikan ${kendaraan.getInfo()}. Total biaya: Rp${totalBiaya}`;

            this.kendaraanDisewa = null;
            this.tanggalMulai = null;
            this.lamaSewa = 0;
            
            return infoPengembalian;
        }

        getInfoPenyewaan() {
            if (!this.kendaraanDisewa) {
                return `${this.nama} (${this.nomorTelepon}) - tidak sedang menyewa kendaraan`;
            }
            
            return `${this.nama} (${this.nomorTelepon}) - menyewa ${this.kendaraanDisewa.getInfo()} selama ${this.lamaSewa} hari`;
        }
    }

    class SistemManajemenTransportasi {
        constructor() {
            this.daftarKendaraan = [];
            this.daftarPelanggan = [];
        }

        tambahKendaraan(kendaraan) {
            this.daftarKendaraan.push(kendaraan);
            return `${kendaraan.getInfo()} berhasil ditambahkan ke sistem`;
        }

        tambahPelanggan(pelanggan) {
            this.daftarPelanggan.push(pelanggan);
            return `Pelanggan ${pelanggan.nama} berhasil ditambahkan ke sistem`;
        }

        cariKendaraanById(id) {
            return this.daftarKendaraan.find(kendaraan => kendaraan.id === id);
        }
        
        cariPelangganByNama(nama) {
            return this.daftarPelanggan.find(pelanggan => pelanggan.nama === nama);
        }

        getDaftarKendaraanTersedia() {
            const kendaraanTersedia = this.daftarKendaraan.filter(kendaraan => kendaraan.tersedia);
            if (kendaraanTersedia.length === 0) {
                return "Tidak ada kendaraan yang tersedia saat ini";
            }
            
            return kendaraanTersedia.map(kendaraan => kendaraan.getInfo()).join('\n');
        }

        getDaftarPelangganMenyewa() {
            const pelangganMenyewa = this.daftarPelanggan.filter(pelanggan => pelanggan.kendaraanDisewa !== null);
            if (pelangganMenyewa.length === 0) {
                return "Tidak ada pelanggan yang sedang menyewa kendaraan";
            }
            
            return pelangganMenyewa.map(pelanggan => pelanggan.getInfoPenyewaan()).join('\n');
        }
    }

    const sistem = new SistemManajemenTransportasi();

    function inisialisasiData() {
        const mobil1 = new Kendaraan("K001", "Mobil", "Toyota Avanza", 2022, 350000);
        const mobil2 = new Kendaraan("K002", "Mobil", "Honda Brio", 2023, 300000);
        const motor1 = new Kendaraan("K003", "Motor", "Honda Vario", 2022, 100000);
        const motor2 = new Kendaraan("K004", "Motor", "Yamaha NMAX", 2023, 150000);

        sistem.tambahKendaraan(mobil1);
        sistem.tambahKendaraan(mobil2);
        sistem.tambahKendaraan(motor1);
        sistem.tambahKendaraan(motor2);

        const pelanggan1 = new Pelanggan("Budi Santoso", "081234567890");
        const pelanggan2 = new Pelanggan("Ani Wijaya", "089876543210");
        const pelanggan3 = new Pelanggan("Deni Pratama", "087812345678");

        sistem.tambahPelanggan(pelanggan1);
        sistem.tambahPelanggan(pelanggan2);
        sistem.tambahPelanggan(pelanggan3);

        updateUI();
    }

    function tambahKendaraanBaru() {
        const id = document.getElementById('kendaraanId').value;
        const jenis = document.getElementById('jenisKendaraan').value;
        const model = document.getElementById('modelKendaraan').value;
        const tahun = document.getElementById('tahunKendaraan').value;
        const hargaSewa = document.getElementById('hargaSewa').value;
        
        if (!id || !jenis || !model || !tahun || !hargaSewa) {
            alert('Semua field harus diisi!');
            return;
        }
        
        const kendaraan = new Kendaraan(id, jenis, model, parseInt(tahun), parseInt(hargaSewa));
        const hasil = sistem.tambahKendaraan(kendaraan);
        
        document.getElementById('output').textContent = hasil;
        
        document.getElementById('kendaraanId').value = '';
        document.getElementById('jenisKendaraan').value = '';
        document.getElementById('modelKendaraan').value = '';
        document.getElementById('tahunKendaraan').value = '';
        document.getElementById('hargaSewa').value = '';

        updateUI();
    }

    function tambahPelangganBaru() {
        const nama = document.getElementById('namaPelanggan').value;
        const nomorTelepon = document.getElementById('nomorTelepon').value;
        
        if (!nama || !nomorTelepon) {
            alert('Semua field harus diisi!');
            return;
        }
        
        const pelanggan = new Pelanggan(nama, nomorTelepon);
        const hasil = sistem.tambahPelanggan(pelanggan);
        
        document.getElementById('output').textContent = hasil;

        document.getElementById('namaPelanggan').value = '';
        document.getElementById('nomorTelepon').value = '';

        updateUI();
    }

    function sewaKendaraan() {
        const pelangganNama = document.getElementById('pilihPelanggan').value;
        const kendaraanId = document.getElementById('pilihKendaraan').value;
        const lamaSewa = document.getElementById('lamaSewa').value;
        
        if (!pelangganNama || !kendaraanId || !lamaSewa) {
            alert('Semua field harus diisi!');
            return;
        }
        
        const pelanggan = sistem.cariPelangganByNama(pelangganNama);
        const kendaraan = sistem.cariKendaraanById(kendaraanId);
        
        if (!pelanggan || !kendaraan) {
            alert('Pelanggan atau kendaraan tidak ditemukan!');
            return;
        }
        
        const hasil = pelanggan.sewaKendaraan(kendaraan, parseInt(lamaSewa));
        
        document.getElementById('output').textContent = hasil;

        document.getElementById('lamaSewa').value = '';

        updateUI();
    }

    function kembalikanKendaraan() {
        const pelangganNama = document.getElementById('pilihPelanggan').value;
        
        if (!pelangganNama) {
            alert('Pilih pelanggan yang akan mengembalikan kendaraan!');
            return;
        }
        
        const pelanggan = sistem.cariPelangganByNama(pelangganNama);
        
        if (!pelanggan) {
            alert('Pelanggan tidak ditemukan!');
            return;
        }
        
        const hasil = pelanggan.kembalikanKendaraan();
        
        document.getElementById('output').textContent = hasil;

        updateUI();
    }

    function tampilkanPelangganMenyewa() {
        const hasil = sistem.getDaftarPelangganMenyewa();
        document.getElementById('output').textContent = hasil;
    }

    function tampilkanKendaraanTersedia() {
        const hasil = sistem.getDaftarKendaraanTersedia();
        document.getElementById('output').textContent = hasil;
    }

    function updateUI() {
        const tabelKendaraan = document.getElementById('tabelKendaraan').getElementsByTagName('tbody')[0];
        tabelKendaraan.innerHTML = '';
        
        sistem.daftarKendaraan.forEach(kendaraan => {
            const row = tabelKendaraan.insertRow();
            row.insertCell(0).textContent = kendaraan.id;
            row.insertCell(1).textContent = kendaraan.jenis;
            row.insertCell(2).textContent = kendaraan.model;
            row.insertCell(3).textContent = kendaraan.tahun;
            row.insertCell(4).textContent = `Rp${kendaraan.hargaSewa}`;
            row.insertCell(5).textContent = kendaraan.tersedia ? 'Tersedia' : 'Disewa';
        });

        const tabelPelanggan = document.getElementById('tabelPelanggan').getElementsByTagName('tbody')[0];
        tabelPelanggan.innerHTML = '';
        
        sistem.daftarPelanggan.forEach(pelanggan => {
            const row = tabelPelanggan.insertRow();
            row.insertCell(0).textContent = pelanggan.nama;
            row.insertCell(1).textContent = pelanggan.nomorTelepon;
            row.insertCell(2).textContent = pelanggan.kendaraanDisewa ? 
                `Menyewa ${pelanggan.kendaraanDisewa.jenis} ${pelanggan.kendaraanDisewa.model}` : 
                'Tidak menyewa';
        });

        const pilihPelanggan = document.getElementById('pilihPelanggan');
        pilihPelanggan.innerHTML = '<option value="">-- Pilih Pelanggan --</option>';
        
        sistem.daftarPelanggan.forEach(pelanggan => {
            const option = document.createElement('option');
            option.value = pelanggan.nama;
            option.textContent = pelanggan.nama;
            pilihPelanggan.appendChild(option);
        });

        const pilihKendaraan = document.getElementById('pilihKendaraan');
        pilihKendaraan.innerHTML = '<option value="">-- Pilih Kendaraan --</option>';
        
        sistem.daftarKendaraan.filter(kendaraan => kendaraan.tersedia).forEach(kendaraan => {
            const option = document.createElement('option');
            option.value = kendaraan.id;
            option.textContent = `${kendaraan.jenis} ${kendaraan.model} - Rp${kendaraan.hargaSewa}/hari`;
            pilihKendaraan.appendChild(option);
        });
    }

    window.onload = function() {
        inisialisasiData();
    };