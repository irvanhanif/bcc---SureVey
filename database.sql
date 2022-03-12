CREATE TABLE bcc.provinsi
(
    id_provinsi SMALLINT NOT NULL AUTO_INCREMENT,
    nama_provinsi VARCHAR(60),

    PRIMARY KEY (id_provinsi)
);

CREATE TABLE bcc.kota
(
    id_kota SMALLINT NOT NULL AUTO_INCREMENT,
    id_provinsi SMALLINT,
    nama_kota VARCHAR(60),

    PRIMARY KEY (id_kota),
    FOREIGN KEY (id_provinsi)
        REFERENCES bcc.provinsi(id_provinsi)
);

CREATE TABLE bcc.domisili
(
    id_domisili SMALLINT NOT NULL AUTO_INCREMENT,
    id_provinsi SMALLINT,
    id_kota SMALLINT,

    PRIMARY KEY (id_domisili),
    FOREIGN KEY (id_provinsi)
        REFERENCES bcc.provinsi(id_provinsi),
    FOREIGN KEY (id_kota)
        REFERENCES bcc.kota(id_kota)
);

CREATE TABLE bcc.gender
(
    id_gender SMALLINT NOT NULL AUTO_INCREMENT,
    gender VARCHAR(10),

    PRIMARY KEY (id_gender)
);

CREATE TABLE bcc.pekerjaan
(
    id_pekerjaan SMALLINT NOT NULL AUTO_INCREMENT,
    nama_pekerjaan VARCHAR(100),

    PRIMARY KEY (id_pekerjaan)
);

CREATE TABLE bcc.status
(
    id_status SMALLINT NOT NULL AUTO_INCREMENT,
    ktg_status VARCHAR(45),

    PRIMARY KEY (id_status)
);

CREATE TABLE bcc.user
(
    id_user SMALLINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(60),
    password VARCHAR(150),
    username VARCHAR(75),
    ttl TIMESTAMP,
    id_gender SMALLINT,
    id_pekerjaan SMALLINT,
    id_status SMALLINT,
    id_domisili SMALLINT,
    poin_user BIGINT DEFAULT 0,
    create_time_user TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time_user TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_user),
    FOREIGN KEY (id_gender)
        REFERENCES bcc.gender(id_gender),
    FOREIGN KEY (id_pekerjaan)
        REFERENCES bcc.pekerjaan(id_pekerjaan),
    FOREIGN KEY (id_status)
        REFERENCES bcc.status(id_status),
    FOREIGN KEY (id_domisili) 
        REFERENCES bcc.domisili(id_domisili)
);

CREATE TABLE bcc.usia
(
    id_usia SMALLINT NOT NULL AUTO_INCREMENT,
    usia_awal INTEGER,
    usia_akhir INTEGER,

    PRIMARY KEY(id_usia)
);

CREATE TABLE bcc.kriteria
(
    id_kriteria SMALLINT NOT NULL AUTO_INCREMENT,
    id_usia SMALLINT,
    id_gender SMALLINT,
    id_pekerjaan SMALLINT,
    id_status SMALLINT,
    id_domisili SMALLINT,

    PRIMARY KEY (id_kriteria),
    FOREIGN KEY (id_usia)
        REFERENCES bcc.usia(id_usia),
    FOREIGN KEY (id_gender)
        REFERENCES bcc.gender(id_gender),
    FOREIGN KEY (id_pekerjaan)
        REFERENCES bcc.pekerjaan(id_pekerjaan),
    FOREIGN KEY (id_status)
        REFERENCES bcc.status(id_status),
    FOREIGN KEY (id_domisili) 
        REFERENCES bcc.domisili(id_domisili)
);

CREATE TABLE bcc.paket
(
    id_paket SMALLINT NOT NULL AUTO_INCREMENT,
    nama_paket VARCHAR(45),
    harga_paket BIGINT,
    poin_paket INTEGER,
    max_respon INTEGER,

    PRIMARY KEY(id_paket)
);

CREATE TABLE bcc.payment
(
    id_payment VARCHAR(45) NOT NULL,
    response_midtrans TEXT,
    payment_method SMALLINT,
    buy_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_payment)
);

