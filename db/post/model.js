const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
    title: String,
    content: String,
});

schema.plugin(paginate);

module.exports = mongoose.model('Post', schema);
