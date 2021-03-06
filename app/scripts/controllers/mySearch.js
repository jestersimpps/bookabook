'use strict';


angular.module('bookxchangeApp')
	.controller('mySearchCtrl', function ($rootScope, $scope, $modal, books) {


		$rootScope.tabIndex = 21;
		$rootScope.loading = true;
		$scope.height = window.innerHeight - 190;


		$scope.searchRadiusOptions = {
			options : [
				{id: '1 km', value: 1},
				{id: '5 km', value: 5},
				{id: '10 km', value: 10},
				{id: '20 km', value: 20},
				{id: '30 km', value: 30},
				{id: '50 km', value: 50},
				{id: '100 km', value: 100}
			],
			selected: {id: '10 km', value: 10}
		};


		$scope.logIn = function () {
			$rootScope.authenticated = true;
		};


		$scope.gridOptions = {
			data                     : [],
			enableFiltering          : true,
			enableSorting            : true,
			enableRowSelection       : true,
			enableRowHeaderSelection : false,
			multiSelect              : false,
			enableHorizontalScrollbar: 2,
			noUnselect               : true,
			rowHeight                : 40,
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
				{name: 'Language', field: 'language', visible: true, width: '100'},
				{
					name           : 'Rating',
					field          : 'googleRating',
					visible        : true,
					enableFiltering: false,
					cellTemplate   : '<div class="ui-grid-cell-contents"><rating ng-model="row.entity.googleRating"max="5"readonly="isReadonly"></rating></div>',
					width          : '100'
				},
				{
					name           : 'Distance',
					field          : 'distance',
					visible        : true,
					cellClass      : 'grid-align',
					enableFiltering: false,
					cellTemplate   : '<div class="ui-grid-cell-contents"><span class="grid-align"><button ng-show="row.entity.showAddress" class="btn btn-default btn-sm" ng-click="grid.appScope.showRoute(row)">{{grid.getCellValue(row, col)}} km</button></span><span ng-hide="row.entity.showAddress" class="grid-align">{{grid.getCellValue(row, col)}} km</span></span></div>',
					width          : '100'
				},
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
					name           : 'User',
					field          : 'userName',
					visible        : true,
					enableFiltering: true,
					cellTemplate   : '<div class="ui-grid-cell-contents"><button class="btn btn-default btn-sm" style="width:120px;" ng-click="grid.appScope.showUser(row)">{{grid.getCellValue(row, col)}}</button></div>',
					width          : '130'
				},
				{
					name   : 'UserID',
					field  : 'userID',
					visible: false
				},
				{
					name           : 'Book',
					visible        : true,
					enableFiltering: false,
					width          : '120',
					cellTemplate   : '<div class="ui-grid-cell-contents"><button class="btn btn-primary btn-sm" ng-click="grid.appScope.showInfo(row)">Info</button><button style="margin-left: 5px;" class="btn btn-info btn-sm" ng-click="grid.appScope.borrowBook(row)">Borrow</button></div>'
				}
			]
		};

		searchBooks();
		function searchBooks() {
			books.all($scope.searchRadiusOptions.selected.value).then(
				function (data) {
					//success
					console.log(data);
					$scope.gridOptions.data = data;
					$rootScope.loading = false;

				},
				function (data) {
					//fail
					console.log(data);
				});
		}


		$scope.search = function (keyword) {
			var $btn = $('#searchButton').button('loading');
			//todo
			//	parse query
		};


	});


