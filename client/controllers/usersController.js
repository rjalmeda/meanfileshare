app.controller('usersController', function($scope, $location, usersFactory, loginFactory){
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
});