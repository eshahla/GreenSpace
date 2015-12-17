(function() {
	'use strict';

	angular.module('app.routes', [ 'ngRoute' ])
		.config(['$routeProvider', '$locationProvider', carRoutes])

	function carRoutes($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				templateUrl: '/partials/login.html'
			})
				// login page
				.when('/login', {
					templateUrl: 'partials/login.html',
					controller: 'mainController',
					controllerAs: 'login'
				})

				// show all users
				.when('/users', {
					templateUrl: 'partials/allUsers.html',
					controller: 'userController',
					controllerAs: 'user'
				})
	      .otherwise({
	        redirectTo: '/'
	      });

	}
}());
