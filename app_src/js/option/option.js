(function(){
	'use strict';
	angular.module('app.option', ['ngRoute', 'option-show']);
/*
	.config(function($routeProvider){
		$routeProvider
		.when('/decision/all', {
			templateUrl: 'js/decision/decision-list.html'
		})
		.when('/decision/show/:decisionId', {
			templateUrl: 'js/decision/decision-show.html'
		})
		;
	});
*/
})();

(function(){
	'use strict';
	angular.module('option-show', ['option-proOrCon'])
	.directive('dOptionShow', function(){
		return{
			restrict: 'E',
			scope: {
				data : '='
			},
			templateUrl: 'js/option/my-app-option-show.html',
			controller: 'OptionShowCtrl',
			controllerAs: 'ctrl'
		};
	})
	.controller('OptionShowCtrl', ['$scope', function($scope){

		var vm = this;
		vm.data = $scope.data;

		function init(){
			
		}

		init();
	}]);
})();

(function(){
	'use strict';
	angular.module('option-proOrCon', [])
	.directive('dProOrConShow', function(){
		return{
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'js/option/my-app-pro-or-con-show.html'
		};
	})
	.directive('dProConSign', function(){
		return{
			restrict: 'E',
			scope: {
				data: '@'
			},
			template: '<i class="{{cssClass}}"></i> ',
			link: function(scope, elem, attrs) {
				if(scope.data === 'pro'){
					scope.cssClass = 'fa fa-plus';
				}
				else{
					scope.cssClass = 'fa fa-minus';
				}
			}
		};
	});
})();