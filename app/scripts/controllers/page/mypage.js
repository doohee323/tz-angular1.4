'use strict';

/**
 * @ngdoc function
 * @name TzUI.controller:MyPageCtrl
 * @description # Controller of the TzUI
 */
angular.module('TzUI').controller(
		'MyPageCtrl',
		[
				'$rootScope',
				'$scope',
				'$http',
				'$timeout',
				'$location',
				'StorageCtrl',
				'CommcdCtrl',
				'SessionService',
				'Session',
				'gettextCatalog',
				function($rootScope, $scope, $http, $timeout, $location, StorageCtrl, CommcdCtrl, SessionService, Session,
						gettextCatalog) {

					debugger;
					$scope.user = SessionService.getSession();

					$scope.init = function(scope) {
						$scope.username = $scope.user.id;
					}

				} ]);
