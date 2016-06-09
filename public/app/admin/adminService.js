(function () {
    "use strict";

    angular
        .module("app")
        .factory("AdminService",
                    ["$resource",
                     AdminService]);

    function AdminService($resource) {

        	var adminManager = {};

        	/*, {
   		 stripTrailingSlashes: true
	    }
    	*/
        adminManager.category=function(){
                return $resource('/api/v1/admin/categories/:id', { id: '@id' }, {
                    update: {
                      method: 'PUT' // this method issues a PUT request
                    }
                });
        }

        return adminManager;
    }

}());
