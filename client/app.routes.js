
	angular.module('app.routes', ['ngRoute'])
		.config(['$routeProvider','$locationProvider', greenRoutes])

	function greenRoutes($routeProvider){
		$routeProvider
				.when('/',{
					templateUrl: 'partials/home.html',
				})
				.when('/login', {
					templateUrl: 'partials/login.html',
					controller: 'mainController',
					controllerAs: 'login'
				})
				.when('/signup', {
					templateUrl: 'partials/signup.html',
					controller: 'userCreateController',
					controllerAs: 'signup'
				})
				// show all users
				.when('/greens', {
					templateUrl: 'partials/greens.html',
					controller: 'mainController',
					controllerAs: 'main'
				})
				.when('/me', {
					templateUrl: 'partials/profile.html',
					controller: 'userController',
					controllerAs: 'user'
				})
	      .otherwise({
	        redirectTo: '/'
	      });


	}
