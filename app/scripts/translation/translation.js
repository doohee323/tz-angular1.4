angular.module('gettext_translation', []);
angular.module('gettext_translation').run([ 'gettextCatalog', function(gettextCatalog) {

	en_us(gettextCatalog);
	ko_kr(gettextCatalog);

} ]);
