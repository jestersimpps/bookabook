'use strict';


angular.module('bookxchangeApp')
	.factory('users', function usersFactory($rootScope, $http, $q) {


		return {


			//get current user
			getCurrent    : function () {
				var currentUser = Parse.User.current();
				var user = {
					firstName: currentUser.get('firstName'),
					lastName: currentUser.get('lastName'),
					screenName:currentUser.get('screenName'),
					about:currentUser.get('about'),
					phone: currentUser.get('phone'),
					mobile: currentUser.get('mobile'),
					address: currentUser.get('address'),
					location: currentUser.get('location'),
					showAddress: currentUser.get('showAddress'),
					totalBooks: currentUser.get('totalBooks'),
					totalBorrowed: currentUser.get('totalBorrowed'),
					totalReturned: currentUser.get('totalReturned'),
					totalLent: currentUser.get('totalLent'),
					friends:currentUser.get('friends'),
					followers:currentUser.get('followers'),
					following:currentUser.get('following'),
					facebook:currentUser.get('facebook'),
					googleplus:currentUser.get('googleplus'),
					twitter:currentUser.get('twitter'),
					pinterest:currentUser.get('pinterest'),
					createdAt:currentUser.createdAt,
					updatedAt:currentUser.updatedAt
				};
				return user;
			},


			//get one user
			getUserInfo   : function (userID) {
				var deferred = $q.defer();
				var query = new Parse.Query(Parse.User);
				query.equalTo("objectId", userID);
				query.find({
					success: function (object) {
						object = angular.toJson(object);
						object = angular.fromJson(object);
						deferred.resolve(object[0]);
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
