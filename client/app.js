angular.module('greenSpace', ['ngAnimate', 'app.routes', 'mainCtrl', 'userCtrl', 'userService','authService'])

// application configuration to integrate token into requests
.config(function($httpProvider) {


	// attach our auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor')

});