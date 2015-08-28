'use strict';

/**
 * @ngdoc function
 * @name bookxchangeApp.controller:myBooksCtrl
 * @description
 * # myBooksCtrl
 * Controller of the bookxchangeApp
 */
angular.module('bookxchangeApp')
	.controller('myBooksCtrl', function ($rootScope, $scope, books) {

		$rootScope.tabIndex = 1;
		$scope.loading = true;


		$scope.gridOptions = {
			data                    : [],
			enableFiltering         : true,
			enableRowSelection      : true,
			enableRowHeaderSelection: false,
			multiSelect             : false,
			rowHeight               : 50,
			columnDefs              : [
				{
					name           : 'Image',
					field          : 'Thumbnail',
					visible        : true,
					cellTemplate   : '<img style="height:50px;margin-left:10px;" ng-src="{{grid.getCellValue(row, col)}}" lazy-src>',
					width          : '70',
					enableFiltering: false,
					enableSorting  : false
				},
				{name: 'Title', field: 'Title', visible: true},
				{name: 'Genre', field: 'Genre', visible: true},
				{name: 'Author', field: 'Author', visible: true},
				{name: 'Publisher', field: 'Publisher', visible: true},
				{name: 'Date Published', field: 'publishedDate', visible: true},
				{name: 'ISBN', field: 'ISBN', visible: true},
				{
					name           : 'Status',
					field          : 'Available',
					visible        : true,
					cellClass      : 'grid-align',
					enableFiltering: false,
					cellTemplate   : '<span style="text-align:center;"class="yes" ng-show="grid.getCellValue(row, col) == true">Available</span><span class="no" ng-show="grid.getCellValue(row, col) == false">Lent out</span>  '
				}
			]
		};


		$scope.searchNewBooks = function (keyword) {
			console.log('search');
			var $btn = $('#newBookSearchButton').button('loading');

			books.getInfo(keyword).then(
				function (data) {
					//success

					$scope.newBooks = data.items;

					//$scope.previewBook = {
					//	title      : data.items[index].volumeInfo.title,
					//	subTitle   : data.items[index].volumeInfo.subTitle,
					//	author     : (data.items[index].volumeInfo.authors) ? data.items[index].volumeInfo.authors.join(", ") : 'Unknown',
					//	description: data.items[index].volumeInfo.description,
					//	genre      : (data.items[index].volumeInfo.categories) ? data.items[index].volumeInfo.categories.join(", ") : 'Unknown',
					//	image      : data.items[index].volumeInfo.imageLinks.thumbnail,
					//	previewlink: data.items[index].volumeInfo.previewLink,
					//	pageCount  : data.items[index].volumeInfo.pageCount,
					//	publisher  : data.items[index].volumeInfo.publisher,
					//	publishDate: data.items[index].volumeInfo.publishedDate,
					//	language   : data.items[index].volumeInfo.language,
					//	rating     : data.items[index].volumeInfo.averageRating,
					//	isbn       : (data.items[index].volumeInfo.industryIdentifiers) ? data.items[index].volumeInfo.industryIdentifiers[0].identifier : 'Unknown'
					//};

					//logging
					console.log(data);

					$btn.button('reset');

				},
				function (data) {
					//fall
					console.log(data);
				});


		};

		$scope.showAddBookModal = function () {
			$('#newBookModal').modal('show');
		};

		$scope.closeNewBookModal = function () {
			$scope.newBooks = null;
			$scope.newBookKeyword = null;
			$('#newBookModal').modal('hide');
		}

		$scope.addToCollection = function (book) {

			var newBook = {
				//userID     : Parse.user.current(),
				title       : book.volumeInfo.title,
				subTitle    : book.volumeInfo.subTitle,
				author      : (book.volumeInfo.authors) ? book.volumeInfo.authors.join(", ") : 'Unknown',
				genre       : (book.volumeInfo.categories) ? book.volumeInfo.categories.join(", ") : 'Unknown',
				thumbnail   : book.volumeInfo.imageLinks.thumbnail,
				pageCount   : book.volumeInfo.pageCount,
				publisher   : book.volumeInfo.publisher,
				publishDate : book.volumeInfo.publishedDate,
				language    : book.volumeInfo.language,
				googleRating: book.volumeInfo.averageRating,
				isbn        : (book.volumeInfo.industryIdentifiers) ? book.volumeInfo.industryIdentifiers[0].identifier : 'Unknown'
			};

			books.saveNew(newBook).then(
				function (data) {
					//success

					//logging
					console.log(data);
					$scope.newBooks = null;
					$scope.newBookKeyword = null;
					$('#newBookModal').modal('hide');

				},
				function (data) {
					//fall
					console.log(data);
				});

		}


	});
