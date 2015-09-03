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
		'ui.bootstrap',
		'ui.grid',
		'ui.grid.saveState',
		'ui.grid.selection',
		'ui.grid.cellNav',
		'ui.grid.resizeColumns',
		'ui.grid.moveColumns',
		'ui.grid.pinning',
		'ui.bootstrap',
		'ui.grid.autoResize',
		'uiGmapgoogle-maps'
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
			.otherwise({
				redirectTo: '/'
			});

		//parse init
		Parse.initialize('UeK8ftekh5VsU6MzF0aYYhsJzuEbSXqegVJSDnvD', '80gwsTJrWmvsUP9YM1sJ30e2yeBCdQF3UUP7ajcy');

		//facebook init
		window.fbAsyncInit = function () {
			Parse.FacebookUtils.init({ // this line replaces FB.init({
				appId  : '1635765486673502', // Facebook App ID
				status : true,  // check Facebook Login status
				cookie : true,  // enable cookies to allow Parse to access the session
				xfbml  : true,  // initialize Facebook social plugins on the page
				version: 'v2.4' // point to the latest Facebook Graph API version
			});
		};

		(function (d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s);
			js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

	}).run([
		'$rootScope',
		'$location',
		'$route',
		'$http',
		'$injector',
		'users',
		'books',
		function ($rootScope, $location, $route, $http, $injector, users) {


			if (Parse.User.current()) {

				$rootScope.currentUser = users.getCurrent();
				console.log($rootScope.currentUser);
			} else {
				$rootScope.currentUser = null;
				$location.path('/');
			}


			new WOW({mobile: false}).init();
			$rootScope.$on('$routeChangeStart', function (next, current) {
				//when the view changes sync wow
				new WOW({mobile: false}).sync();
			});

		}

	]);
