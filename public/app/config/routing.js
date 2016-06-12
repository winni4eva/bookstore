(function(){
	'use strict';

	//Routing				
	angular    
                     .module("app")
                     .config([
                                    '$stateProvider',
                                    '$urlRouterProvider',
                                    '$locationProvider',
                                     function($stateProvider, $urlRouterProvider,$locationProvider){
		
	           $urlRouterProvider.otherwise("/");

                       $stateProvider
                            .state("home", {
                                url: "/",
                                templateUrl: "templates/partials/books.html",
                                controller: "BookController as vm",
                                authenticated: false,
                                dashboard: true
                            })
                            .state("login", {
                                url: "/login",
                                templateUrl: "templates/login.html",
                                controller: "AdminController as vm",
                                authenticated: false,
                                dashboard: false,
                                 admin: false
                            })
                            .state("admin", {
                                url: "/admin",
                                templateUrl: "app/admin/admin.html",
                                controller: "AdminController as vm",
                                authenticated: true,
                                dashboard: false,
                                abstract: true,
                                admin: true
                            }).state("admin.books", {
                                url: "/books",
                                templateUrl: "app/admin/books.html",
                                controller: "AdminController as vm",
                                authenticated: true,
                                dashboard: false,
                                admin: true
                            }).state("admin.add_book", {
                                url: "/add_book/:id",
                                templateUrl: "app/admin/add_book.html",
                                controller: "AdminController as vm",
                                authenticated: true,
                                dashboard: false,
                                admin: true
                            }).state("admin.add_category", {
                                url: "/add_category",
                                templateUrl: "app/admin/add_category.html",
                                controller: "AdminController as vm",
                                authenticated: true,
                                dashboard: false,
                                admin: true
                            }).state("admin.categories", {
                                url: "/categories",
                                templateUrl: "app/admin/categories.html",
                                controller: "AdminController as vm",
                                authenticated: true,
                                dashboard: false,
                                admin: true
                            }).state("admin.sales", {
                                url: "/sales",
                                templateUrl: "app/admin/sales.html",
                                controller: "AdminController as vm",
                                authenticated: true,
                                dashboard: false,
                                admin: true
                            }).state("admin.reports", {
                                url: "/reports",
                                templateUrl: "app/admin/reports.html",
                                controller: "AdminController as vm",
                                authenticated: true,
                                dashboard: false,
                                admin: true
                            });

                            // use the HTML5 History API
                            //$locationProvider.html5Mode(true);
                            //$locationProvider.html5Mode(true).hashPrefix('!');
                            /*$locationProvider.html5Mode({
                                enabled: true,
                                requireBase: false
                            });*/

	}]);
}());