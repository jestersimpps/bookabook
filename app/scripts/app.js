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
		'ui.grid.cellNav',
		'ui.grid.selection',
		'ui.grid.edit',
		'ui.grid.resizeColumns'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/search', {
				templateUrl: 'views/main.html',
				controller : 'MainCtrl'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller : 'AboutCtrl'
			})
			.when('/myBooks', {
				templateUrl: 'views/myBooks.html',
				controller : 'myBooksCtrl'
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
		function ($rootScope, $location, $route, $http, $injector, users) {

			Parse.initialize('UeK8ftekh5VsU6MzF0aYYhsJzuEbSXqegVJSDnvD', '80gwsTJrWmvsUP9YM1sJ30e2yeBCdQF3UUP7ajcy');




			$rootScope.authenticated = true;
			if (!$rootScope.authenticated) {
				$location.path('/login');
			}


		}

	]);
