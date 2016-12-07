var mongoose = require('mongoose');
var FolderSchema = mongoose.Schema({
    folderName: String,
    keywords: [String],
    rank: Number,
    fk_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fk_items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }]
});
mongoose.model('Folder', FolderSchema);