CREATE TABLE bcc.kuesioner
(
    id_kuesioner SMALLINT NOT NULL AUTO_INCREMENT,
    nama_kuesioner VARCHAR(60),
    link_kuesioner VARCHAR(200),
    id_kriteria SMALLINT,
    syarat_tmbh VARCHAR(200),
    id_paket SMALLINT,
    id_user SMALLINT,
    id_payment VARCHAR(45),
    foto VARCHAR(255),
    has_pay BOOLEAN,
    create_time_kuesioner TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time_kuesioner TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_kuesioner),
    FOREIGN KEY (id_kriteria) 
        REFERENCES bcc.kriteria(id_kriteria),
    FOREIGN KEY (id_paket)
        REFERENCES bcc.paket(id_paket),
    FOREIGN KEY (id_user)
        REFERENCES bcc.user(id_user),
    FOREIGN KEY (id_payment)
        REFERENCES bcc.payment(id_payment)
);

CREATE TABLE bcc.user_respond
(
    id_user SMALLINT,
    id_kuesioner SMALLINT,
    time_resp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_user)
        REFERENCES bcc.user(id_user),
    FOREIGN KEY (id_kuesioner)
        REFERENCES bcc.kuesioner(id_kuesioner)
);

CREATE TABLE bcc.voucher
(
    id_voucher VARCHAR(10) NOT NULL,
    nama_voucher VARCHAR(60),
    sk VARCHAR(200),
    total BIGINT,
    poin_voucher BIGINT,

    PRIMARY KEY (id_voucher)
);

CREATE TABLE bcc.user_voucher
(
    id_voucher VARCHAR(10),
    id_user SMALLINT,
    take_time_voucher TIMESTAMP,    

    FOREIGN KEY (id_voucher)
        REFERENCES bcc.voucher(id_voucher),
    FOREIGN KEY (id_user)
        REFERENCES bcc.user(id_user)
);

INSERT INTO bcc.gender (gender) VALUES ('Perempuan'), ('Laki-Laki');

INSERT INTO bcc.pekerjaan (nama_pekerjaan) VALUES 
('Mahasiswa'), ('Pelajar'), ('Wiraswasta'), ('Karyawan Swasta'), ('Pengurus Rumah Tangga'),
('Guru'), ('Buruh'), ('Petani'), ('Nelayan'), ('Pegawai Negeri Sipil'), ('TNI'), ('Polisi'),
('Tenaga Kerja Kesehatan'), ('Lainnya');

INSERT INTO bcc.status (ktg_status) VALUES ('Menikah'), ('Belum Menikah');

INSERT INTO bcc.paket (nama_paket, harga_paket, poin_paket, max_respon) VALUES 
("Gratis", 0, 5, 50), ("Paket Hemat", 10000, 30, 100), ("Paket Deluxe", 20000, 40, 150), 
("Paket Premium", 25000, 40, 200), ("Paket VVIP", 50000, 45, 425);

INSERT INTO bcc.voucher (id_voucher, nama_voucher, sk, total, poin_voucher) VALUES 
('SVV-1j0msawx2dy', "Pulsa Prabayar", '', 20000, 15000), ('SVV-veck85xvicl', 'Pulsa Prabayar', '', 50000, 20000);

INSERT INTO bcc.provinsi (nama_provinsi) VALUES
('NAD Aceh'), ('Sumatera Utara'), ('Sumatera Barat'), ('Sumatera Selatan'), ('Riau'), 
('Kepulauan Riau'), ('Jambi'), ('Bengkulu'), ('Bangka Belitung'), ('Lampung'), 
('Banten'), ('Jawa Barat'), ('Jawa Tengah'), ('Jawa Timur'), ('DKI Jakarta'),
('Daerah Istimewa Yogyakarta'), ('Bali'), ('Nusa Tenggara Barat'), ('Nusa Tenggara Timur'), ('Kalimantan Barat'),
('Kalimantan Selatan'), ('Kalimantan Tengah'), ('Kalimantan Timur'), ('Kalimantan Utara'), ('Gorontalo'), 
('Sulawesi Selatan'), ('Sulawesi Tenggara'), ('Sulawesi Tengah'), ('Sulawesi Utara'), ('Sulawesi Barat'), 
('Maluku'), ('Maluku Utara'), ('Papua'), ('Papua Barat');

