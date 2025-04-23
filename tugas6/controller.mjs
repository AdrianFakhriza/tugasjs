import users from "./data.mjs";

const index = () => {
    const dataList = users.map((user, index) => {
        console.log(`User ${index + 1}:`);
        console.log(`Nama: ${user.nama}`);
        console.log(`Umur: ${user.umur}`);
        console.log(`Alamat: ${user.alamat}`);
        console.log(`Email: ${user.email}`);
        console.log('-------------------');
        return user;
    });
    return dataList;
};

const store = (user) => {
    const newUsers = [
        { nama: 'User Baru 1', umur: 30, alamat: 'Jl. Baru 1', email: 'baru1@gmail.com' },
        { nama: 'User Baru 2', umur: 31, alamat: 'Jl. Baru 2', email: 'baru2@gmail.com' }
    ];
    
    users.push(...newUsers);
    console.log('Data baru berhasil ditambahkan!');
    return users;
};

const destroy = () => {
    if (users.length > 0) {
        const removedUser = users.pop();
        console.log(`Data terakhir dihapus: ${removedUser.nama}`);
    } else {
        console.log('Tidak ada data yang bisa dihapus');
    }
    return users;
};

export { index, store, destroy };