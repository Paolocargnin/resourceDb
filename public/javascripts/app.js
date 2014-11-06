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
		$scope.resources={};
		$scope.taggedImages=[];
		$scope.realImages=[];
		$scope.toTaggedImages=[];

		$http({
			method:'GET',
			url: '/users/db/',
		}).
		success(function(data){
			$scope.resources=JSON.parse(data);
			$scope.taggedImages= _.pluck($scope.resources.images, 'path');
		});

		$http({
			method:'GET',
			url: '/users/images/',
		}).
		success(function(data){
			$scope.realImages=data;
			$scope.toTaggedImages= _.difference($scope.realImages, $scope.taggedImages);
		});

		$scope.updateModel = function(method, url) {
			$scope.method = method;
			$scope.url = url;
		};
	}]);