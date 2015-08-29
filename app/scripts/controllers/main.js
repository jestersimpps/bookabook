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
			$scope.newUser = {};
			$('#registerModal').modal('show');
		};

		$scope.formAlert = null;

		$scope.registerUser = function (form) {

			console.log(registerForm);
			console.log(form);
			if (form.$valid) {

				var user = new Parse.User();
				user.set("user", $scope.newUser.name);
				user.set("username", $scope.newUser.username);
				user.set("password", $scope.newUser.password);
				user.set("email", $scope.newUser.email);

				user.signUp(null, {
					success: function (user) {
						$rootScope.user = user;
						$('#registerModal').modal('hide');

					},
					error  : function (user, error) {

						$scope.formAlert = "Error: " + error.code + " " + error.message;

					}
				});

			}
			else {

			}


		}


	});
