
# Name Module
#
# @abstract Description
#
app = angular.module 'app', ['list-all.tmp.jade'], () ->
	# configuration handler

app.config ($routeProvider) ->
	$routeProvider.
		when('decision/all', {
				templateUrl: 'list-all.tmp.jade',
				controller: 'ListDecisionCtrl'
			})

app.controller ListDecisionCtrl