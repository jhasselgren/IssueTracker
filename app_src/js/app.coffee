# app Module
#
# @abstract Description
#
app = angular.module 'app', [
            'ngRoute',
            'ngSanitize',
            'ngAnimate']


app.config ($routeProvider) ->
	$routeProvider.otherwise({redirectTo: 'decision/all'})

	# configuration handler




#// Declare app level module which depends on views, and components
#angular.module('myApp', [
#  'ngRoute',
#  'myApp.view1',
#  'myApp.view2',
#  'myApp.version'
#]).
#config(['$routeProvider', function($routeProvider) {
#  $routeProvider.otherwise({redirectTo: '/decision/all'});
#}]);
