var mongoose = require('mongoose');
var User = mongoose.model('User');
var Folder = mongoose.model('Folder');
var FSFiles = mongoose.model('fs.files');
var File = mongoose.model('File');
var Schema = mongoose.Schema;   
var conn = mongoose.connection;
var fs = require('fs');
var Grid = require('gridfs-stream');
var gfs = Grid(conn.db, mongoose.mongo);
module.exports = (function(){
    return {
        addFolder: function(req,res){
            if(!req.session.user){
                return res.json({success: false, message: "user not logged in"});
            };
            var newFolder = new Folder(req.body);
            newFolder.fk_user = req.session.user._id;
            newFolder.save(function(err,folder){
                if(err){
                    return res.json({errors: err, success: false});
                } else if(folder){
                    return res.json({success: true, folder: folder, session: req.session});
                }
            })
        },
        getFolders: function(req,res){
            if(!req.session.user){
                return res.json({success: false, message: "user not logged in"});
            };
            Folder.find({fk_user: req.session.user._id}, function(err,folders){
                if(err){
                    return res.json({success: false, message: "error finding folders"});
                } else if (folders){
                    return res.json({success: true, folders: folders, session: req.session})
                }
            })
        },
        getFolder: function(req,res){
            Folder.findOne({_id: req.params.folderid}, function(err,folder){
                if(err){
                    return res.json({errors: err, success: false});
                } else if(!folder){
                    return res.json({success: false, message: "folder not found"});
                } else if(folder){
                    req.session.folder = folder;
                    req.session.save();
                    return res.json({success: true, folder: folder, session: req.session});
                }
            })
        },
        uploadFile: function(req,res){
            console.log('open');
            console.log(req.file);
            var writestream = gfs.createWriteStream({
                filename: req.file.originalname
            });
            fs.createReadStream(req.file.path).pipe(writestream);

            writestream.on('close', function(file){
                console.log(file);
                console.log(file.filename + ' written to db');
                fs.unlink(req.file.path);
                console.log(`successfullly deleted ${req.file.originalname}`);
//                console.log(file);
                return res.json({success: true, message: `File ${file.filename} written to DB`});
            });
            console.log(req.file);
        }
    }
})();