'use strict';


angular.module('bookxchangeApp')
	.controller('myBooksCtrl', function ($rootScope, $scope, books) {

		$rootScope.tabIndex = 22;
		$rootScope.loading = true;
		$scope.height = window.innerHeight - 190;

		function rowTemplate() {
			return '<div ng-dblclick="grid.appScope.rowDblClick(row)" >' +
				'  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
				'</div>';
		}

		$scope.gridOptions = {
			data                     : [],
			enableFiltering          : true,
			enableRowSelection       : true,
			enableRowHeaderSelection : false,
			multiSelect              : false,
			enableHorizontalScrollbar: 2,
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
				{name: 'Title', field: 'title', visible: true, minWidth: '200'},
				{name: 'Author', field: 'author', visible: true, width: '150'},
				{name: 'Genre', field: 'genre', visible: true, width: '150'},
				{name: 'Publisher', field: 'publisher', visible: true, width: '150'},
				{name: 'Language', field: 'language', visible: true, width: '100'},

				{
					name           : 'Status',
					field          : 'status',
					visible        : true,
					cellClass      : 'grid-align',
					enableFiltering: false,
					cellTemplate   : '<span style="text-align:center;"class="yes" ng-show="grid.getCellValue(row, col) == true">Available</span><span class="no" ng-show="grid.getCellValue(row, col) == false">Lent out</span>  ',
					width          : '100'
				},
				{
					name           : 'Rating',
					field          : 'googleRating',
					visible        : true,
					enableFiltering: false,
					cellTemplate   : '<div class="ui-grid-cell-contents"><rating ng-model="row.entity.googleRating"max="5"readonly="isReadonly"></rating></div>',
					width          : '80'
				}
			]
		};


		getMyBooks();
		function getMyBooks() {
			books.my(Parse.User.current()).then(
				function (data) {
					//success
					$scope.books = data;
					$scope.gridOptions.data = $scope.books;
					$rootScope.loading = false;

				},
				function (data) {
					//fail
					console.log(data);
				});
		}


		$scope.searchNewBooks = function (keyword) {
			console.log('search');
			var $btn = $('#newBookSearchButton').button('loading');
			books.getMatching(keyword).then(
				function (data) {
					//success
					$scope.newBooks = data.items;
					//logging
					console.log(data);
					$btn.button('reset');
				},
				function (data) {
					//fail
					console.log(data);
				});
		};

		$scope.showNewBookModal = function () {
			$('#newBookModal').modal('show');
		};

		$scope.closeNewBookModal = function () {
			$scope.newBooks = null;
			$scope.newBookKeyword = null;
			$('#newBookModal').modal('hide');
		};

		$scope.addToCollection = function (book) {

			var newBook = {
				userID      : Parse.User.current(),
				googleID    : book.id,
				location    : Parse.User.current().get("location"),
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
					// recalculate number of user books
					Parse.User.current().set("totalBooks", $rootScope.currentUser.totalBooks + 1);
					Parse.User.current().save(null, {
						success: function (user) {
							$rootScope.currentUser = user;
							$scope.newBooks = null;
							$scope.newBookKeyword = null;
							$('#newBookModal').modal('hide');
							getMyBooks();
						},
						error  : function (user, error) {
							//fall
							console.log(data);
						}
					});
				},
				function (data) {
					//fall
					console.log(data);
				});
		}


	});
