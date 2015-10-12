/* global angular */
var app = angular.module('app', ['ionic']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('/index', {
        url: '/index',
        templateUrl: '/view/index.html',
        controller: 'homepageCtrl'
    }).state('/lagou', {
        url: '/lagou',
        templateUrl: '/view/lagou.html',
        controller: 'lagouCtrl'
    }).state('/clock', {
        url: '/clock',
        templateUrl: '/view/clock.html',
        controller: 'clockCtrl'
    });
    $urlRouterProvider.otherwise('/index');
}]).run([function () {
    console.log('Hhh');
}]);