(function () {
    "use strict";

    angular
        .module("app")
        .factory("BookService",
                    ["$resource",
                     BookService]);

    function BookService($resource) {

            var bookManager = {};

        	bookManager.category=function(){
                    return $resource('/api/v1/categories/:id', { id: '@id' }, {
                           'update': {
                                    method: 'PUT' // this method issues a PUT request
                                },
                                'query': {
                                    method: 'GET', // this method issues a GET request
                                    isArray: false 
                                }
                    });
            }

            bookManager.books=function(){
                    return $resource('/api/v1/books/:id', { id: '@id' }, {
                           'update': {
                                    method: 'PUT' // this method issues a PUT request
                                },
                                'query': {
                                    method: 'GET', // this method issues a GET request
                                    isArray: false 
                                }
                    });
            }

            return bookManager;

    }

}());
