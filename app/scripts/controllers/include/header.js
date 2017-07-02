'use strict';

/**
 * @ngdoc function
 * @name TzUI.controller:HeaderCtrl
 * @description # HeaderCtrl Controller of the TzUI
 */
angular.module('TzUI').controller(
		'HeaderCtrl',
		[ '$rootScope', '$scope', '$http', '$timeout', '$location', 'StorageCtrl', 'CommcdCtrl', 'SessionService',
				'$interval', 'gettextCatalog', '$window',
				function($rootScope, $scope, $http, $timeout, $location, StorageCtrl, CommcdCtrl, SessionService) {

					$rootScope.authenticated = SessionService.isLogged();

					$scope.init = function(scope) {
					}

					$scope.logout = function() {
						SessionService.logout();
					}

					$scope.goLogin = function() {
						$location.path("login");
					}

					$scope.getLocale = function() {
						var lang = 'en_US';
						$scope.tempLang = 'en';
						$('html').attr('lang', lang.substr(0, 2));
						StorageCtrl.setCache('lang', lang, 100000);
						$rootScope.setLang(lang);
					}
					
					$scope.changeLocale = function(lang) {
						$("html").attr("lang",lang.substr(0,2));
				    StorageCtrl.setCache('lang', lang, 100000);
            $rootScope.setLang(lang);
            if(lang ==='en_US'){
              $scope.tempLang = 'en';
            }else{
              $scope.tempLang = 'ko';
            }
					}

					$scope.getLocale();

				} ]);
