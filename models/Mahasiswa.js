const mongoose = require('mongoose');



const MahasiswaSchema = mongoose.Schema({
    nama: {
        type: String,
        require: true,
        min: 8
    },
    nim: {
        type: Number,
        require: true,
        min: 5
    },
    jurusan: {
        type: String,
        require: true
    },
    alamat: {
        type: String,
        require: true,
    },
    insert_date : {
        type : Date,
        default : Date.now()
    },
   
});

module.exports = new mongoose.model('Mahasiswa', MahasiswaSchema);