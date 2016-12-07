app.factory('loginFactory', function($http){
    var factory = {};
    factory.checkUser = function(callback){
        $http.get('/checkUser').then(function(data){
            callback(data);
        });
    };
    factory.registerUser = function(user, callback){
        $http.post('/registerUser', user).then(function(data){
            callback(data);
        })
    };
    factory.loginUser = function(user, callback){
        $http.post('/loginUser', user).then(function(data){
            callback(data);
        })
    };
    return factory;
})