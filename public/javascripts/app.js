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
			$scope.resources=JSON.parse(JSON.parse(data));
			$scope.taggedImages= _.pluck($scope.resources.images, 'path');
			$http({
				method:'GET',
				url: '/users/images/',
			}).
			success(function(data){
				$scope.loading=1;
				$scope.realImages=data;
				$scope.toTaggedImagesPaths =  _.difference($scope.realImages, $scope.taggedImages);
				_.each($scope.toTaggedImagesPaths,function(path){
					$scope.resources.images.push({
						path: path,
						tags:[],
						toTag : true
					});
				});
			});
		});

		$scope.openTagImages= function(){
			$scope.loading = $scope.loading == 1.5 ? 1 : 1.5;
		}

		$scope.addTag = function(imageObj,keyEvent){
			if (keyEvent.which === 13){
				imageObj.tags.push(imageObj.tagToAdd);
				imageObj.tagToAdd='';
				$scope.saveResource();
			}
		};
		$scope.saveResource = function(callbackSuccess){
			//pulisco la resource
			var objToSave = $scope.resources;
			$http.post('/users/db', objToSave ).
			success(function(data){
				if (callbackSuccess){
					callbackSuccess(data);
				}
			});
		};
	}]);