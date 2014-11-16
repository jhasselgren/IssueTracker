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

