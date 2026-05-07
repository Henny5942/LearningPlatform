const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    name: {
        type: String,
        required: true,
        maxlength: 100
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);