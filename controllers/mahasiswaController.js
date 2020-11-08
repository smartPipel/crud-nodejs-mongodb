const Mahasiswa = require('../models/Mahasiswa');


module.exports = {
    viewMahasiswa: async (req, res) => {

        try {
            const mahasiswa = await Mahasiswa.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus')
            
            const alert = { message: alertMessage, status: alertStatus};
            const notFound = req.flash("Nama mahasiswa tidak ditemukan");

            res.render('index', {
                mahasiswa,
                alert,
                title: "CRUD Mahasiswa",
                notFound
            })

        } catch (error) {
            res.redirect('/mahasiswa');
            console.log(error)
        }
    },

    addMahasiswa:  async (req, res) => {
        try {
            const { nama, nim, jurusan, alamat } = req.body;

            await Mahasiswa.create({ nama, nim, jurusan, alamat });

            req.flash("alertMessage", "Success add data mahasiswa");
            req.flash("alertStatus", "success");
            res.redirect('/mahasiswa');

        } catch (error) {
            
            req.flash("alertMessage", "Failed add data mahasiswa");
            req.flash("alertStatus", "danger");
            res.redirect('/mahasiswa');

            console.log(error);
        }

    },

    editMahasiswa: async (req, res) => {

        try {
            
            const { id, nama, nim, jurusan, alamat } = req.body;

            const mahasiswa = await Mahasiswa.findOne({_id: id})

            mahasiswa.nama = nama;
            mahasiswa.nim = nim;
            mahasiswa.jurusan = jurusan;
            mahasiswa.alamat = alamat;

            await mahasiswa.save();

            req.flash("alertMessage", "Success update data mahasiswa");
            req.flash("alertStatus", "success");
            res.redirect('/mahasiswa');

        } catch (error) {
            req.flash("alertMessage", "Failed to update data mahasiswa");
            req.flash("alertStatus", "danger");
            res.redirect('/mahasiswa');

            console.log(error);
        }
    },

    deleteMahasiswa: async (req, res) => {
        try {
            
            const { id } = req.params;

            const mahasiswa = await Mahasiswa.findOne({_id: id});

            mahasiswa.remove();

            req.flash("alertMessage", "Success delete data mahasiswa");
            req.flash("alertStatus", "warning");
            // setelah berhasil remove maka melakukan redirect
            res.redirect("/mahasiswa");

        } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            // ketika inputa kosong redirect kehalaman
            res.redirect("/mahasiswa");

            console.log(error)
        }
    },

    // searchMahasiswa: async (req, res)  => {
    //     try {
            
    //         const { search } = req.params;

    //         const mahasiswa = await Mahasiswa.find({nama: search});

    //         if(!mahasiswa || mahasiswa === 0) req.flash("notFound")

    //         res.status(200).send(mahasiswa);

    //         res.redirect("/mahasiswa");s

    //     } catch (error) {
    //         res.redirect("/mahasiswa");

    //         console.log(error)
    //     }
    // }
}