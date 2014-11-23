

(function() {
	var app = angular.module('app', ['ngRoute', 'app.decision', 'app.navbar']);

	app.config(['$routeProvider',function($routeProvider) {
		$routeProvider.otherwise({redirectTo: 'decision/all'});
	}]);
})();