INSERT INTO bcc.kota (id_provinsi, nama_kota) VALUES
(1, 'Kabupaten Aceh Barat'), (1, 'Kabupaten Aceh Barat Daya'), (1, 'Kabupaten Aceh Besar'),
(1, 'Kabupaten Aceh Jaya'), (1, 'Kabupaten Aceh Selatan'), (1, 'Kabupaten Aceh Singkil'),
(1, 'Kabupaten Aceh Tamiang'), (1, 'Kabupaten Aceh Tengah'), (1, 'Kabupaten Aceh Tenggara'), 
(1, 'Kabupaten Aceh Timur'), (1, 'Kabupaten Aceh Utara'), (1, 'Kabupaten Bener Meriah'), 
(1, 'Kabupaten Bireuen'), (1, 'Kabupaten Gayo Lues'), (1, 'Kabupaten Nagan Raya'), 
(1, 'Kabupaten Pidie'), (1, 'Kabupaten Pidie Jaya'), (1, 'Kabupaten Simeulue'), 
(1, 'Kota Banda Aceh'), (1, 'Kota Langsa'), (1, 'Kota Lhokseumawe'), 
(1, 'Kota Sabang'), (1, 'Kota Subulussalam'),

(2, 'Kabupaten Asahan'), (2, 'Kabupaten Batubara'), (2, 'Kabupaten Dairi'), 
(2, 'Kabupaten Deli Serdang'), (2, 'Kabupaten Humbang Hasundutan'), (2, 'Kabupaten Karo'), 
(2, 'Kabupaten Labuhanbatu'), (2, 'Kabupaten Labuhanbatu Selatan'), (2, 'Kabupaten Labuhanbatu Utara'), 
(2, 'Kabupaten Langkat'), (2, 'Kabupaten Mandailing Natal'), (2, 'Kabupaten Nias'), 
(2, 'Kabupaten Nias Barat'), (2, 'Kabupaten Nias Selatan'), (2, 'Kabupaten Nias Utara'),
(2, 'Kabupaten Padang Lawas'), (2, 'Kabupaten Padang Lawas Utara'), (2, 'Kabupaten Pakpak Bharat'), 
(2, 'Kabupaten Samosir'), (2, 'Kabupaten Serdang Bedagai'), (2, 'Kabupaten Simalungun'), 
(2, 'Kabupaten Tapanuli Selatan'), (2, 'Kabupaten Tapanuli Tengah'), (2, 'Kabupaten Tapanuli Utara'), 
(2, 'Kabupaten Toba Samosir'), (2, 'Kota Binjai'), (2, 'Kota Gunungsitoli'),
(2, 'Kota Medan'), (2, 'Kota Padangsidempuan'), (2, 'Kota Pematangsiantar'), 
(2, 'Kota Sibolga'), (2, 'Kota Tanjungbalai'), (2, 'Kota Tebing Tinggi'),

(3, 'Kabupaten Agam'), (3, 'Kabupaten Dharmasraya'), (3, 'Kabupaten Kepulauan Mentawai'), (3, 'Kabupaten Lima Puluh Kota'),
(3, 'Kabupaten Padang Pariaman'), (3, 'Kabupaten Pasaman'), (3, 'Kabupaten Pasaman Barat'), (3, 'Kabupaten Pesisir Selatan'),
(3, 'Kabupaten Sijunjung'), (3, 'Kabupaten Solok'), (3, 'Kabupaten Solok Selatan'), (3, 'Kabupaten Tanah Datar'),
(3, 'Kota Bukittinggi'), (3, 'Kota Padang'), (3, 'Kota Padangpanjang'), (3, 'Kota Pariaman'),
(3, 'Kota Payakumbuh'), (3, 'Kota Sawahlunto'), (3, 'Kota Solok'),

