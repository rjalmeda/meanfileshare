var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginController'
    })
    .when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'dashboardController'
    })
    .when('/friends', {
        templateUrl: 'partials/friends.html',
        controller: 'friendsController'
    })
    .when('/folders', {
        templateUrl: 'partials/folders.html',
        controller: 'foldersController'
    })
    .when('/users', {
        templateUrl: 'partials/users.html',
        controller: 'usersController'
    })
    .otherwise({
        redirectTo: '/login'
    })
})