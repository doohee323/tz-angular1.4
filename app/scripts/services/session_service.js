'use strict';

angular.module('TzUI').service('SessionService',
		function($rootScope, $http, $resource, $location, config, Session, StorageCtrl,gettextCatalog) {

			return {
				login : function(userName, password, rememberMe) {

					var url = config.domain + 'authenticate';
					$.ajax({
						url : url,
						type : "POST",
						data : $.param({
							username : userName,
							password : password,
              remember_me : rememberMe
						}),
						success : function(data, textStatus, jqXHR) {
							Session.create(data);
							$rootScope.$apply(function() {
								$location.path('/page/mypage');
							});
						},
						error : function(jqXHR, textStatus, errorThrown) {
						  swal('',gettextCatalog.getString('signin.alert.fail'));
							$rootScope.authenticationError = true;
							Session.invalidate();
						}
					});
				},
				getAccount : function() {
					$rootScope.loadingAccount = true;

					$http({
						method : 'GET',
						url : config.domain + 'security/account'
					}).then(function successCallback(response) {
					}, function errorCallback(response) {
						Session.invalidate();
						$location.path('/login');
					});

				},
				isLogged : function() {
					var user = StorageCtrl.getCache('session');
					if(!user || !user.credentialsNonExpired) {
						var str = gf_GetCookie('session');
						if(str && str != 'null') {
							try{
								user = JSON.parse(str);
								Session.create(user);
								gf_SetCookie('session', null);
							} catch (e) {
								user = {};
								gf_SetCookie('session', null);
							}
						} else {
							user = {};
						}
					}
					return user.credentialsNonExpired;
				},
				getSession : function() {
					var session = StorageCtrl.getCache('session');
					if (session) {
						return session;
					}
					return {};
				},
				removeSession : function() {
					StorageCtrl.initCache('session');
				},
				isAuthorized : function(authorizedRoles) {
					if (!angular.isArray(authorizedRoles)) {
						if (authorizedRoles == '*') {
							return true;
						}
						authorizedRoles = [ authorizedRoles ];
					}
					var isAuthorized = false;
					angular.forEach(authorizedRoles, function(authorizedRole) {
						var authorized = (!!Session.login && Session.userRoles.indexOf(authorizedRole) !== -1);
						if (authorized || authorizedRole == '*') {
							isAuthorized = true;
						}
					});
					return isAuthorized;
				},
				logout : function() {
					$http({
						method : 'POST',
						url : config.domain + 'logout'
					}).finally(function (response) {
						Session.invalidate();
            $rootScope.authenticated = false;
						$location.path('/login');
					});
				}
			};
		});
