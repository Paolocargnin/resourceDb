// jQuery(document).ready(function($){
// 	$.getJSON('/users/db/',function(data){
// 		var resources=JSON.parse(data),
// 			taggedImages= _.pluck(resources.images, 'path') ;
// 		//prendo la lista delle immagini
// 		$.getJSON('/users/images/',function(data){
// 			var realImages = data;
// 			toTaggedImages = _.difference(realImages,taggedImages);
// 		});
// 	});
// });



angular.module('httpExample', [])
.controller('json', ['$scope', '$http', '$templateCache',
	function($scope, $http, $templateCache) {
		$scope.method = 'GET';
		$scope.url = 'http-hello.html';

		$scope.fetch = function() {
			$scope.code = null;
			$scope.response = null;

			$http({method: $scope.method, url: $scope.url, cache: $templateCache}).
			success(function(data, status) {
				$scope.status = status;
				$scope.data = data;
			}).
			error(function(data, status) {
				$scope.data = data || "Request failed";
				$scope.status = status;
			});
		};

		$scope.updateModel = function(method, url) {
			$scope.method = method;
			$scope.url = url;
		};
	}]);