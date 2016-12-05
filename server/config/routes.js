var userController = require('./../controllers/userController.js');
var folderController = require('./../controllers/folderController.js');
var multer  = require('multer')
var upload = multer({ dest: 'uploads' })
module.exports = function(app){
    app.get('/checkUser', function(req,res){
        userController.checkUser(req,res);
    });
    app.post('/registerUser', function(req,res){
        userController.registerUser(req,res);
    });
    app.post('/loginUser', function(req,res){
        userController.loginUser(req,res);
    });
    app.post('/addFolder', function(req,res){
        folderController.addFolder(req,res);
    });
    app.get('/getFolders', function(req,res){
        folderController.getFolders(req,res);
    });
    app.get('/getFolder/:folderid', function(req,res){
        folderController.getFolder(req,res);
    });
    app.post('/uploadFile', upload.single('file'), function(req,res){
        folderController.uploadFile(req,res);
    })
}