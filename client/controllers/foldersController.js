app.controller('foldersController', function($scope, $location, foldersFactory, loginFactory){
    $scope.user = {};
    function checkUser(){
        loginFactory.checkUser(function(data){
            console.log(data);
            if(!data.data.success){
                $location.url('/login');
            } else if (data.data.user){
                $scope.user = data.data.user;
            }
        });
    };
    checkUser();
    
    $scope.folder = {};
    $scope.folders = [];
    $scope.folderName ; '';
    $scope.onFolder = function(){
        if($scope.folder){
            return true;
        } else if(!$scope.folder){
            return false;
        } else{
            return false;
        }
    }
    
    $scope.getFolders = function(){
        foldersFactory.getFolders(function(data){
            console.log(data);
            $scope.folders = data.data.folders;
        })
    };
    
    $scope.addFolder = function(){
        if(!$scope.folderName){
            return console.log("folder name is empty");
        };
        var newfolder = {
            folderName: $scope.folderName
        };
        foldersFactory.addFolder(newfolder, function(data){
            console.log(data);
            if(data.data.success){
                $scope.getFolders();
                $scope.folderName = '';
            }
        })
    };
    
    $scope.getFolder = function(folder){
        foldersFactory.getFolder(folder, function(data){
            console.log(data);
            if(data.data.success){
                $scope.folder = data.data.folder;
                $scope.onFolder();
            }
        })
    };
    
    $scope.refreshFolder = function(){
        foldersFactory.refreshFolder(function(data){
            console.log(data);
            if(data.data.success){
                $scope.folder = data.data.folder
            }
        })
    };
    
    $scope.myfile = {};
    $scope.setFile = function(files){
        $scope.myfile = files[0];
        console.log($scope.myfile);
    };
    
    function checkValidFileExtension(filename){
//        var validExtensions = ['.mp3', '.MP3', '.jpg', '.JPG', 'JPEG', 'jpeg', '.gif', '.GIF', '.mp4', '.MP4', '.MOV', '.mov', '.mpg', '.MPG', '.avi', '.AVI', '.png', '.PNG'];
        var validExtensions = {
            '.mp3': 'sound',
            '.MP3': 'sound',
            '.jpg': 'picture',
            '.JPG': 'picture',
            'jpeg': 'picture',
            'JPEG': 'picture',
            '.gif': 'picture',
            '.GIF': 'picture',
            '.mp4': 'video',
            '.MP4': 'video',
            '.mov': 'video',
            '.MOV': 'video',
            '.mpg': 'video',
            '.MPG': 'video'
        };
        var fileExtension = filename.substring(filename.length-4);
        if(!validExtensions[fileExtension]){
            return false
        } else if(validExtensions[fileExtension]){
            return validExtensions[fileExtension];
        } else {
            return false
        }
//        console.log(fileExtension);
//        for (var i = 0; i < validExtensions.length; i++){
//            if(fileExtension === validExtensions[i]){
//                return fileExtension;
//            }
//        };
//        return false;
    }
    
    
    $scope.uploadFile = function(){
        if(!$scope.myfile){
            return console.log('No file to upload');
        } else if (!$scope.onFolder()){
            return console.log('No folder to upload to');
        } else {
            if(checkValidFileExtension($scope.myfile.name)){
                var fileType = checkValidFileExtension($scope.myfile.name);
                foldersFactory.uploadFile($scope.myfile, fileType, function(data){
                    console.log(data);
                    if(data.data.success){
                        $scope.refreshFolder();
                    };
                });
            } else {
                return console.log('not a valid file extension');
            }
            
        }
    };
    
});