(4, 'Kabupaten Banyuasin'), (4, 'Kabupaten Empat Lawang'), (4, 'Kabupaten Lahat'), 
(4, 'Kabupaten Muara Enim'), (4, 'Kabupaten Musi Banyuasin'), (4, 'Kabupaten Musi Rawas'), 
(4, 'Kabupaten Musi Rawas Utara'), (4, 'Kabupaten Ogan Ilir'), (4, 'Kabupaten Ogan Komering Ilir'), 
(4, 'Kabupaten Ogan Komering Ulu'), (4, 'Kabupaten Ogan Komering Ulu Selatan'), (4, 'Kabupaten Ogan Komering Ulu Timur'),
(4, 'Kabupaten Penukal Abab Lematang Ilir'), (4, 'Kota Lubuklinggau'), (4, 'Kota Pagar Alam'), 
(4, 'Kota Palembang'), (4, 'Kota Prabumulih'),

(5, 'Kabupaten Bengkalis'), (5, 'Kabupaten Indragiri Hilir'), (5, 'Kabupaten Indragiri Hulu'), (5, 'Kabupaten Kampar'),
(5, 'Kabupaten Kepulauan Meranti'), (5, 'Kabupaten Kuantan Singingi'), (5, 'Kabupaten Pelalawan'), (5, 'Kabupaten Rokan Hilir'),
(5, 'Kabupaten Rokan Hulu'), (5, 'Kabupaten Siak'), (5, 'Kota Dumai'), (5, 'Kota Pekanbaru'),

(6, 'Kabupaten Bintan'), (6, 'Kabupaten Karimun'), (6, 'Kabupaten Kepulauan Anambas'), (6, 'Kabupaten Lingga'),
(6, 'Kabupaten Natuna'), (6, 'Kota Batam'), (6, 'Kota Tanjung Pinang'),

(7, 'Kabupaten Batanghari'), (7, 'Kabupaten Bungo'), (7, 'Kabupaten Kerinci'), (7, 'Kabupaten Merangin'),
(7, 'Kabupaten Muaro Jambi'), (7, 'Kabupaten Sarolangun'), (7, 'Kabupaten Tanjung Jabung Barat'), (7, 'Kabupaten Tanjung Jabung Timur'),
(7, 'Kabupaten Tebo'), (7, 'Kota Jambi'), (7, 'Kota Sungai Penuh'),

(8, 'Kabupaten Bengkulu Selatan'), (8, 'Kabupaten Bengkulu Tengah'), (8, 'Kabupaten Bengkulu Utara'), (8, 'Kabupaten Kaur'), (8, 'Kabupaten Kepahiang'),
(8, 'Kabupaten Lebong'), (8, 'Kabupaten Mukomuko'), (8, 'Kabupaten Rejang Lebong'), (8, 'Kabupaten Seluma'), (8, 'Kota Bengkulu'),

(9, 'Kabupaten Bangka'), (9, 'Kabupaten Bangka Barat'), (9, 'Kabupaten Bangka Selatan'), (9, 'Kabupaten Bangka Tengah'),
(9, 'Kabupaten Belitung'), (9, 'Kabupaten Belitung Timur'), (9, 'Kota Pangkal Pinang'), 

(10, 'Kabupaten Lampung Tengah'), (10, 'Kabupaten Lampung Utara'), (10, 'Kabupaten Lampung Selatan'), (10, 'Kabupaten Lampung Barat'), (10, 'Kabupaten Lampung Timur'),
(10, 'Kabupaten Mesuji'), (10, 'Kabupaten Pesawaran'), (10, 'Kabupaten Pesisir Barat'), (10, 'Kabupaten Pringsewu'), (10, 'Kabupaten Tulang Bawang'),
(10, 'Kabupaten Tulang Bawang Barat'), (10, 'Kabupaten Tanggamus'), (10, 'Kabupaten Way Kanan'), (10, 'Kota Bandar Lampung'), (10, 'Kota Metro'),

(11, 'Kabupaten Lebak'), (11, 'Kabupaten Pandeglang'), (11, 'Kabupaten Serang'), (11, 'Kabupaten Tangerang'),
(11, 'Kota Cilegon'), (11, 'Kota Serang'), (11, 'Kota Serang'), (11, 'Kota Tangerang Selatan'),

