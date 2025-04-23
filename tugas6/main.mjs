import { index, store, destroy } from "./controller.mjs";

const main = () => {
    console.log('=== Menampilkan Data Awal ===');
    index();

    console.log('\n=== Menambah Data ===');
    store();

    console.log('\n=== Menampilkan Data Setelah Penambahan ===');
    index();

    console.log('\n=== Menghapus Data Terakhir ===');
    destroy();

    console.log('\n=== Menampilkan Data Setelah Penghapusan ===');
    index();
};

main();