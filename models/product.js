var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//creating a blueprint model for products

var schema = new Schema({
    imagePath: { type: String, required: true},
    title: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true}
});

//exporting model  to make new products.
module.exports = mongoose.model('Product', schema);

