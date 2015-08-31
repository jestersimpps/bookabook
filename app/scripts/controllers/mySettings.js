'use strict';


angular.module('bookxchangeApp')
	.controller('mySettingsCtrl', function ($rootScope, $location, $scope) {

		$rootScope.tabIndex = 27;

		$scope.logOut = function(){
			console.log('logout');
			Parse.User.logOut();
			$rootScope.currentUser = null;
			$location.path('home');
		};


		$scope.profileTabIndex = 2;



	});
