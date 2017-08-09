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

					$scope.user = SessionService.getSession();

					$scope.init = function(scope) {
						$http({
							method : 'GET',
							url : config.domain + 'home'
						}).then(function successCallback(response) {
							$scope.viewerCountry = response.data.viewerCountry;
						}, function errorCallback(response) {
							swal('', gettextCatalog.getString('mypage.error.get.country'));
						});
					}

				} ]);
