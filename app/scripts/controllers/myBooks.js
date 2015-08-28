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
					name           : 'Availability',
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

		$scope.addBook = function () {


			$('#newBookModal').modal('show');


		};


	});