(12, 'Kabupaten Bandung'), (12, 'Kabupaten Bandung Barat'), (12, 'Kabupaten Bandung Barat'), (12, 'Kabupaten Bogor'),
(12, 'Kabupaten Ciamis'), (12, 'Kabupaten Cianjur'), (12, 'Kabupaten Cirebon'), (12, 'Kabupaten Garut'),
(12, 'Kabupaten Indramayu'), (12, 'Kabupaten Karawang'), (12, 'Kabupaten Kuningan'), (12, 'Kabupaten Majalengka'),
(12, 'Kabupaten Pangandaran'), (12, 'Kabupaten Purwakarta'), (12, 'Kabupaten Subang'), (12, 'Kabupaten Sukabumi'),
(12, 'Kabupaten Sumedang'), (12, 'Kabupaten Tasikmalaya'), (12, 'Kota Bandung'), (12, 'Kota Banjar'),
(12, 'Kota Bekasi'), (12, 'Kota Bogor'), (12, 'Kota Cimahi'), (12, 'Kota Cirebon'),
(12, 'Kota Depok'), (12, 'Kota Sukabumi'), (12, 'Kota Tasikmalaya'),

(13, 'Kabupaten Banjarnegara'), (13, 'Kabupaten Banyumas'), (13, 'Kabupaten Batang'), (13, 'Kabupaten Blora'),
(13, 'Kabupaten Boyolali'), (13, 'Kabupaten Brebes'), (13, 'Kabupaten Cilacap'), (13, 'Kabupaten Demak'),
(13, 'Kabupaten Grobogan'), (13, 'Kabupaten Jepara'), (13, 'Kabupaten Karanganyar'), (13, 'Kabupaten Kebumen'),
(13, 'Kabupaten Kendal'), (13, 'Kabupaten Klaten'), (13, 'Kabupaten Kudus'), (13, 'Kabupaten Magelang'),
(13, 'Kabupaten Pati'), (13, 'Kabupaten Pekalongan'), (13, 'Kabupaten Pemalang'), (13, 'Kabupaten Purbalingga'),
(13, 'Kabupaten Purworejo'), (13, 'Kabupaten Rembang'), (13, 'Kabupaten Semarang'), (13, 'Kabupaten Sragen'),
(13, 'Kabupaten Sukoharjo'), (13, 'Kabupaten Tegal'), (13, 'Kabupaten Temanggung'), (13, 'Kabupaten Wonogiri'),
(13, 'Kabupaten Wonosobo'), (13, 'Kota Magelang'), (13, 'Kota Pekalongan'), (13, 'Kota Salatiga'),
(13, 'Kota Semarang'), (13, 'Kota Surakarta'), (13, 'Kota Tegal'),

(14, 'Kabupaten Bangkalan'), (14, 'Kabupaten Banyuwangi'), (14, 'Kabupaten Blitar'), (14, 'Kabupaten Bojonegoro'),
(14, 'Kabupaten Bondowoso'), (14, 'Kabupaten Gresik'), (14, 'Kabupaten Jember'), (14, 'Kabupaten Jombang'),
(14, 'Kabupaten Kediri'), (14, 'Kabupaten Lamongan'), (14, 'Kabupaten Lumajang'), (14, 'Kabupaten Madiun'),
(14, 'Kabupaten Magetan'), (14, 'Kabupaten Malang'), (14, 'Kabupaten Mojokerto'), (14, 'Kabupaten Nganjuk'),
(14, 'Kabupaten Ngawi'), (14, 'Kabupaten Pacitan'), (14, 'Kabupaten Pamekasan'), (14, 'Kabupaten Pasuruan'),
(14, 'Kabupaten Ponorogo'), (14, 'Kabupaten Probolinggo'), (14, 'Kabupaten Sampang'), (14, 'Kabupaten Sidoarjo'),
(14, 'Kabupaten Situbondo'), (14, 'Kabupaten Sumenep'), (14, 'Kabupaten Trenggalek'), (14, 'Kabupaten Tuban'),
(14, 'Kabupaten Tulungagung'), (14, 'Kota Batu'), (14, 'Kota Blitar'), (14, 'Kota Kediri'),
(14, 'Kota Madiun'), (14, 'Kota Malang'), (14, 'Kota Mojokerto'), (14, 'Kota Pasuruan'),
(14, 'Kota Probolinggo'), (14, 'Kota Surabaya'),

