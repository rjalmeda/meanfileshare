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
    $scope.myfile = {};
    
    $scope.setFile = function(files){
        $scope.myfile = files[0];
        console.log($scope.myfile);
    };
    
    $scope.uploadFile = function(){
        foldersFactory.uploadFile($scope.myfile, function(data){
            console.log(data);
        });
    };
    
});