var mongoose = require('mongoose');
var FsSchema = mongoose.Schema({
    filename: String,
    length: Number
});
mongoose.model('fs.files', FsSchema);