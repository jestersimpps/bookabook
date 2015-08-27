'use strict';


angular.module('bookxchangeApp')
	.factory('books', function booksFactory($rootScope, $http, $q) {


		return {

			//get all book
			all    : function () {
				var deferred = $q.defer();
				var query = new Parse.Query("books");
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
			save   : function (data) {
				var deferred = $q.defer();
				var pObject = Parse.Object.extend("books");
				var po = new pObject();

				po.set(data);
				po.save(null, {
					success: function (object) {
						deferred.resolve(object);
					},
					error  : function (gameScore, error) {
						alert("Error: " + error.code + " " + error.message);
						deferred.reject(error);
					}
				});
				return deferred.promise;
			},

			//get book info
			getInfo: function (data) {
				var deferred = $q.defer();
				var request = $http({
					method : 'GET',
					url    : 'https://www.googleapis.com/books/v1/volumes?q=' + data,
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
