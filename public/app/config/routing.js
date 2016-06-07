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
                                templateUrl: "index.html",
                                controller: "BookController as vm",
                                //admin: false,
                                //authenticated: false,
                                //dashboard: true
                            });
                            /*.state("login", {
                                url: "/login",
                                templateUrl: "login.html",
                                controller: "AuthController as vm",
                                admin: true,
                                authenticated: false,
                                dashboard: true
                            })
                            .state("admin", {
                                url: "/admin",
                                templateUrl: "admin/index.html",
                                controller: "AdminController as vm",
                                admin: true,
                                authenticated: true,
                                dashboard: false
                            });*/

                            // use the HTML5 History API
                            //$locationProvider.html5Mode(true);
                            //$locationProvider.html5Mode(true).hashPrefix('!');
                            /*$locationProvider.html5Mode({
                                enabled: true,
                                requireBase: false
                            });*/

	}]);
}());