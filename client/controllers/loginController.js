app.controller('loginController', function($scope, $location, loginFactory){
    function checkUser(){
        loginFactory.checkUser(function(data){
            console.log(data);
        });
    };
    checkUser();
    $scope.registerErrors = [];
    $scope.loginErrors = [];
    $scope.registerUser = function(user){
        $scope.registerErrors = [];
        if(!user){
            return
        } else if (!user.username){
            return $scope.registerErrors.push("username is empty");
        } else if (user.username.length < 6){
            return $scope.registerErrors.push("username must be at least 6 characters");
        } else if (!user.password){
            return $scope.registerErrors.push("password is empty");
        } else if (user.password.length < 8){
            return $scope.registerErrors.push("password must be at least 8 characters");
        } else {
            loginFactory.registerUser(user, function(data){
                console.log(data);
                if(data.data.errors){
                    return $scope.registerErrors.push("error registering");
                };
                return $location.url('/dashboard');
            })
        }
    };
    $scope.loginUser = function(user){
        $scope.loginErrors = [];
        if(!user){
            return
        } else if (!user.username){
            $scope.loginErrors.push("Error Logging In")
        } else if (!user.password){
            $scope.loginErrors.push("Error Logging In")
        } else {
            loginFactory.loginUser(user, function(data){
                console.log(data);
                if(data.data.errors){
                return $scope.loginErrors.push("Error Loggin In");
                } else if (!data.data.success){
                    return $scope.loginErrors.push("Error Loggin In");
                } else if (data.data.success){
                    return $location.url('/dashboard');
                }
            })
        }
    }
})