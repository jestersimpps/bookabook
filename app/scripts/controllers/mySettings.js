'use strict';


angular.module('bookxchangeApp')
	.controller('mySettingsCtrl', function ($rootScope, $location, $scope, users, books) {

		$scope.userSettings = {};
		$scope.userAddress = {};


		$scope.profileTabIndex = 2;

		$scope.map = {center: {latitude: 45, longitude: -73}, zoom: 8};


		$scope.refreshMap = function getAddressCoordinates() {
			var $btn = $('#mapButton').button('loading');
			$scope.showMap = false;
			users.getCoordinates($rootScope.currentUser.address).then(
				function (data) {
					//success
					console.log(data);
					$rootScope.currentUser.address = data.formatted_address;
					var point = new Parse.GeoPoint(data.geometry.location.lat, data.geometry.location.lng);
					$rootScope.currentUser.location = point;
					var marker = {
						id    : data.formatted_address,
						coords: {
							latitude : data.geometry.location.lat,
							longitude: data.geometry.location.lng
						}
					};
					$scope.map = {
						center : {latitude: data.geometry.location.lat, longitude: data.geometry.location.lng},
						zoom   : 15,
						markers: [marker]
					};
					$btn.button('reset');
					$scope.showMap = true;
				},
				function (data) {
					//fial
					console.log(data);
				});

		};


		$scope.saveUserData = function () {

			var $btn = $('#saveButton').button('loading');

			Parse.User.current().set("firstName", $rootScope.currentUser.firstName);
			Parse.User.current().set("lastName", $rootScope.currentUser.lastName);
			Parse.User.current().set("phone", $rootScope.currentUser.phone);
			Parse.User.current().set("mobile", $rootScope.currentUser.mobile);
			Parse.User.current().set("address", $rootScope.currentUser.address);
			Parse.User.current().set("location", $rootScope.currentUser.location);
			Parse.User.current().set("showAddress", $rootScope.currentUser.showAddress);



			//TODO
			//		add social fields


			Parse.User.current().save(null, {
				success: function (user) {
					$rootScope.currentUser = user;

					//change the location of the user library
					books.changeLibrary(Parse.User.current().get("location"));

					$btn.button('reset')
				},
				error  : function (user, error) {

					console.log(error);
				}
			});
		};

		$scope.resetForm = function () {

			//TODO
			//	get current user data

		}

	});