(15, 'Kota Administrasi Jakarta Barat'), (15, 'Kota Administrasi Jakarta Pusat'), (15, 'Kota Administrasi Jakarta Selatan'),
(15, 'Kota Administrasi Jakarta Timur'), (15, 'Kota Administrasi Jakarta Utara'), (15, 'Kabupaten Administrasi Kepulauan Seribu'),

(16, 'Kabupaten Bantul'), (16, 'Kabupaten Gunungkidul'), (16, 'Kabupaten Kulon Progo'), (16, 'Kabupaten Sleman'), (16, 'Kota Yogyakarta'),

(17, 'Kabupaten Badung'), (17, 'Kabupaten Bangli'), (17, 'Kabupaten Buleleng'),
(17, 'Kabupaten Gianyar'), (17, 'Kabupaten Jembrana'), (17, 'Kabupaten Karangasem'),
(17, 'Kabupaten Klungkung'), (17, 'Kabupaten Tabanan'), (17, 'Kota Denpasar'),

(18, 'Kabupaten Bima'), (18, 'Kabupaten Dompu'), (18, 'Kabupaten Lombok Barat'), (18, 'Kabupaten Lombok Tengah'), (18, 'Kabupaten Lombok Timur'),
(18, 'Kabupaten Lombok Utara'), (18, 'Kabupaten Sumbawa'), (18, 'Kabupaten Sumbawa Barat'), (18, 'Kota Bima'), (18, 'Kota Mataram'),

(19, 'Kabupaten Alor'), (19, 'Kabupaten Belu'), (19, 'Kabupaten Ende'), (19, 'Kabupaten Flores Timur'),
(19, 'Kabupaten Kupang'), (19, 'Kabupaten Lembata'), (19, 'Kabupaten Malaka'), (19, 'Kabupaten Manggarai'),
(19, 'Kabupaten Manggarai Barat'), (19, 'Kabupaten Manggarai Timur'), (19, 'Kabupaten Ngada'), (19, 'Kabupaten Nagekeo'),
(19, 'Kabupaten Rote Ndao'), (19, 'Kabupaten Sabu Raijua'), (19, 'Kabupaten Sikka'), (19, 'Kabupaten Sumba Barat'),
(19, 'Kabupaten Sumba Barat Daya'), (19, 'Kabupaten Sumba Tengah'), (19, 'Kabupaten Sumba Timur'), (19, 'Kabupaten Timor Tengah Selatan'),
(19, 'Kabupaten Timor Tengah Utara'), (19, 'Kota Kupang'),

(20, 'Kabupaten Bengkayang'), (20, 'Kabupaten Kapuas Hulu'), (20, 'Kabupaten Kayong Utara'), (20, 'Kabupaten Ketapang'),
(20, 'Kabupaten Kubu Raya'), (20, 'Kabupaten Landak'), (20, 'Kabupaten Melawi'), (20, 'Kabupaten Mempawah'),
(20, 'Kabupaten Sambas'), (20, 'Kabupaten Sanggau'), (20, 'Kabupaten Sekadau'), (20, 'Kabupaten Sintang'),
(20, 'Kota Pontianak'), (20, 'Kota Singkawang'), 

(21, 'Kabupaten Balangan'), (21, 'Kabupaten Banjar'), (21, 'Kabupaten Barito Kuala'), (21, 'Kabupaten Hulu Sungai Selatan'), (21, 'Kabupaten Hulu Sungai Tengah'), 
(21, 'Kabupaten Hulu Sungai Utara'), (21, 'Kabupaten Kotabaru'), (21, 'Kabupaten Tabalong'), (21, 'Kabupaten Tanah Bumbu'), (21, 'Kabupaten Tanah Laut'), 
(21, 'Kabupaten Tapin'), (21, 'Kota Banjarbaru'), (21, 'Kota Banjarmasin'), 

