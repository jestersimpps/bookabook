'use strict';

/**
 * @ngdoc function
 * @name bookxchangeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookxchangeApp
 */
angular.module('bookxchangeApp')
	.controller('MainCtrl', function ($scope, books) {

		$scope.loading = true;
		$scope.authenticated = true;

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

		books.all().then(
			function (data) {
				//success

				$scope.books = data;
				console.log(JSON.stringify($scope.books));

				$scope.gridOptions.data = $scope.books;
				$scope.loading = false;
			},
			function (data) {
				//fall
				console.log(data);
			});


		$scope.previewBook = function (keyword) {

			books.getInfo(keyword).then(
				function (data) {
					//success

					var index = 0;
					var title = data.items[index].volumeInfo.title;
					var subTitle = data.items[index].volumeInfo.subTitle;
					var publishDate = data.items[index].volumeInfo.publishedDate;
					var Author = (data.items[index].volumeInfo.authors) ? data.items[index].volumeInfo.authors.join(", ") : 'Unknown';
					var description = data.items[index].volumeInfo.description;
					var genre = (data.items[index].volumeInfo.categories) ? data.items[index].volumeInfo.categories.join(", ") : 'Unknown';
					var image = data.items[index].volumeInfo.imageLinks.thumbnail;
					var previewlink = data.items[index].volumeInfo.previewLink;
					var pageCount = data.items[index].volumeInfo.pageCount;
					var publisher = data.items[index].volumeInfo.publisher;
					var language = data.items[index].volumeInfo.language;
					var rating = data.items[index].volumeInfo.averageRating;
					var isbn = (data.items[index].volumeInfo.industryIdentifiers) ? data.items[index].volumeInfo.industryIdentifiers[0].identifier : 'Unknown';


					$scope.previewBook = {
						title      : title,
						subTitle   : subTitle,
						author     : Author,
						description: description,
						genre      : genre,
						image      : image,
						previewlink: previewlink,
						pageCount  : pageCount,
						publisher  : publisher,
						publishDate: publishDate,
						language   : language,
						rating     : rating,
						isbn       : isbn
					}

					//logging
					console.log(data);
					console.log($scope.previewBook);


					$('#previewModal').modal('show');
				},
				function (data) {
					//fall
					console.log(data);
				});
		}


	})
;
