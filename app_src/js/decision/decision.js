(function(){
	angular.module('app.decision', ['ngRoute', 'decision-list', 'decision-show'])
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
})();

(function(){
	angular.module('decision-show', ['app.data', 'app.option'])
	.directive('dDecisionShow', function(){
		return{
			restrict: 'E',
			scope: {},
			templateUrl: 'js/decision/my-app-decision-show.html',
			controller: 'DecisonShowCtrl',
			controllerAs: 'ctrl'
		}
	})
	.controller('DecisonShowCtrl', ['$routeParams', 'Data', function($routeParams, Data){
		
		var vm = this;

		function init(){
			var decisionId = $routeParams.decisionId;
			loadDecision(decisionId);
		};

		var loadDecision = function(id){
			vm.data = Data.getDecision(id);
		};

		init();
	}])
})();

(function(){
	angular.module('decision-list', ['app.data', 'decision-list-item'])
	.directive('dDecisionList', function(){
		return{
			restrict: 'E',
			scope:{},
			templateUrl: 'js/decision/my-app-decision-list.html',
			replace: false,
			controller: 'DecisonListCtrl',
			controllerAs: 'ctrl'
		}
	})
	.controller('DecisonListCtrl', ['Data', function(Data){
		var vm = this;
		vm.data = {};

		vm.data.decisions = function(){
			return Data.getAllDecisions();
		};
	}]);

	angular.module('decision-list-item', [])
	.directive('dDecisionListItem', function(){
		return{
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'js/decision/my-app-decision-list-item.html',
			replace: false,
			controller: 'DecisonListItemCtrl',
			controllerAs: 'ctrl'
		}
	})
	.controller('DecisonListItemCtrl', ['$scope', function($scope){
		this.data = $scope.data;
	}]);
})();