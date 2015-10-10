/* global angular */
var app = angular.module('app', ['ionic']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('/homepage', {
        url: '/homepage',
        templateUrl: '/view/homepage.html',
        controller: 'homepageCtrl'
    });
    $urlRouterProvider.otherwise('/homepage');
}]).run([function () {
    console.log('Hhh');
}]);