
(function () {
	"use strict";

	angular
	.module("app")
	.controller("BookController",
		["$scope",
		"$rootScope",
		"$location",
		"ModalService",
		"$state",
		"BookService",
		BookController]);

	function BookController($scope, $rootScope, $location, ModalService, $state, BookService) {
		var vm = this;

		vm.books=[];
		vm.categories=[];
		vm.getCategoryError='';
		vm.getBooksError='';
		
		vm.getBooks=function(){
			
			vm.getBooksError='';
			
			BookService.books().query().$promise.then( 
				function(data){
			  		vm.books=data.books;
				},
		      		function (response) {
		          			vm.getBooksError=response; //  handle error response
		      		});
		}

		vm.getCategories=function(){
			
			vm.getCategoryError='';
			
			BookService.category().query().$promise.then( 
				function(data){
			  		vm.categories=data.categories;
				},
		      		function (response) {
		          			vm.getCategoryError = response;
		      		});
		}

		vm.getBooks();
		vm.getCategories();

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
