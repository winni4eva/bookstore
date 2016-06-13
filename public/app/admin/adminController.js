
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
		vm.bookItemsPerPage=10;
		vm.catItemsPerPage=10;
		vm.selectedCategoryId=0;
		vm.catActions='';
		vm.getCategoryError='';
		vm.removeCategoryError='';
		vm.removeCategorySuccess='';
		vm.saleSearch='';
		vm.saleQty=[];
		vm.bookCart=[];
		vm.checkoutDetails={};

		//if($state.current.name != 'admin') vm.currentStateName='other'; else vm.currentStateName='admin';

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
			vm.saleBooks=[];

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

			vm.fd = new FormData();
			
			var categoryId = vm.categoryDetails.id || 0;
			vm.categoryDetails.id=categoryId;

			vm.fd.append('id', categoryId);
			vm.fd.append('name', vm.categoryDetails.name);

			//Save category
			AdminService.category().save(vm.fd).$promise.then( 
				function(data){
			  		vm.addCategorySuccess=data.success;
				},
		      		function (response) {
		          			vm.addCategoryError=response.data[Object.keys(response.data)[0]][0];
		      		});
		}
		
		vm.getCategories=function(){
			
			vm.getCategoryError='';
			//Get all categories
			AdminService.category().query().$promise.then( 
				function(data){
			  		vm.categories=data.categories;
				},
		      		function (response) {
		          			vm.getCategoryError = response;
		      		});
		}

		vm.removeCategory=function(categoryId){
			vm.removeCategorySuccess='';
			vm.removeCategoryError='';
			vm.getCategoryError='';

			AdminService.category().remove({id: categoryId}, {} ).$promise.then(
				function(data, headers){
			  		vm.removeCategorySuccess=data.success;
			  		vm.getCategories();
			  		vm.selectedCategoryId=0;
				},
				function (response) {
					vm.removeCategoryError=response.data.error;
	      			});
		}

		
		vm.getBooks=function(){
			
			vm.removeBookError='';
			vm.removeBookSuccess='';
			vm.getBooksError='';
			//Get all categories
			AdminService.books().query().$promise.then( 
				function(data){
			  		vm.books=data.books;
				},
		      		function (response) {
		          			vm.getBooksError=response; //  handle error response
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

			}else if(entity=='category'){
				
				angular.forEach(vm.categories, function(category, key){

					if(entityId==category.id) 
					{
						var obj = {};

						obj.id = category.id;
						obj.name = category.name;

						AdminService.setEditCategoryDetails( obj );

						$state.go("admin.add_category", {id: category.id });
					}
				});

			}
			
		}

		vm.checkState=function(){
			vm.edit = false;

			if($state.current.name == "admin.add_book"){
				if($state.params.id){
					vm.bookDetails=AdminService.getEditBookDetails();
					vm.edit = true;
				}else{
					vm.edit = false;
					vm.bookDetails={};
				}
			}else if($state.current.name == "admin.add_category"){
				if($state.params.id){
					vm.categoryDetails=AdminService.getEditCategoryDetails();
					vm.edit = true;
				}else{
					vm.edit = false;
					vm.categoryDetails={};
				}
			}

		}

		vm.getSalesBooks=function(){

			AdminService.sales().query({search: vm.saleSearch}).$promise.then( 
				function(data){
			  		vm.saleBooks=data.books;
				},
		      		function (response) {
		          			vm.getBooksError=response;
		      		});
		}

		vm.totalQty = 0;
		vm.totalCost = 0;

		vm.addToCart=function(index){
			//alert(JSON.stringify(vm.saleBooks[index].sales_price));
			var data = { book: vm.saleBooks[index], quantity: vm.saleQty[index], price: vm.saleBooks[index].sales_price };
			vm.totalQty += vm.saleQty[index];
			vm.totalCost += vm.saleQty[index] * vm.saleBooks[index].sales_price;
			/*
			angular.forEach(vm.bookCart, function(cart, key){
				
				if(cart){
					if(cart.book.id==vm.saleBooks[index].id){
						//var data = {book: vm.saleBooks[index], quantity: vm.saleQty[index]};
						vm.bookCart[key]=data;
					}else{
						//var data = {book: vm.saleBooks[index], quantity: vm.saleQty[index]};
						vm.bookCart.push(data);
					}
				}else{
					//var data = {book: vm.saleBooks[index], quantity: vm.saleQty[index]};
					vm.bookCart.push(data);
				}
			});*/

			//if(vm.bookCart.length==0) 
			vm.bookCart.push(data);
			
		}

		vm.removeCartItem=function(index){
			
			vm.totalQty = vm.totalQty - vm.bookCart[index].quantity;
			vm.totalCost = vm.totalCost - ( vm.bookCart[index].quantity * vm.bookCart[index].price );
			vm.bookCart.splice(index, 1);
			//alert(JSON.stringify(vm.bookCart[index].quantity));
		}

		vm.checkout=function(isValid){
			if(!isValid) return;
			alert("Form is valid");
		}

		vm.hideCheckout = false;
		vm.getBalance=function(){
			vm.hideCheckout = false;
			if(vm.totalCost > vm.checkoutDetails.received) return;
			vm.checkoutDetails.balance = vm.checkoutDetails.received - vm.totalCost;
			vm.hideCheckout = true;
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
		                if(result[0] == 'Yes' && result[1] == 'category') vm.removeCategory( vm.selectedCategoryId );
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
			}else if(option=='category'){
				if(vm.catActions=='delete') {
					vm.show('cat_delete.html');
				}else if(vm.catActions=='edit'){
					vm.editEntity(id, 'category');
				}
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
