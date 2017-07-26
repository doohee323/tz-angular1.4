'use strict';

/**
 * @ngdoc function
 * @name TzUI.controller:LoginCtrl
 * @description # Controller of the TzUI
 */
angular.module('TzUI').controller(
		'LoginCtrl',
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

					$scope.init = function(scope) {
						$scope.username = 'doogee323@gmail.com';
						$scope.password = '971097';
					}

					$scope.login = function() {
						var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

						if ($scope.username == undefined || $scope.username.trim() == '') {
							swal('', gettextCatalog.getString('signin.alert.enter.email'));
							return;
						}

						if (!regExp.test($scope.username)) {
							swal('', gettextCatalog.getString('signin.alert.invalid.email'));
							return;
						}

						if ($scope.password == undefined || $scope.password.trim() == '') {
							swal('', gettextCatalog.getString('signin.alert.enter.password'));
							return;
						}

						$rootScope.authenticationError = false;
						SessionService.login($scope.username, $scope.password, $scope.rememberMe);
					}

					$scope.socialLogin = function(kind) {

						if (kind == 'facebook') {
							gf_SetCookie('social', 'facebook');
						} else {
							gf_SetCookie('social', 'google');
						}

						if (document.location.href.indexOf('9999') > -1) {
							//document.location = 'http://localhost:8080/sociallogin';
							if (kind == 'facebook') {
								$("#facebook_connect").attr("action", "http://localhost:8080/signin/facebook");
								$("#facebook_connect").submit();
							} else {
								$("#google_connect").attr("action", "http://localhost:8080/signin/google");
								$("#google_connect").submit();
							}

						} else {
							//	document.location = '/sociallogin';
							if (kind == 'facebook') {
								$("#facebook_connect").attr("action", "/signin/facebook");
								$("#facebook_connect").submit();
							} else {
								$("#google_connect").attr("action", "/signin/google");
								$("#google_connect").submit();
							}
						}

					}

				} ]);
