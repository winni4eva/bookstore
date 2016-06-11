
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
		vm.bookDetails={};
		vm.addCategorySuccess='';
		vm.addCategoryError='';
		vm.addBookSuccess='';
		vm.addBookError='';
		vm.categories=[];
		vm.books=[];
		vm.getBooksError='';
		
		/*
		vm.bannerDetails={};
		vm.addBannerError='';
		vm.addBannerSuccess='';
		vm.banners=[];
		vm.selectedProductId=0;
		vm.removeProductError='';
		vm.removeProductSuccess='';
		vm.user='';

		if($state.current.name != 'admin') vm.currentStateName='other'; else vm.currentStateName='admin';

		*/
		vm.addBook=function(isValid){
			
			if(!isValid) return;

			vm.addBookSuccess='';
			vm.addBookError='';

			vm.fd = new FormData();
			
			vm.fd.append('title', vm.bookDetails.title);
			vm.fd.append('author', vm.bookDetails.author);
			vm.fd.append('price', vm.bookDetails.price);
			vm.fd.append('sales_price', vm.bookDetails.sales_price);
			vm.fd.append('quantity', vm.bookDetails.quantity);
			vm.fd.append('category_id', vm.bookDetails.category_id);
			vm.fd.append('description', vm.bookDetails.description);
			vm.fd.append('image', vm.bookDetails.image);
			vm.fd.append('book', vm.bookDetails.book);

			AdminService.books().save(vm.fd).$promise.then(
				function(data){
			  		vm.addBookSuccess=data.success;
				},
				function (response) {
					vm.addBookError=response.data[Object.keys(response.data)[0]][0];
	      			});
			
		}
		
		vm.addCategory=function(isValid){
			
			if(!isValid) return;

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
		
		vm.getCategories=function(){
			
			vm.getBooksError='';
			//Get all categories
			AdminService.category().query().$promise.then( 
				function(data){
			  		vm.categories=data.categories;
				},
		      		function (response) {
		          			vm.getBooksError = response;
		      		});
		}

		
		vm.getBooks=function(){
			
			//Get all categories
			AdminService.books().query().$promise.then( 
				function(data){
			  		vm.books=data.books;
				},
		      		function (response) {
		          			//console.error(response); //  handle error response
		      		});
		}

		/*
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
		vm.getBanners();*/
		vm.getCategories();
		vm.getBooks();

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
