/**
 * @ngdoc directives
 * @name TzUI.directives
 * @description # Directives of the TzUI
 */
angular.module('TzUI').directive('onKeyEnter', [ '$parse', function($parse) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			element.bind('keydown', function(event) {
				if (event.which === 13) {
					var attrValue = $parse(attrs.onKeyEnter);
					(typeof attrValue === 'function') ? attrValue(scope) : angular.noop();
					event.preventDefault();
				}
			});
			scope.$on('$destroy', function() {
				element.unbind('keydown')
			});
		}
	};
} ]);
