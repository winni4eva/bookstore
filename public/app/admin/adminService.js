(function () {
    "use strict";

    angular
        .module("app")
        .factory("AdminService",
                    ["$resource",
                     AdminService]);

    function AdminService($resource) {

        	var adminManager = {};

            var bookEditDetails='';

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

        adminManager.setEditBookDetails=function(details){
                    bookEditDetails = details;
            }

            adminManager.getEditBookDetails=function(){
                    return bookEditDetails;
            }

        return adminManager;
    }

}());
