angular.module('userCtrl', ['userService'])

.controller('userController', function(User, $http) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;
	User.get()
		.success(function (data) {
			console.log("user data", data);
			vm.curUser = data
		})
	// grab all the users at page load
	User.all()
		.success(function(data) {

			// when all the users come back, remove the processing variable
			vm.processing = false;

			// bind the users that come back to vm.users
			vm.users = data;
		});

	// function to delete a user
	vm.deleteUser = function(id) {
		vm.processing = true;

		User.delete(id)
			.success(function(data) {

				// get all users to update the table
				// you can also set up your api
				// to return the list of users with the delete call
				User.all()
					.success(function(data) {
						vm.processing = false;
						vm.users = data;
					});

			});
	};
	vm.compGreens = function (green_id, deleteGreen) {
	console.log(green_id,deleteGreen);
		$http.post('http://localhost:3000/api/v1/compGreens', {
			greenId: green_id,
			greenIndex: deleteGreen
		})
		.success(function (data) {
			console.log('removed Green',data)
			User.get()
				.success(function (data) {
					console.log("user data", data);
					vm.curUser = data
					$location.reload()
				})
		})
	}

})

// controller applied to user creation page
.controller('userCreateController', function(User, $location) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';
		console.log("======",vm.user);

		// use the create function in the userService
		User.create(vm.user)
			.success(function(data) {
				vm.processing = false;
				vm.user = {};
				vm.message = data.message;
				$location.path('/login')

			});

	};

})

// controller applied to user edit page
.controller('userEditController', function($routeParams, User) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the user data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	User.get($routeParams.user_id)
		.success(function(data) {
			vm.userData = data;
		});

	// function to save the user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';

		// call the userService function to update
		User.update($routeParams.user_id, vm.userData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.userData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
			});
	};

});
