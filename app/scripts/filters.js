/**
 * @ngdoc filters
 * @name TzUI.filters
 * @description # Filters of the TzUI
 */
angular.module('TzUI').filter('dateFormat', function($filter, StorageCtrl) {
	var filter = function(input, miliseconds) {
		if (input == null) {
			return "";
		}
		if (miliseconds == null) {
			miliseconds = 0;
		}
		var lang = StorageCtrl.getCache('lang');
		var format = 'MMM dd yyyy';
		if (lang.includes("ko")) {
			format = 'yyyy/MM/dd';
		}
		return $filter('date')(input + miliseconds, format);
	};
	filter.$stateful = true;

	return filter;
});

angular.module('TzUI').filter('dateTimeFormat', function($filter, StorageCtrl) {
	var filter = function(input, miliseconds) {
		if (input == null) {
			return "";
		}
		if (miliseconds == null) {
			miliseconds = 0;
		}
		var lang = StorageCtrl.getCache('lang');
		var format = 'MMM dd yyyy h:mm a';
		if (lang.includes("ko")) {
			format = 'yyyy/MM/dd h:mm a';
		}
		return $filter('date')(input + miliseconds, format);
	};
	filter.$stateful = true;

	return filter;
});
