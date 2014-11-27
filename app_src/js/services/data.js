(function(){
	'use strict';
	var app = angular.module('app.data', []);

	app.service('Data', function Data($q, $http){
		var service = this;

		var getAllDecisions = function(){

			var promise = $http.get('/api/decision');

			return promise;
		};

		var getDecision = function(id){

			var promise = $http.get('/api/decision/'+id);
			

			return promise;
		};

		var createDecision = function(newDecision){

			var promise = $http.post('/api/decision', newDecision);

			return promise;
		};

		var updateDecision = function(decision){

			var id = decision.id;
			var promise = $http.put('/api/decision/'+id, decision);

			return promise;
		};

		service.getAllDecisions = getAllDecisions;
		service.getDecision = getDecision;
		service.saveDecision = createDecision;
		service.updateDecision = updateDecision;

		return service;
	});

})();