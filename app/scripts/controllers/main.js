'use strict';

/**
 * @ngdoc function
 * @name bookxchangeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookxchangeApp
 */
angular.module('bookxchangeApp')
	.controller('MainCtrl', function ($rootScope, $scope, $modal, books) {

		$rootScope.tabIndex = 0;
		$scope.loading = true;
		$scope.authenticated = false;


		$scope.logIn = function () {
			$scope.authenticated = true;
		};


		$scope.gridOptions = {
			data                     : [],
			enableFiltering          : true,
			enableRowSelection       : true,
			enableRowHeaderSelection : false,
			multiSelect              : false,
			enableHorizontalScrollbar: true,
			noUnselect               : true,
			rowHeight                : 50,
			rowTemplate              : "<div ng-dblclick=\"grid.appScope.showInfo(row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>",
			columnDefs               : [
				{
					name           : 'Cover',
					field          : 'thumbnail',
					visible        : true,
					cellTemplate   : '<img style="height:50px;margin-left:10px;" ng-src="{{grid.getCellValue(row, col)}}" lazy-src>',
					width          : '70',
					enableFiltering: false,
					enableSorting  : false
				},
				{name: 'Title', field: 'title', visible: true},
				{name: 'Genre', field: 'genre', visible: true},
				{name: 'Author', field: 'author', visible: true},
				{name: 'Publisher', field: 'publisher', visible: true},
				{name: 'Date Published', field: 'publishDate', visible: true},
				{name: 'Language', field: 'language', visible: true},
				{name: 'Pages', field: 'pageCount', visible: true},
				{
					name           : 'Rating',
					field          : 'googleRating',
					visible        : true,
					enableFiltering: false,
					cellTemplate   : '<div class="ui-grid-cell-contents"><rating ng-model="row.entity.googleRating"max="5"readonly="isReadonly"></rating></div>'
				},
				{
					name           : 'Availability',
					field          : 'Available',
					visible        : true,
					cellClass      : 'grid-align',
					enableFiltering: false,
					cellTemplate   : '<span style="text-align:center;"class="yes" ng-show="grid.getCellValue(row, col) == true">Available</span><span class="no" ng-show="grid.getCellValue(row, col) == false">Lent out</span>  '
				},
				{
					name           : 'User',
					field          : 'userID',
					visible        : true,
					enableFiltering: true,
				},
				{
					name           : 'Actions',
					visible        : true,
					enableFiltering: false,
					cellTemplate   : '<div class="ui-grid-cell-contents"><button class="btn btn-primary" ng-click="grid.appScope.showInfo(row)">Open</button></div>'
				},
			]
		};

		$scope.showInfo = function (book) {

			books.getInfo(book.entity.googleID).then(
				function (data) {
					//success

					var index = 0;

					$scope.previewBook = {
						title      : data.items[index].volumeInfo.title,
						subTitle   : data.items[index].volumeInfo.subTitle,
						author     : (data.items[index].volumeInfo.authors) ? data.items[index].volumeInfo.authors.join(", ") : 'Unknown',
						description: data.items[index].volumeInfo.description,
						genre      : (data.items[index].volumeInfo.categories) ? data.items[index].volumeInfo.categories.join(", ") : 'Unknown',
						image      : data.items[index].volumeInfo.imageLinks.thumbnail,
						previewlink: data.items[index].volumeInfo.previewLink,
						pageCount  : data.items[index].volumeInfo.pageCount,
						publisher  : data.items[index].volumeInfo.publisher,
						publishDate: data.items[index].volumeInfo.publishedDate,
						language   : data.items[index].volumeInfo.language,
						rating     : data.items[index].volumeInfo.averageRating,
						isbn       : (data.items[index].volumeInfo.industryIdentifiers) ? data.items[index].volumeInfo.industryIdentifiers[0].identifier : 'Unknown'
					};

					console.log(data);
					$('#previewModal').modal('show');

				},
				function (data) {
					//fall
					console.log(data);
				});
		};

		books.all().then(
			function (data) {
				//success

				$scope.books = data;

				$scope.gridOptions.data = $scope.books;
				$scope.loading = false;
			},
			function (data) {
				//fall
				console.log(data);
			});


		$scope.showBook = function (keyword) {

			var $btn = $('#searchButton').button('loading');


		}


	});
