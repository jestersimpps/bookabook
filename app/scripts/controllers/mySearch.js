'use strict';


angular.module('bookxchangeApp')
	.controller('mySearchCtrl', function ($rootScope, $scope, $modal, books) {


		$rootScope.tabIndex = 21;
		$rootScope.loading = true;


		$scope.logIn = function () {
			$rootScope.authenticated = true;
		};


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
				{name: 'Title', field: 'title', visible: true,minwidth:'200'},
				{name: 'Author', field: 'author', visible: true, width: '150'},
				{name: 'Genre', field: 'genre', visible: true, width: '150'},
				{name: 'Publisher', field: 'publisher', visible: true,width:'150'},
				{name: 'Language', field: 'language', visible: true, width: '100'},
				{
					name           : 'Rating',
					field          : 'googleRating',
					visible        : true,
					enableFiltering: false,
					cellTemplate   : '<div class="ui-grid-cell-contents"><rating ng-model="row.entity.googleRating"max="5"readonly="isReadonly"></rating></div>',
					width          : '80'
				},
				{
					name           : 'Availability',
					field          : 'Available',
					visible        : true,
					cellClass      : 'grid-align',
					enableFiltering: false,
					cellTemplate   : '<span style="text-align:center;"class="yes" ng-show="grid.getCellValue(row, col) == true">Available</span><span class="no" ng-show="grid.getCellValue(row, col) == false">Lent out</span>  ',
					width        : '100'
				},
				{
					name           : 'User',
					field          : 'userName',
					visible        : true,
					enableFiltering: true,
					cellTemplate   : '<span class="grid-align"><a href="#/">{{grid.getCellValue(row, col)}}</a></span>',
					width          : '110'
				},
				{
					name           : 'Actions',
					visible        : true,
					enableFiltering: false,
					width          : '135',
					cellTemplate   : '<div class="ui-grid-cell-contents"><button class="btn btn-primary" ng-click="grid.appScope.showInfo(row)">Info</button><button style="margin-left: 5px;" class="btn btn-info" ng-click="grid.appScope.borrowBook(row)">Borrow</button></div>'
				},
			]
		};



		books.all().then(
			function (data) {
				//success

				$scope.books = data;

				$scope.gridOptions.data = $scope.books;
				$rootScope.loading = false;
			},
			function (data) {
				//fall
				console.log(data);
			});


		$scope.showBook = function (keyword) {

			var $btn = $('#searchButton').button('loading');


		};


	});
