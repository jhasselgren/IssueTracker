

(function() {
	var app = angular.module('app', ['ngRoute', 'app.decision']);

	app.config(['$routeProvider',function($routeProvider) {
		$routeProvider.otherwise({redirectTo: 'decision/all'});
	}]);
})();
