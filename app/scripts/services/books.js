'use strict';


angular.module('bookxchangeApp')
	.factory('books', function booksFactory($rootScope, $http, $q) {


		return {

			//get all books including users near
			all        : function (radius) {
				var deferred = $q.defer();
				var query = new Parse.Query("books").include("userID");
				query.limit(100);
				query.find({
					success: function (object) {
						console.log(object);
						var data = [];
						angular.forEach(object, function (row) {
							data.push({
								title       : row.get('title'),
								author      : row.get('author'),
								genre       : row.get('genre'),
								googleID    : row.get('googleID'),
								googleRating: row.get('googleRating'),
								isbn        : row.get('isbn'),
								language    : row.get('language'),
								pageCount   : row.get('pageCount'),
								publishDate : row.get('publishDate'),
								publisher   : row.get('publisher'),
								status      : row.get('status'),
								subTitle    : row.get('subTitle'),
								thumbnail   : row.get('thumbnail'),
								location    : row.get('userID').get('location'),
								userName    : row.get('userID').get('screenName'),
								showAddress : row.get('userID').get('showAddress'),
								userID      : row.get('userID').id
							});
						});

						deferred.resolve(data);
					},
					error  : function (error) {
						alert("Error: " + error.code + " " + error.message);
						deferred.reject(error);
					}
				});
				return deferred.promise;
			},

			//get users books
			my         : function (userID) {
				var deferred = $q.defer();
				var query = new Parse.Query("books");
				query.equalTo("userID", userID);
				query.find({
					success: function (object) {
						var data = [];
						angular.forEach(object, function (row) {
							data.push({
								title       : row.get('title'),
								author      : row.get('author'),
								genre       : row.get('genre'),
								googleID    : row.get('googleID'),
								googleRating: row.get('googleRating'),
								isbn        : row.get('isbn'),
								language    : row.get('language'),
								pageCount   : row.get('pageCount'),
								publishDate : row.get('publishDate'),
								publisher   : row.get('publisher'),
								status      : row.get('status'),
								subTitle    : row.get('subTitle'),
								thumbnail   : row.get('thumbnail')
							});
						});
						deferred.resolve(data);
					},
					error  : function (error) {
						alert("Error: " + error.code + " " + error.message);
						deferred.reject(error);
					}
				});
				return deferred.promise;
			},

			//save book
			saveNew    : function (data) {
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
						var data = {
							title       : result.volumeInfo.title,
							subTitle    : result.volumeInfo.subTitle,
							author      : (result.volumeInfo.authors) ? result.volumeInfo.authors.join(", ") : 'Unknown',
							description : result.volumeInfo.description,
							genre       : (result.volumeInfo.categories) ? result.volumeInfo.categories.join(", ") : 'Unknown',
							thumbnail   : result.volumeInfo.imageLinks.thumbnail,
							previewlink : result.volumeInfo.previewLink,
							pageCount   : result.volumeInfo.pageCount,
							publisher   : result.volumeInfo.publisher,
							publishDate : result.volumeInfo.publishedDate,
							language    : result.volumeInfo.language,
							googleRating: result.volumeInfo.averageRating,
							isbn        : (result.volumeInfo.industryIdentifiers) ? result.volumeInfo.industryIdentifiers[0].identifier : 'Unknown'
						};
						deferred.resolve(data);
					})
					.error(function (error) {
						deferred.reject(error);
					});

				return deferred.promise;

			}


		};
	});
