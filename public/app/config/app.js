(function(){
	'use strict';
	var app = angular	
			.module("app",
					[
                                                                        'ui.router',
                                                                        'ngResource',
                                                                        'ngRoute',
                                                                        'ngCookies',
                                                                        'angularModalService',
                                                                         'angularUtils.directives.dirPagination'
                                                                ]);
            
            //Exception Handling
            app.config(function ($provide) {
            $provide.decorator("$exceptionHandler",
                ["$delegate",
                    function ($delegate) {
                        return function (exception, cause) {
                            exception.message = "Please contact the Help Desk! \n Message: " + exception.message;
                            $delegate(exception, cause);
                            console.log(exception.message);
                            alert(exception.message);
                        };
                    }]);
             });

            app.run(['$rootScope', '$location' , '$cookieStore', function ($rootScope, $location, $cookieStore) {
                    $rootScope.$on("$stateChangeStart", function(event, next, current){

                        //alert(JSON.stringify(next));
                        $rootScope.route=next;
                        /*$rootScope.admin = next.admin;
                        $rootScope.dashboard = next.dashboard;

                        if(next.admin){

                            if(next.authenticated){
                                //alert(JSON.stringify(AuthService));
                                var user = $cookieStore.get('vlcuser');;
                                if(user)
                                {
                                    //alert('User logged In');
                                    //$location.path('admin');
                                }else
                                {
                                    //alert('User not logged In');
                                    //$location.path('login');//return to login page if user not authenticated
                                }

                            }

                        }*/

                    });
             }]);


}());