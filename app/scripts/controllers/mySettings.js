'use strict';


angular.module('bookxchangeApp')
	.controller('mySettingsCtrl', function ($rootScope, $location, $scope, users) {

		$scope.userSettings = {};
		$scope.userAddress = {};


		$scope.profileTabIndex = 2;

		$scope.map = {center: {latitude: 45, longitude: -73}, zoom: 8};


		$scope.refreshMap = function getAddressCoordinates() {
			var $btn = $('#mapButton').button('loading');
			$scope.showMap = false;
			users.getCoordinates($rootScope.currentUser.attributes.address).then(
				function (data) {
					//success
					console.log(data);
					$rootScope.currentUser.attributes.address = data.formatted_address;
					$rootScope.currentUser.attributes.location = data.geometry.location;
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

			Parse.User.current().set("firstName", $rootScope.currentUser.attributes.firstName);
			Parse.User.current().set("lastName", $rootScope.currentUser.attributes.lastName);
			Parse.User.current().set("phone", $rootScope.currentUser.attributes.phone);
			Parse.User.current().set("mobile", $rootScope.currentUser.attributes.mobile);
			Parse.User.current().set("address", $rootScope.currentUser.attributes.address);
			Parse.User.current().set("location", $rootScope.currentUser.attributes.location);

			Parse.User.current().save(null, {
				success: function (user) {
					$btn.button('reset')
				},
				error  : function (user, error) {

					console.log(error);
				}
			});


		}

	});
