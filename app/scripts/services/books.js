'use strict';


angular.module('bookxchangeApp')
	.factory('books', function booksFactory($rootScope, $http, $q) {


		return {

			//get all books including users near
			all          : function (radius) {
				var userLat = $rootScope.currentUser ? $rootScope.currentUser.location.latitude : 1;
				var userLng = $rootScope.currentUser ? $rootScope.currentUser.location.longitude : 1;

				function getDistanceFromLatLonInKm(lat, lon) {
					var R = 6371; // Radius of the earth in km
					var dLat = (lat - userLat) * (Math.PI / 180);  // deg2rad
					var dLon = (lon - userLng) * (Math.PI / 180);
					var a =
						Math.sin(dLat / 2) * Math.sin(dLat / 2) +
						Math.cos(userLat * (Math.PI / 180)) * Math.cos(lat * (Math.PI / 180)) *
						Math.sin(dLon / 2) * Math.sin(dLon / 2);
					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
					var d = R * c; // Distance in km
					return Math.round(d);
				}

				var deferred = $q.defer();
				var query = new Parse.Query("books");
				//inner join the user class
				query.include("userID");
				//use the current user's location as the center
				query.withinKilometers("location", Parse.User.current().get("location"), radius);
				//limit the query to 100 books
				query.limit(100);
				query.find({
						success: function (object) {
							var data = [];
							angular.forEach(object, function (row) {

								var bookLat = row.get('userID').get('location').latitude;
								var bookLng = row.get('userID').get('location').longitude;
								//only fetch books that have a location
								if (row.get('location')) {
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
										location    : row.get('location'),
										distance    : getDistanceFromLatLonInKm(bookLat, bookLng),
										userName    : row.get('userID').get('screenName'),
										showAddress : row.get('userID').get('showAddress'),
										userID      : row.get('userID').id
									});
								}
							});

							deferred.resolve(data);
						},
						error  : function (error) {
							alert("Error: " + error.code + " " + error.message);
							deferred.reject(error);
						}
					}
				);
				return deferred.promise;

			},

			//change library location
			changeLibrary: function (newLocation) {
				var deferred = $q.defer();
				var query = new Parse.Query("books");
				query.equalTo("userID", Parse.User.current());
				query.find({
					success: function (object) {
						angular.forEach(object, function (row) {
							console.log(row);
							console.log(newLocation);
							row.set("location", newLocation);
							row.save();
						});
						deferred.resolve('done');
					},
					error  : function (error) {
						alert("Error: " + error.code + " " + error.message);
						deferred.reject(error);
					}
				});
				return deferred.promise;
			},

			//get users books
			my           : function (userID) {
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
			saveNew      : function (data) {
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
			getMatching  : function (keyword) {
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
			getBookInfo  : function (googleID) {
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
							isbn10      : (result.volumeInfo.industryIdentifiers) ? result.volumeInfo.industryIdentifiers[0].identifier : 'Unknown',
							isbn13      : (result.volumeInfo.industryIdentifiers) ? result.volumeInfo.industryIdentifiers[1].identifier : 'Unknown'
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
