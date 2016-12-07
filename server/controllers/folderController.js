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
            Folder.findOne({_id: req.params.folderid})
                .populate('fk_items')
                .populate('fk_user')
                .populate({
                    path: 'fk_items',
                    populate: {
                        path: 'fk_file',
                        model: 'fs.files'
                    }
                })
                .populate({
                    path: 'fk_items',
                    populate: {
                        path: 'fk_user',
                        model: 'User'
                    }
                })
                .exec(function(err,folder){
                if(err){
                    return res.json({errors: err, success: false});
                } else if(!folder){
                    return res.json({success: false, message: "folder not found"});
                } else if(folder){
                    req.session.folder = folder;
                    req.session.save();
                    return res.json({success: true, folder: folder, session: req.session});
                }
            });
        },
        refreshFolder: function(req,res){
            if(!req.session.folder){
                return res.json({success: false, message: 'no target folder'});
            } else if (req.session.folder){
                Folder.findOne({_id: req.session.folder._id})
                    .populate('fk_items')   
                    .populate('fk_user')
                    .populate({
                        path: 'fk_items',
                        populate: {
                            path: 'fk_file',
                            model: 'fs.files'
                        }
                    })
                    .populate({
                        path: 'fk_items',
                        populate: {
                            path: 'fk_user',
                            model: 'User'
                        }
                    })
                    .exec(function(err, folder){
                    if(err){
                        return res.json({success: false});
                    } else if (folder){
                        return res.json({success: true, folder: folder});
                    } else {
                        return res.json({success: false});
                    }
                });
            } else {
                return res.json({success: false});
            }
        },
        uploadFile: function(req,res){
            if(!req.session.user){
                return res.json({success: false, message: 'User not logged in'});
            } else if (!req.session.folder){
                return res.json({success: false, message: 'Target Folder not found'})
            } else {
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
                    var newFile = new File();
                    newFile.fk_file = file._id;
                    newFile.fk_user = req.session.user._id;
                    newFile.type = req.params.fileType;
                    newFile.save(function(err1,fileEntry){
                        if(err1){
                            return res.json({success: false, message: 'File not linked'})
                        } else if(fileEntry){
                            Folder.findOne({_id: req.session.folder._id}, function(err2, targetFolder){
                                targetFolder.fk_items.push(fileEntry._id);
                                targetFolder.save(function(err2, updatedFolder){
                                    return res.json({success: true, file: file, fileEntry: fileEntry,  targetFolder: targetFolder});
                                })
                            })
                        }
                    })
    //                console.log(file);
    //                return res.json({success: true, message: `File ${file.filename} written to DB`});

                });
            }
            
        },
        getFile: function(req,res){
            if(!req.params){
                return res.json({});
            }
            FSFiles.findOne({filename:req.params.filename}, function(err, file){
                if(err){
                    return res.json({errors: err});
                } else if (file){
//                    var fs_write_stream = fs.createWriteStream(file.filename);
                    var readstream = gfs.createReadStream({
                        filename: req.params.filename
                    });
                    readstream.pipe(res);
                } else {
                    return res.json({});
                }
            })
        }
    }
})();