(22, 'Kabupaten Barito Selatan'), (22, 'Kabupaten Barito Timur'), (22, 'Kabupaten Barito Utara'), (22, 'Kabupaten Gunung Mas'),
(22, 'Kabupaten Kapuas'), (22, 'Kabupaten Katingan'), (22, 'Kabupaten Kotawaringin Barat'), (22, 'Kabupaten Kotawaringin Timur'),
(22, 'Kabupaten Lamandau'), (22, 'Kabupaten Murung Raya'), (22, 'Kabupaten Pulang Pisau'), (22, 'Kabupaten Sukamara'),
(22, 'Kabupaten Seruyan'), (22, 'Kota Palangka Raya'),

(23, 'Kabupaten Berau'), (23, 'Kabupaten Kutai Barat'), (23, 'Kabupaten Kutai Kartanegara'), (23, 'Kabupaten Kutai Timur'),  (23, 'Kabupaten Mahakam Ulu'),
(23, 'Kabupaten Paser'), (23, 'Kabupaten Penajam Paser Utara'), (23, 'Kota Balikpapan'), (23, 'Kota Bontang'), (23, 'Kota Samarinda'),

(24, 'Kabupaten Bulungan'), (24, 'Kabupaten Malinau'), (24, 'Kabupaten Nunukan'), (24, 'Kabupaten Tana Tidung'), (24, 'Kota Tarakan'),

(25, 'Kabupaten Boalemo'), (25, 'Kabupaten Bone Bolango'), (25, 'Kabupaten Gorontalo'),
(25, 'Kabupaten Gorontalo Utara'), (25, 'Kabupaten Pohuwato'), (25, 'Kota Gorontalo'),

(26, 'Kabupaten Bantaeng'), (26, 'Kabupaten Barru'), (26, 'Kabupaten Bone'), (26, 'Kabupaten Bulukumba'),
(26, 'Kabupaten Enrekang'), (26, 'Kabupaten Gowa'), (26, 'Kabupaten Jeneponto'), (26, 'Kabupaten Kepulauan Selayar'),
(26, 'Kabupaten Luwu'), (26, 'Kabupaten Luwu Timur'), (26, 'Kabupaten Luwu Utara'), (26, 'Kabupaten Maros'),
(26, 'Kabupaten Pangkajene dan Kepulauan'), (26, 'Kabupaten Pinrang'), (26, 'Kabupaten Sidenreng Rappang'), (26, 'Kabupaten Sinjai'),
(26, 'Kabupaten Soppeng'), (26, 'Kabupaten Takalar'), (26, 'Kabupaten Tana Toraja'), (26, 'Kabupaten Toraja Utara'),
(26, 'Kabupaten Wajo'), (26, 'Kota Makassar'), (26, 'Kota Palopo'), (26, 'Kota Parepare'),

(27, 'Kabupaten Bombana'), (27, 'Kabupaten Buton'), (27, 'Kabupaten Buton Selatan'), (27, 'Kabupaten Buton Tengah'),
(27, 'Kabupaten Buton Utara'), (27, 'Kabupaten Kolaka'), (27, 'Kabupaten Kolaka Timur'), (27, 'Kabupaten Kolaka Utara'),
(27, 'Kabupaten Konawe'), (27, 'Kabupaten Konawe Kepulauan'), (27, 'Kabupaten Konawe Selatan'), (27, 'Kabupaten Konawe Utara'),
(27, 'Kabupaten Muna'), (27, 'Kabupaten Muna Barat'), (27, 'Kabupaten Wakatobi'), (27, 'Kota Bau-Bau'), (27, 'Kota Kendari'),

(28, 'Kabupaten Banggai'), (28, 'Kabupaten Banggai Kepulauan'), (28, 'Kabupaten Banggai Laut'), (28, 'Kabupaten Buol'), (28, 'Kabupaten Donggala'),
(28, 'Kabupaten Morowali'), (28, 'Kabupaten Morowali Utara'), (28, 'Kabupaten Parigi Moutong'), (28, 'Kabupaten Poso'), (28, 'Kabupaten Sigi'),
(28, 'Kabupaten Tojo Una-Una'), (28, 'Kabupaten Toli-Toli'), (28, 'Kota Palu'),

