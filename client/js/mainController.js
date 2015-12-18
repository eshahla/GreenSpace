angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth, $http) {

	var mainCtrl = this;

	// get info if a person is logged in
	mainCtrl.loggedIn = Auth.isLoggedIn()

	// check to see if a user is logged in on every request
	$rootScope.$on('$routeChangeStart',function(){
		mainCtrl.loggedIn = Auth.isLoggedIn()

		// get user information on page load
		Auth.getUser()
			.then(function(data){
				console.log("====user==",data);
				mainCtrl.user = data.data
				mainCtrl.email = data.data.email
				console.log(mainCtrl.email);
			})
	})

	// function to handle login form
	mainCtrl.doLogin = function(){
		mainCtrl.processing = true

		// clear the error
		mainCtrl.error = ''
				// if a user successfully logs in, redirect to users page
		Auth.login(mainCtrl.loginData.email, mainCtrl.loginData.password)
			.success(function(data){
				mainCtrl.processing = false
				console.log("==data==",data);
				if ( data.success ){
					$location.path('/greens')
				}
				else {
					console.log(data.message);
					mainCtrl.error = data.message
				}
			})
	}

	// function to handle logging out
	mainCtrl.doLogout = function(){
		Auth.logout()
		mainCtrl.user = ''

		$location.path('#/')
	}
	mainCtrl.range = function(n) {
			return new Array(n);
	};
	$http.get('http://localhost:3000/api/v1/greens')
		.success(function (data) {
			console.log("geting greens:", data);
			mainCtrl.greens = data
		})
	mainCtrl.addMyGreen = function (green_id) {

  Materialize.toast('Added Green Item', 3000, 'rounded')
		$http.post('http://localhost:3000/api/v1/addGreens', {
			greenId: green_id
		})
		.success(function (data) {
			console.log("adding green to user:",data);
			$location.reload()
		})
	}
	mainCtrl.createGreen = function () {
		$http.post('http://localhost:3000/api/v1/greens', {
			title: mainCtrl.green.title,
			desc: mainCtrl.green.desc,
			level: mainCtrl.green.level
		})
		.success(function (data) {
			console.log("adding green :",data);
			$location.reload()
		})
	}

});
