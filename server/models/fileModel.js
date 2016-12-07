var mongoose = require('mongoose');
var FileSchema = mongoose.Schema({
    fk_file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fs.files'
    },
    type: String,
    fk_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
mongoose.model('File', FileSchema);