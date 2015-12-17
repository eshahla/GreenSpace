(function() {
	'use strict';

	angular.module('carsFactory', [])
		.factory('cars', cars)

	cars.$inject = ['$http']

	// cars factory
	function cars($http){
		var carsUrl = '/api/cars'
		var cars = {}

		cars.list = function(){
			return $http.get(carsUrl)
		}

		cars.show = function(carId){
			return $http.get(carsUrl + '/' + carId)
		}

		cars.addCar = function(data){
			return $http.post(carsUrl, data)
		}

		cars.updateCar = function(carId,data){
			return $http.patch(carsUrl + '/' + carId, data)
		}

		cars.removeCar = function(carId){
			return $http.delete(carsUrl + '/' + carId)
		}

		return cars
	}

}());
