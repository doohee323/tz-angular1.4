'use strict';

angular.module('TzUI').factory('CommcdCtrl', function($http) {
	function setCache(cacheKey, cacheData, expires) {
		cacheKey = cacheKey.replace(/&/g, '').replace(/\?/g, '').replace(/,/g, '');
		if (expires === undefined || expires === 'null') {
			expires = _super.config.cache.expire;
		}
		var date = new Date();
		var schedule = Math.round((date.setSeconds(date.getSeconds() + expires)) / 1000);
		try {
			localStorage.setItem(cacheKey, JSON.stringify(cacheData));
			localStorage.setItem(cacheKey + '_time', schedule);
		} catch (e) {
			localStorage.clear();
			localStorage.setItem(cacheKey, JSON.stringify(cacheData));
			localStorage.setItem(cacheKey + '_time', schedule);
		}

	}
	function getCache(cacheKey) {
		cacheKey = cacheKey.replace(/&/g, '').replace(/\?/g, '').replace(/,/g, '');
		var date = new Date();
		var current = Math.round(+date / 1000);
		var stored_time = localStorage.getItem(cacheKey + '_time');
		if (stored_time === undefined || stored_time === 'null') {
			stored_time = 0;
		}
		if (stored_time < current) {
			initCache(cacheKey);
			return JSON.parse("{}");
		} else {
			return JSON.parse(localStorage.getItem(cacheKey) || "{}");
		}
	}

	function initCache(cacheKey) {
		cacheKey = cacheKey.replace(/&/g, '').replace(/\?/g, '').replace(/,/g, '');
		localStorage.setItem(cacheKey, null);
		localStorage.setItem(cacheKey + '_time', null);
	}

	return {
		setCache : setCache,
		getCache : getCache,
		initCache : initCache
	};
});
