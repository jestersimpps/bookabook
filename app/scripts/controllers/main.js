'use strict';

/**
 * @ngdoc function
 * @name bookxchangeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookxchangeApp
 */
angular.module('bookxchangeApp')
	.controller('mainCtrl', function ($rootScope, $scope, $location) {

		$scope.register = function () {
			$scope.formAlert = null;
			console.log('register');
			$scope.newUser = {};
			$('#registerModal').modal('show');
		};

		$scope.logIn = function () {
			$scope.formAlert = null;
			console.log('login');
			$scope.existingUser = {};
			$('#loginModal').modal('show');
		};


		$scope.logInUser = function (form) {
			if (form.$valid) {
				Parse.User.logIn($scope.existingUser.username, $scope.existingUser.password, {
					success: function (user) {
						$scope.formAlert = null;
						$rootScope.currentUser = user.attributes;
						$('#loginModal').modal('hide');
						$location.path('mySearch');

					},
					error  : function (user, error) {

						$scope.formAlert = "Error: " + error.code + " " + error.message;

					}
				});
			}
			else {

			}
		};


		$scope.registerUser = function (form) {

			console.log(registerForm);
			console.log(form);
			if (form.$valid) {

				var user = new Parse.User();
				user.set("user", $scope.newUser.name);
				user.set("username", $scope.newUser.username);
				user.set("screenName", $scope.newUser.username);
				user.set("password", $scope.newUser.password);
				user.set("email", $scope.newUser.email);

				user.signUp(null, {
					success: function (user) {
						$scope.formAlert = null;
						$rootScope.currentUser = user.attributes;
						$('#registerModal').modal('hide');
						$location.path('myProfile');

					},
					error  : function (user, error) {

						$scope.formAlert = "Error: " + error.code + " " + error.message;

					}
				});

			}
			else {

			}


		};


		$scope.facebookLogin = function () {

			Parse.FacebookUtils.logIn(null, {
				success: function (user) {
					if (!user.existed()) {
						//new user

						$scope.formAlert = null;
						$rootScope.currentUser = user.attributes;
						//fetch the facebook name of the user
						FB.api('/me', function (response) {
							Parse.User.current().set("screenName",response.name);
							Parse.User.current().save();
						});
						$('#registerModal').modal('hide');
						$location.path('myProfile');
					} else {
						//user existed

						$scope.formAlert = null;
						$rootScope.currentUser = user.attributes;
						$('#registerModal').modal('hide');
						$location.path('myProfile');
					}
				},
				error  : function (user, error) {
					$scope.formAlert = null;
					console.log('register');
					$scope.newUser = {};
					$('#registerModal').modal('show');
					$scope.formAlert = "User cancelled the Facebook login or did not fully authorize.";
				}
			});
		}


	});
