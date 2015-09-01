'use strict';

/**
 * @ngdoc function
 * @name bookxchangeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookxchangeApp
 */
angular.module('bookxchangeApp')
	.controller('mainCtrl', function ($rootScope, $scope, $location, books) {

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
						$rootScope.currentUser = user;
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
				user.set("username", $scope.newUser.username);
				user.set("screenName", $scope.newUser.username);
				user.set("password", $scope.newUser.password);
				user.set("email", $scope.newUser.email);

				user.set("totalBooks", 0);
				user.set("totalBorrowed", 0);
				user.set("totalLent", 0);
				user.set("friends", []);
				user.set("followers", []);


				user.signUp(null, {
					success: function (user) {
						$scope.formAlert = null;
						$rootScope.currentUser = user;
						$('#registerModal').modal('hide');
						$location.path('myProfile');

					},
					error  : function (user, error) {

						$scope.formAlert = error.message;

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
						$rootScope.currentUser = user;
						//fetch the facebook name of the user
						FB.api('/me', function (response) {
							console.log(response)
							Parse.User.current().set("screenName", response.name);
							Parse.User.current().set("totalBooks", 0);
							Parse.User.current().set("totalBorrowed", 0);
							Parse.User.current().set("totalLent", 0);
							Parse.User.current().set("friends", []);
							Parse.User.current().set("followers", []);

							Parse.User.current().save();
						});
						//FB.api(
						//	"/" + Parse.User.current().userName + "/picture",
						//	function (response) {
						//		console.log(response);
						//		if (response && !response.error) {
						//			Parse.User.current().set("thumbnail", response.data.url);
						//		}
						//	}
						//);
						$('#registerModal').modal('hide');
						;
						$location.path('myProfile');
					} else {
						//user existed

						$scope.formAlert = null;
						$rootScope.currentUser = user;
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
		};

		$scope.logOut = function () {
			console.log('logout');
			Parse.User.logOut();
			$rootScope.currentUser = null;
			$location.path('home');
		};


		$scope.showInfo = function (book) {
			$rootScope.loading = true;
			books.getBookInfo(book.entity.googleID).then(
				function (data) {
					//success

					$scope.previewBook = {
						title       : data.volumeInfo.title,
						subTitle    : data.volumeInfo.subTitle,
						author      : (data.volumeInfo.authors) ? data.volumeInfo.authors.join(", ") : 'Unknown',
						description : data.volumeInfo.description,
						genre       : (data.volumeInfo.categories) ? data.volumeInfo.categories.join(", ") : 'Unknown',
						thumbnail   : data.volumeInfo.imageLinks.thumbnail,
						previewlink : data.volumeInfo.previewLink,
						pageCount   : data.volumeInfo.pageCount,
						publisher   : data.volumeInfo.publisher,
						publishDate : data.volumeInfo.publishedDate,
						language    : data.volumeInfo.language,
						googleRating: data.volumeInfo.averageRating,
						isbn        : (data.volumeInfo.industryIdentifiers) ? data.volumeInfo.industryIdentifiers[0].identifier : 'Unknown'
					};

					console.log(data);
					$('#previewModal').modal('show');
					$rootScope.loading = false;

				},
				function (data) {
					//fall
					console.log(data);
				});
		};


	});
