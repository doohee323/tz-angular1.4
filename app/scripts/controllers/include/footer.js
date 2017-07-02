'use strict';

/**
 * @ngdoc function
 * @name TzUI.controller:FooterCtrl
 * @description # FooterCtrl Controller of the TzUI
 */
angular.module('TzUI').controller(
		'FooterCtrl',
		[
				'$rootScope',
				'$scope',
				'$http',
				'$timeout',
				'$location',
				'StorageCtrl',
				'CommcdCtrl',
				'SessionService',
				'gettextCatalog',
				function($rootScope, $scope, $http, $timeout, $location, StorageCtrl, CommcdCtrl, SessionService,
						gettextCatalog) {

					$rootScope.authenticated = SessionService.isLogged();

					$scope.init = function(scope) {
					}

				} ]);