(29, 'Kabupaten Bolaang Mongondow'), (29, 'Kabupaten Bolaang Mongondow Selatan'), (29, 'Kabupaten Bolaang Mongondow Timur'), (29, 'Kabupaten Bolaang Mongondow Utara'), (29, 'Kabupaten Kepulauan Sangihe'),
(29, 'Kabupaten Kepulauan Siau Tagulandang Biaro'), (29, 'Kabupaten Kepulauan Talaud'), (29, 'Kabupaten Minahasa'), (29, 'Kabupaten Minahasa Selatan'), (29, 'Kabupaten Minahasa Tenggara'),
(29, 'Kabupaten Minahasa Utara'), (29, 'Kota Bitung'), (29, 'Kota Kotamobagu'), (29, 'Kota Manado'), (29, 'Kota Tomohon'),

(30, 'Kabupaten Majene'), (30, 'Kabupaten Mamasa'), (30, 'Kabupaten Mamuju'), (30, 'Kabupaten Mamuju Tengah'),
(30, 'Kabupaten Mamuju Utara'), (30, 'Kabupaten Polewali Mandar'), (30, 'Kota Mamuju'),

(31, 'Kabupaten Buru'), (31, 'Kabupaten Buru Selatan'), (31, 'Kabupaten Kepulauan Aru'), (31, 'Kabupaten Maluku Barat Daya'),
(31, 'Kabupaten Maluku Tengah'), (31, 'Kabupaten Maluku Tenggara'), (31, 'Kabupaten Maluku Tenggara Barat'), (31, 'Kabupaten Seram Bagian Barat'),
(31, 'Kabupaten Seram Bagian Timur'), (31, 'Kota Ambon'), (31, 'Kota Tual'),

(32, 'Kabupaten Halmahera Barat'), (32, 'Kabupaten Halmahera Tengah'), (32, 'Kabupaten Halmahera Utara'), (32, 'Kabupaten Halmahera Selatan'), (32, 'Kabupaten Kepulauan Sula'),
(32, 'Kabupaten Halmahera Timur'), (32, 'Kabupaten Pulau Morotai'), (32, 'Kabupaten Pulau Taliabu'), (32, 'Kota Ternate'), (32, 'Kota Tidore Kepulauan'),

(33, 'Kabupaten Asmat'), (33, 'Kabupaten Biak Numfor'), (33, 'Kabupaten Boven Digoel'), (33, 'Kabupaten Deiyai'), (33, 'Kabupaten Dogiyai'),
(33, 'Kabupaten Intan Jaya'), (33, 'Kabupaten Jayapura'), (33, 'Kabupaten Jayawijaya'), (33, 'Kabupaten Keerom'), (33, 'Kabupaten Kepulauan Yapen'),
(33, 'Kabupaten Lanny Jaya'), (33, 'Kabupaten Mamberamo Raya'), (33, 'Kabupaten Mamberamo Tengah'), (33, 'Kabupaten Mappi'), (33, 'Kabupaten Merauke'),
(33, 'Kabupaten Mimika'), (33, 'Kabupaten Nabire'), (33, 'Kabupaten Nduga'), (33, 'Kabupaten Paniai'), (33, 'Kabupaten Pegunungan Bintang'),
(33, 'Kabupaten Puncak'), (33, 'Kabupaten Puncak Jaya'), (33, 'Kabupaten Sarmi'), (33, 'Kabupaten Supiori'), (33, 'Kabupaten Tolikara'),
(33, 'Kabupaten Waropen'), (33, 'Kabupaten Yahukimo'), (33, 'Kabupaten Yalimo'), (33, 'Kota Jayapura'),

(34, 'Kabupaten Fakfak'), (34, 'Kabupaten Kaimana'), (34, 'Kabupaten Manokwari'), (34, 'Kabupaten Manokwari Selatan'), 
(34, 'Kabupaten Maybrat'), (34, 'Kabupaten Pegunungan Arfak'), (34, 'Kabupaten Raja Ampat'), (34, 'Kabupaten Sorong'), 
(34, 'Kabupaten Sorong Selatan'), (34, 'Kabupaten Tambrauw'), (34, 'Kabupaten Teluk Bintuni'), (34, 'Kabupaten Teluk Wondama');
