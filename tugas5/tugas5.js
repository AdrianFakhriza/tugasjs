let productList = [
    { id: 1, nama: "Laptop", harga: 12000000 },
    { id: 2, nama: "Smartphone", harga: 5000000 },
    { id: 3, nama: "Tablet", harga: 7000000 },
    { id: 4, nama: "Smartwatch", harga: 2500000 },
    { id: 5, nama: "Headphones", harga: 1500000 }
];

//spread operator
function tambahProduk(id, nama, harga) {
    productList = [...productList, { id, nama, harga }];
    console.log(`Produk baru ditambahkan: ${nama}`);
}

//rest parameter
function hapusProduk(...ids) {
    productList = productList.filter(produk => !ids.includes(produk.id));
    console.log(`Produk dengan ID ${ids} dihapus`);
}

//destructuring
function tampilkanProduk() {
    console.log("Daftar Produk:");
    productList.forEach(({ id, nama, harga }) => {
        console.log(`ID: ${id}, Nama: ${nama}, Harga: Rp ${harga.toLocaleString()}`);
    });
}

const eventHandler = {
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Aplikasi Product Management siap digunakan');
        });
    }
};

eventHandler.init();

console.log("Daftar Produk Awal:");
tampilkanProduk();

tambahProduk(6, "Smart Speaker", 3000000);

hapusProduk(2, 4);

tampilkanProduk();