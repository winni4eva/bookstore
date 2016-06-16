(function () {
    "use strict";

    angular
        .module("app")
        .factory("AdminService",
                    [
                        "$resource",
                        "$http",
                        "$cookieStore",
                     AdminService]);

    function AdminService($resource,$http,$cookieStore) {

        	var adminManager = {};

            var bookEditDetails='';
            var categoryEditDetails='';

        	/*, {
   		 stripTrailingSlashes: true
	    }
    	*/
            adminManager.category=function(){
                    return $resource('/api/v1/admin/categories/:id', { id: '@id' }, {
                           'update': {
                                    method: 'PUT' // this method issues a PUT request
                                },
                                'query': {
                                    method: 'GET', // this method issues a GET request
                                    isArray: false 
                                },
                                'save': {
                                    method: 'POST', // this method issues a POST request
                                     headers: { 'Content-Type': undefined },
                                    transformRequest: angular.identity
                                }
                    });
            }

            adminManager.books=function(){
                    return $resource('/api/v1/admin/books/:id', { id: '@id' }, {
                           'update': {
                                    method: 'PUT' // this method issues a PUT request
                                },
                                'query': {
                                    method: 'GET', // this method issues a GET request
                                    isArray: false 
                                },
                                'save': {
                                            method: 'POST', // this method issues a POST request
                                            headers: { 'Content-Type': undefined },
                                            transformRequest: angular.identity
                                }
                    });
            }

            adminManager.sales=function(){
                    //return $resource('/api/v1/admin/books/:id/search/:search', { id: '@id',search: '@search' }, {
                    return $resource('/api/v1/admin/sales/:id', { id: '@id' ,}, {
                           'update': {
                                    method: 'PUT' // this method issues a PUT request
                                },
                                'query': {
                                    method: 'GET', // this method issues a GET request
                                    isArray: false 
                                },
                                'save': {
                                            method: 'POST' // this method issues a POST request
                                }
                    });
            }

            adminManager.login = function(loginData){
                            return $http.post("auth/login", loginData);
            };

            adminManager.checkLogin = function(){
                            return $http.get("auth/check");
            };

            adminManager.logout = function(){
                            return $http.get("auth/logout");
            };

            adminManager.cookieStore = function(key, value, expiry){
                    expiry = expiry || {};
                    $cookieStore.put(key, value, expiry);
            }

            adminManager.cookieGet = function(key){
                    return $cookieStore.get(key);
            }

            adminManager.cookieRemove = function(key){
                    $cookieStore.remove(key);
            }

            adminManager.setEditBookDetails=function(details){
                            bookEditDetails = details;
            }

            adminManager.getEditBookDetails=function(){
                            return bookEditDetails;
            }

            adminManager.setEditCategoryDetails=function(details){
                            categoryEditDetails = details;
                }

            adminManager.getEditCategoryDetails=function(){
                            return categoryEditDetails;
            }

            return adminManager;
    }

}());
