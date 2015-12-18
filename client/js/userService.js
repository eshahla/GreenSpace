angular.module('userService', [])

.factory('User', function($http) {

	// create a new object
	var userFactory = {};

	// get a single user
	userFactory.get = function() {
		return $http.get('http://localhost:3000/api/v1/users/me');
	};

	// get all users
	userFactory.all = function() {
		return $http.get('http://localhost:3000/api/v1/users/');
	};

	// create a user
	userFactory.create = function(user) {
		return $http.post('http://localhost:3000/api/v1/users/', user);
	};

	// update a user
	userFactory.update = function(id, userData) {
		return $http.put('http://localhost:3000/api/v1/users/' + id, userData);
	};

	// delete a user
	userFactory.delete = function(id) {
		return $http.delete('http://localhost:3000/api/v1/users/' + id);
	};

	// return our entire userFactory object
	return userFactory;

});
