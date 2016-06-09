
(function () {
	"use strict";

	angular
	.module("app")
	.controller("AdminController",
		["$scope",
		"$rootScope",
		"$location",
		"ModalService",
		"$state",
		"AdminService",
		AdminController]);

	function AdminController($scope, $rootScope, $location, ModalService, $state, AdminService) {
		var vm = this;

		vm.categoryDetails={};
		vm.addCategorySuccess='';
		vm.addCategoryError='';
		/*vm.products=[];
		vm.productDetails={};
		
		vm.bannerDetails={};
		vm.categories=[];
		vm.addProductSuccess='';
		vm.addProductError='';
		vm.addBannerError='';
		vm.addBannerSuccess='';
		vm.banners=[];
		vm.selectedProductId=0;
		vm.removeProductError='';
		vm.removeProductSuccess='';
		vm.user='';

		if($state.current.name != 'admin') vm.currentStateName='other'; else vm.currentStateName='admin';

		
		vm.addProduct=function(isValid){
			
			if(!isValid) return;

			vm.addProductSuccess='';
			vm.addProductError='';

			var fd = new FormData();
			fd.append('image', vm.productDetails.image);
			fd.append('title',vm.productDetails.title);
			fd.append('category_id',vm.productDetails.category_id);
			fd.append('description',vm.productDetails.description);
			fd.append('price',vm.productDetails.price);

			AdminService.product().save(fd).$promise.then(
				function(data){
			  		vm.addProductSuccess=data.success;
				},
				function (response) {
					vm.addProductError=response.error;
	      			});
			
		}
		*/
		vm.addCategory=function(isValid){
			//alert(JSON.stringify(isValid));
			if(!isValid) return;
			//alert("I passed");
			vm.addCategorySuccess='';
			vm.addCategoryError='';

			//Save category
			AdminService.category().save(vm.categoryDetails).$promise.then( 
				function(data){
			  		vm.addCategorySuccess=data.success;
				},
		      		function (response) {
		          			vm.addCategoryError=response.error;
		      		});
		}
		/*
		vm.getCategories=function(){
			
			//Get all categories
			AdminService.category().query().$promise.then( 
				function(data){
			  		vm.categories=data;// handle success
				},
		      		function (response) {
		          			console.error(response); //  handle error response
		      		});
		}

		vm.getProducts=function(){
			
			//Get all categories
			AdminService.product().query().$promise.then( 
				function(data){
			  		vm.products=data.products;// handle success
				},
		      		function (response) {
		          			//console.error(response); //  handle error response
		      		});
		}

		vm.addBanner=function(isValid){
			if(!isValid) return;

			vm.addBannerError='';
			vm.addBannerSuccess='';

			var fd = new FormData();
			fd.append('image', vm.bannerDetails.image);

			//Save banner
			AdminService.banner().save(fd).$promise.then( 
				function(data){
			  		vm.addBannerSuccess=data.success;
				},
		      		function (response) {
		          			vm.addBannerError=response.error;
		      		});
		}

		vm.getBanners=function(){
			
			//Get all banners
			AdminService.banner().query().$promise.then( 
				function(data){
			  		vm.banners=data.banners;// handle success
				},
		      		function (response) {
		          			//console.error(response); //  handle error response
		      		});
		}

		vm.checkAuth=function(){
			
			AuthService.checkLogin()
		                .success(function(data,status,header,config){
		                	vm.user=data.user;
		                })
		                .error(function(data,status,header,config){
		                    	AuthService.cookieRemove('vlcuser');
		                    	$location.path('/login');
		                });
		}

		vm.logOut=function(){
			
			AuthService.logOut()
		                .success(function(data,status,header,config){
		                    	AuthService.cookieRemove('vlcuser');
		                    	$location.path('/login');
		                })
		                .error(function(data,status,header,config){
		                	//
		                });
		}

		$scope.show = function(template) {
		        ModalService.showModal({
		            templateUrl: template,
		            controller: "ModalController"
		        }).then(function(modal) {
		            modal.element.modal();
		            modal.close.then(function(result) {
		                if(result[0] == 'Yes' && result[1] == 'product') vm.removeProduct( vm.selectedProductId );
		            });
		        });
		};

		vm.removeProduct=function(productId){
			vm.removeProductSuccess='';
			vm.removeProductError='';

			AdminService.product().remove({id: productId}, {} ).$promise.then(
				function(data, headers){
			  		vm.removeProductSuccess=data.success;
			  		vm.getProducts();
				},
				function (response) {
					vm.removeProductError=response.data.error;
	      			});
		}

		vm.go=function(state){
			vm.currentStateName='other';
			$state.go(state);
		}

		vm.checkAuth();
		vm.getCategories();
		vm.getProducts();
		vm.getBanners();*/

	}

}());


(function () {
	"use strict";

	angular
	.module("app")
		.controller('ModalController', function($scope, close) {
		  
		 	$scope.close = function(result, option) {
		 		close([result, option], 500); // close, but give 500ms for bootstrap to animate
			 };

		});

}());
