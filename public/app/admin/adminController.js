
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
		vm.removeBookSuccess='';
		vm.removeBookError='';
		vm.selectedBookId=0;
		vm.bookActions='';
		vm.edit=false;
		/*
		vm.bannerDetails={};
		vm.addBannerError='';
		vm.addBannerSuccess='';
		vm.banners=[];
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
			
			var bookId = vm.bookDetails.id || 0;
			vm.fd.append('id', bookId);
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
			
			vm.removeBookError='';
			vm.removeBookSuccess='';
			//Get all categories
			AdminService.books().query().$promise.then( 
				function(data){
			  		vm.books=data.books;
				},
		      		function (response) {
		          			//console.error(response); //  handle error response
		      		});
		}

		vm.removeBook=function(bookId){
			vm.removeBookSuccess='';
			vm.removeBookError='';
			vm.getBooksError='';

			AdminService.books().remove({id: bookId}, {} ).$promise.then(
				function(data, headers){
			  		vm.removeBookSuccess=data.success;
			  		vm.getBooks();
			  		vm.selectedBookId=0;
				},
				function (response) {
					vm.removeBookError=response.data.error;
	      			});
		}

		vm.editEntity=function(entityId, entity){

			if(entity=='book'){

				angular.forEach(vm.books, function(book, key){

					if(entityId==book.id) 
					{
						var obj = {};

						obj.id = book.id;
						obj.title = book.title;
						obj.author = book.author;
						obj.price = book.price;
						obj.sales_price = book.sales_price;
						obj.quantity = book.quantity;
						obj.category_id = book.category_id;
						obj.description = book.description;

						AdminService.setEditBookDetails( obj );

						$state.go("admin.add_book", {id: book.id });
					}
				});

			}
			
		}

		vm.checkState=function(){

			if($state.current.name == "admin.add_book"){
				if($state.params.id){
					vm.bookDetails=AdminService.getEditBookDetails();
					vm.edit = true;
				}else{
					vm.edit = false;
					vm.bookDetails={};
				}
			}

		}

		/*

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

		vm.go=function(state){
			vm.currentStateName='other';
			$state.go(state);
		}

		vm.checkAuth();
		vm.getBanners();*/

		vm.show = function(template) {
		        ModalService.showModal({
		            templateUrl: template,
		            controller: "ModalController"
		        }).then(function(modal) {
		            modal.element.modal();
		            modal.close.then(function(result) {
		                if(result[0] == 'Yes' && result[1] == 'book') vm.removeBook( vm.selectedBookId );
		            });
		        });
		};

		vm.activate = function(option,id){
			
			if(option=='book'){
				if(vm.bookActions=='delete') {
					vm.show('book_delete.html');
				}else if(vm.bookActions=='edit'){
					vm.editEntity(id, 'book');
				}
				//if(vm.bookActions=='download')   
			}
		}

		vm.getCategories();
		vm.getBooks();
		vm.checkState();

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
