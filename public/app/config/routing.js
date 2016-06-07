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
                                dashboard: false
                            })
                            .state("admin", {
                                url: "/admin",
                                templateUrl: "app/admin/admin.html",
                                controller: "AdminController as vm",
                                authenticated: true,
                                dashboard: false
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