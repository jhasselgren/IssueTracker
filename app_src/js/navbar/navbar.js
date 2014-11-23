(function(){
	/**
	* app.navbar Module
	*
	* Description
	*/
	angular.module('app.navbar', [])
	.directive('dNavbar', function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {}, // {} = isolate, true = child, false/undefined = no change
			controller: 'NavbarCtrl',
			controllerAs: 'ctrl',
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: 'js/navbar/my-app-navbar.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			// link: function($scope, iElm, iAttrs, controller) {}
		};
	})
	.controller('NavbarCtrl', ['$scope', 'Data', function($scope, Data){
		
		var vm = this;

		var changeData = function ChangeData(){
			Data.changeData();
		};

		vm.changeData = changeData;
	}]);
})();