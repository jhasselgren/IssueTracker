(function(){
	angular.module('app.decision', ['ngRoute', 'decision-list', 'decision-show', 'decision-create'])
	.config(function($routeProvider){
		$routeProvider
		.when('/decision/all', {
			templateUrl: 'js/decision/decision-list.html'
		})
		.when('/decision/show/:decisionId', {
			templateUrl: 'js/decision/decision-show.html'
		})
		.when('/decision/create', {
			templateUrl: 'js/decision/decision-create.html'
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
		};
	})
	.controller('DecisonShowCtrl', ['$routeParams', 'Data', function($routeParams, Data){
		
		var vm = this;

		function init(){
			var decisionId = $routeParams.decisionId;
			loadDecision(decisionId);
		}

		var loadDecision = function(id){
			vm.data = Data.getDecision(id);
		};

		init();
	}]);
})();

(function(){
	angular.module('decision-create', ['app.data'])
	.directive('dDecisionCreate', function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {}, // {} = isolate, true = child, false/undefined = no change
			controller: 'DecisonCreateCtrl',
			controllerAs: 'ctrl',
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: 'js/decision/my-app-decision-create.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			// link: function($scope, iElm, iAttrs, controller) {}
		};
	})
	.controller('DecisonCreateCtrl', ['$scope', '$window', 'Data', function($scope, $window, Data){
		var vm = this;

		function init(){
			vm.data = {
				title: 'test'
			};

			//vm.save = saveDecision;
		}

		vm.save = function saveDecision(){
			var promise = Data.saveDecision(vm.data);

			promise.then(
				function(data){
					$window.alert('success');
				},
				function(error){
					$window.alert(error);
				});

		};

		init();

	}]);
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
		};
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
		};
	})
	.controller('DecisonListItemCtrl', ['$scope', function($scope){
		this.data = $scope.data;
	}]);
})();