app.controller('dashboardController', function($scope, $location, dashboardFactory, loginFactory){
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
})