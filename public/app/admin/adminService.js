(function () {
    "use strict";

    angular
        .module("app")
        .factory("AdminService",
                    ["$resource",
                     AdminService]);

    function AdminService($resource) {

        	return $resource('/api/v1/books/:id', { id: '@id' }, {
	    update: {
	      method: 'PUT' // this method issues a PUT request
	    }
	});

        	/*, {
   		 stripTrailingSlashes: true
	    }
    	*/

    }

}());
