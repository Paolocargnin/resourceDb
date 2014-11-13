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
				$scope.toTaggedImagesPaths= _.difference($scope.realImages, $scope.taggedImages);
				_.each($scope.toTaggedImagesPaths,function(path){
					$scope.toTaggedImages.push({
						path: path,
						tags:[],
						tagToAdd: ''
					});
				});
			});
		});

		$scope.openTagImages= function(){
			$scope.loading = $scope.loading == 1.5 ? 1 : 1.5;
		}

		$scope.addTagToNoTagged = function(imageObj,keyEvent){
			if (keyEvent.which === 13){
				$scope.updateImages(imageObj);		
			}
		};
		$scope.updateImages = function(imageObj){
			if (imageObj.stillTagged || imageObj.stillTagged===0){
				$scope.resources.images[imageObj.stillTagged]=imageObj;				
			}else{
				$scope.resources.images.push(imageObj);
				imageObj.stillTagged = $scope.resources.images.length;
			}

			$scope.saveResource(function(data){
				debugger;
				console.log('Save');
			});
		};
		$scope.saveResource = function(callbackSuccess){
			$http.post('/users/db',$scope.resources).
			success(function(data){
				callbackSuccess(data)
			});
		};
	}]);