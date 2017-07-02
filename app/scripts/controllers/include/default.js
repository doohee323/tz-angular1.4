'use strict';

/**
 * @ngdoc function
 * @name TzUI.controller:DefaultCtrl
 * @description # Controller of the TzUI
 */
angular.module('TzUI').controller(
		'DefaultCtrl',
		[ '$scope', '$http', '$timeout', '$location', 'StorageCtrl', 'SessionService', 'CommcdCtrl',
				function($scope, $http, $timeout, $location, StorageCtrl, SessionService, CommcdCtrl) {

					$scope.init = function(scope) {

					}
				} ]);
