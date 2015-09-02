'use strict';


angular.module('bookxchangeApp')
	.factory('books', function booksFactory($rootScope, $http, $q) {


		return {

			//get all books near
			all    : function (radius) {
				var deferred = $q.defer();
				var query = new Parse.Query("books");
				query.limit(100);
				query.find({
					success: function (object) {
						object = angular.toJson(object);
						object = angular.fromJson(object);
						deferred.resolve(object);
					},
					error  : function (error) {
						alert("Error: " + error.code + " " + error.message);
						deferred.reject(error);
					}
				});
				return deferred.promise;
			},

			//get users books
			my     : function (userID) {
				var deferred = $q.defer();
				var query = new Parse.Query("books");
				query.equalTo("userID", userID);
				query.find({
					success: function (object) {
						object = angular.toJson(object);
						object = angular.fromJson(object);
						deferred.resolve(object);
					},
					error  : function (error) {
						alert("Error: " + error.code + " " + error.message);
						deferred.reject(error);
					}
				});
				return deferred.promise;
			},

			//save book
			saveNew   : function (data) {
				var deferred = $q.defer();
				var pObject = Parse.Object.extend("books");
				var po = new pObject();

				po.set(data);
				po.save(null, {
					success: function (object) {
						deferred.resolve(object);
					},
					error  : function (error) {
						alert("Error: " + error.code + " " + error.message);
						deferred.reject(error);
					}
				});
				return deferred.promise;
			},

			//get matching books
			getMatching: function (keyword) {
				var deferred = $q.defer();
				var request = $http({
					method : 'GET',
					url    : 'https://www.googleapis.com/books/v1/volumes?q=' + keyword,
					headers: {}
				});
				request
					.success(function (result) {
						deferred.resolve(result);
					})
					.error(function (error) {
						deferred.reject(error);
					});

				return deferred.promise;

			},

			//get info on one book
			getBookInfo: function (googleID) {
				var deferred = $q.defer();
				var request = $http({
					method : 'GET',
					url    : 'https://www.googleapis.com/books/v1/volumes/' + googleID,
					headers: {}
				});
				request
					.success(function (result) {
						deferred.resolve(result);
					})
					.error(function (error) {
						deferred.reject(error);
					});

				return deferred.promise;

			}


		};
	});
