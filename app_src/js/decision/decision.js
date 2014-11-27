(function(){
	angular.module('app.decision', ['ngRoute', 'decision-list', 'decision-show', 'decision-create', 'decision-update'])
	.config(function($routeProvider){
		$routeProvider
		.when('/decision/all', {
			templateUrl: 'js/decision/decision-list.html'
		})
		.when('/decision/show/:decisionId', {
			templateUrl: 'js/decision/decision-show.html',
			controller: 'DecisionCtrl',
			controllerAs: 'ctrl'
		})
		.when('/decision/create', {
			templateUrl: 'js/decision/decision-create.html'
		})
		;
	})
	.controller('DecisionCtrl', function($routeParams, Data){
		var vm = this;

		vm.data = {};
		
		vm.view = {
			edit: false
		};

		function init(){
			var decisionId = $routeParams.decisionId;
			loadDecision(decisionId);
		}

		function loadDecision(id){

			var promise = Data.getDecision(id);

			promise.then(function(res){
				vm.data.decision = res.data;
			});
		}

		vm.completedEdit = function completedEdit(){
			vm.view.edit = false;
		};

		init();

	});
})();

(function(){
	angular.module('decision-show', ['app.option'])
	.directive('dDecisionShow', function(){
		return{
			restrict: 'E',
			scope: {data : '='},
			templateUrl: 'js/decision/my-app-decision-show.html',
			controller: 'DecisonShowCtrl',
			controllerAs: 'ctrl'
		};
	})
	.controller('DecisonShowCtrl', function($scope){
		
		var vm = this;

		vm.data = $scope.data;

	});
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
	angular.module('decision-update', ['app.data'])
	.directive('dDecisionUpdate', function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {
				data: '=',
				completed: '&'
			}, // {} = isolate, true = child, false/undefined = no change
			controller: 'DecisionUpdateCtrl',
			controllerAs: 'ctrl',
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: 'js/decision/my-app-decision-update.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			// link: function($scope, iElm, iAttrs, controller) { }
		};
	})
	.controller('DecisionUpdateCtrl', ['$scope', '$window', 'Data', function($scope, $window, Data){
		var vm = this;
		vm.data = {};

		function saveDecision(){
			var promise = Data.updateDecision(vm.data.decision);

			promise.then(
				function(res){
					vm.data.decision = res.data;
					$scope.completed();
				},
				function(error){
					$window.alert(error);
				}
			);
		}

		function cancelEdit(){
			var promise = Data.getDecision(vm.data.id);

			promise.then(function(res){
				vm.data.decision = res.data;
				$scope.completed();
			});
		}

		vm.data = $scope.data;
		vm.save = saveDecision;
		vm.cancel = cancelEdit;
		

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

		var decisions;

		function init(){
			var promise = Data.getAllDecisions();

			promise.then(function(res){
				vm.data.decisions = res.data;
			});
		}

		init();
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