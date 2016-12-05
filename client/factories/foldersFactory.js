app.factory('foldersFactory', function($http){
    var factory = {};
    factory.addFolder = function(folder, callback){
        $http.post('/addFolder', folder).then(function(data){
            callback(data);
        })
    };
    
    factory.getFolders = function(callback){
        $http.get('/getFolders').then(function(data){
            callback(data);
        })
    };
    
    factory.getFolder = function(folder, callback){
        $http.get('/getFolder/'+folder._id).then(function(data){
            callback(data);
        });
    };
    
    factory.uploadFile = function(file, callback){
        var fd = new FormData();
        fd.append('file', file);
        $http.post('/uploadFile', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function(data){
            callback(data);
        });
    }
    return factory;
})