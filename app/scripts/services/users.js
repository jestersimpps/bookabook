'use strict';


angular.module('bookxchangeApp')
	.factory('users', function usersFactory($rootScope, $http, $q) {


		return {

			//get all users


			//get one user


			//get address coordinates
			getCoordinates: function (address) {
				var deferred = $q.defer();
				var request = $http({
					method : 'GET',
					url    : 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address,
					headers: {}
				});
				request
					.success(function (result) {
						deferred.resolve(result.results[0]);
					})
					.error(function (error) {
						deferred.reject(error);
					});

				return deferred.promise;

			}

		};
	});
