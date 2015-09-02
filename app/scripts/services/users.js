'use strict';


angular.module('bookxchangeApp')
	.factory('users', function usersFactory($rootScope, $http, $q) {


		return {

			//get all users


			//get one user
			getUserInfo   : function (userID) {
				var deferred = $q.defer();
				var query = new Parse.Query(Parse.User);
				query.equalTo("objectId", userID);
				query.find({
					success: function (object) {
						object = angular.toJson(object);
						object = angular.fromJson(object);
						deferred.resolve(object);
					},
					error  : function (error) {
						alert("Error: " + error.code + " " + error.message);
						deferred.reject(error);
					}
				});
				return deferred.promise;
			},


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
