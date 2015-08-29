'use strict';

/**
 * @ngdoc function
 * @name bookxchangeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookxchangeApp
 */
angular.module('bookxchangeApp')
	.controller('mainCtrl', function ($rootScope, $scope) {

		$scope.register = function () {
			console.log('register');
			$('#registerModal').modal('show');
		}

		$scope.registerUser = function(){

			var user = new Parse.User();
			user.set("username", "my name");
			user.set("password", "my pass");
			user.set("email", "email@example.com");

			// other fields can be set just like with Parse.Object
			user.set("phone", "415-392-0202");

			user.signUp(null, {
				success: function(user) {
					$rootScope.user = user;
					$('#registerModal').modal('hide');


				},
				error: function(user, error) {

					alert("Error: " + error.code + " " + error.message);
				}
			});
		}


	});
