'use strict';

/**
 * @ngdoc overview
 * @name TzUI
 * @description # TzUI
 * 
 * Main module of the application.
 */

// for local
var config = {
	domain : 'http://localhost:8080/',
	baseUrl : 'http://localhost:8080/',
	NODE_ENV : 'development',
	accessible : [ '/', '/login*', '/logout*' ]
};

angular.module(
		'TzUI',
		[ 'ngAnimate', 'ngCookies', 'ngMessages', 'ngResource', 'ngRoute', 'ngSanitize', 'gettext', 'gettext_translation',
				'ngMaterial' ]).constant('config', config).config(function($routeProvider, $locationProvider, $httpProvider) {

	$httpProvider.interceptors.push('interceptors');

	$routeProvider.when('/', {
		redirectTo : 'login'
	}).when('/login', {
		templateUrl : 'views/login.html',
		controller : 'LoginCtrl',
		controllerAs : 'login'
	}).when('/page/mypage', {
		templateUrl : 'views/page/mypage.html',
		controller : 'MyPageCtrl',
		controllerAs : 'mypage'
	}).otherwise({
		redirectTo : 'login'
	});

}).run(
		[
				'$rootScope',
				'$http',
				'$timeout',
				'$location',
				'$window',
				'StorageCtrl',
				'SessionService',
				'CommcdCtrl',
				'gettextCatalog',
				function($rootScope, $http, $timeout, $location, $window, StorageCtrl, SessionService, CommcdCtrl,
						gettextCatalog) {

					$rootScope.setLang = function(lang, isDebug) {
						if (lang) {
							gettextCatalog.setCurrentLanguage(lang);
						} else {
							gettextCatalog.setCurrentLanguage('en_US');
						}
						gettextCatalog.debug = isDebug;
					}

					var language = navigator.languages && navigator.languages[0] || // Chrome / Firefox
					navigator.language || // All browsers
					navigator.userLanguage; // IE <= 10

					$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {

						if (!SessionService.isLogged()) {
							var bchk = false;
							for ( var i in config.accessible) {
								var rsc = config.accessible[i];
								if (rsc.indexOf('*') > -1) {
									rsc = rsc.substring(0, rsc.indexOf('*'));
									if ($location.$$path.indexOf(rsc) > -1) {
										bchk = true;
										break;
									}
								} else {
									if ($location.$$path === rsc) {
										bchk = true;
										break;
									}
								}
							}
						}

					});

					var lang = language.substr(0, 2) == "ko" ? "ko_KR" : "en_US";
					if (JSON.stringify(StorageCtrl.getCache('lang')) == "{}") {
						StorageCtrl.setCache('lang', lang, 100000);
					}

					lang = StorageCtrl.getCache('lang');
					$rootScope.setLang(lang, true);

				} ]);
