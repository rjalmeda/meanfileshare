var mongoose = require('mongoose');
var FsSchema = mongoose.Schema({
    _id: Number,
    filename: String,
    length: Number
});
mongoose.model('fs.files', FsSchema);