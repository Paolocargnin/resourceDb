angular.module('httpExample', [])
.controller('imageController', ['$scope', '$http', '$templateCache',
	function($scope, $http, $templateCache) {
		$scope.method = 'GET';
		$scope.url = 'http-hello.html';
		$scope.resources={};
		$scope.taggedImages=[];
		$scope.realImages=[];
		$scope.toTaggedImages=[];
		$scope.loading=0;

		$http({
			method:'GET',
			url: '/users/db/',
		}).
		success(function(data){
			$scope.resources=JSON.parse(data);
			$scope.taggedImages= _.pluck($scope.resources.images, 'path');
			$http({
				method:'GET',
				url: '/users/images/',
			}).
			success(function(data){
				$scope.loading=1;
				$scope.realImages=data;
				$scope.toTaggedImages= _.difference($scope.realImages, $scope.taggedImages);
			});
		});

		$scope.openTagImages= function(){
			$scope.loading = $scope.loading == 1.5 ? 1 : 1.5;
		}

		$scope.updateModel = function(method, url) {
			$scope.method = method;
			$scope.url = url;
		};
	}]);