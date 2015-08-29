'use strict';

/**
 * @ngdoc overview
 * @name bookxchangeApp
 * @description
 * # bookxchangeApp
 *
 * Main module of the application.
 */
angular
	.module('bookxchangeApp', [
		'ngAnimate',
		'ngCookies',
		'ngMessages',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'parse-angular',
		'parse-angular.enhance',
		'ui.bootstrap',
		'ui.grid',
		'ui.grid.saveState',
		'ui.grid.selection',
		'ui.grid.cellNav',
		'ui.grid.resizeColumns',
		'ui.grid.moveColumns',
		'ui.grid.pinning',
		'ui.bootstrap',
		'ui.grid.autoResize'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller : 'homeCtrl'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller : 'aboutCtrl'
			}).when('/contact', {
				templateUrl: 'views/contact.html',
				controller : 'contactCtrl'
			})
			.when('/myBooks', {
				templateUrl: 'views/myBooks.html',
				controller : 'myBooksCtrl'
			})
			.when('/mySearch', {
				templateUrl: 'views/mySearch.html',
				controller : 'mySearchCtrl'
			})
			.when('/myBorrowedBooks', {
				templateUrl: 'views/myBorrowedBooks.html',
				controller : 'myBorrowedBooksCtrl'
			})
			.when('/myLentBooks', {
				templateUrl: 'views/myLentBooks.html',
				controller : 'myLentBooksCtrl'
			})
			.when('/myMessages', {
				templateUrl: 'views/myMessages.html',
				controller : 'myMessagesCtrl'
			})
			.when('/myProfile', {
				templateUrl: 'views/myProfile.html',
				controller : 'myProfileCtrl'
			})
			.when('/mySettings', {
				templateUrl: 'views/mySettings.html',
				controller : 'mySettingsCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}).run([
		'$rootScope',
		'$location',
		'$route',
		'$http',
		'$injector',
		'users',
		'books',
		function ($rootScope, $location, $route, $http, $injector) {

			Parse.initialize('UeK8ftekh5VsU6MzF0aYYhsJzuEbSXqegVJSDnvD', '80gwsTJrWmvsUP9YM1sJ30e2yeBCdQF3UUP7ajcy');


			if (Parse.User.current()) {
				$rootScope.authenticated = true;
				$rootScope.currentUser = Parse.User.current().attributes;
				console.log($rootScope.currentUser);
			} else {
				$rootScope.authenticated = false;
			}


		}

	]);
