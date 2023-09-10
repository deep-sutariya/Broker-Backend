const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    email: {type:String, required:true},
    value: { type: Number, default: 0 }
});

module.exports = mongoose.model('CounterInfo', counterSchema);