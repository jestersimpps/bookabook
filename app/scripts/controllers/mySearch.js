'use strict';


angular.module('bookxchangeApp')
	.controller('mySearchCtrl', function ($rootScope, $scope, $modal, books) {


		$rootScope.tabIndex = 21;
		$rootScope.loading = true;
		$scope.height = window.innerHeight - 190;


		$scope.searchRadiusOptions = {
			options : [
				{id: '1 km', value: 1000},
				{id: '5 km', value: 5000},
				{id: '10 km', value: 10000},
				{id: '20 km', value: 20000},
				{id: '30 km', value: 30000},
				{id: '50 km', value: 50000},
				{id: '100 km', value: 100000}
			],
			selected: {id: '10 km', value: 10000}
		};


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
				{name: 'Publisher', field: 'publisher', visible: true, width: '150'},
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
					visible        : true,
					cellClass      : 'grid-align',
					enableFiltering: false,
					cellTemplate   : '<div class="ui-grid-cell-contents"><span class="grid-align"><button ng-show="row.entity.showAddress" class="btn btn-default btn-sm" ng-click="grid.appScope.showRoute(row)">{{grid.appScope.calculateDistance(row)}} km</button></span><span ng-hide="row.entity.showAddress" class="grid-align">{{grid.appScope.calculateDistance(row)}} km</span></span></div>',
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




		books.all().then(
			function (data) {
				//success
				console.log(data);
				$scope.gridOptions.data = data;
				$rootScope.loading = false;

			},
			function (data) {
				//fall
				console.log(data);
			});


		$scope.showBook = function (keyword) {
			var $btn = $('#searchButton').button('loading');
			//todo
			//	parse query
		};

		$scope.calculateDistance = function (row) {

			var bookLat = row.entity.location.latitude;
			var bookLng = row.entity.location.longitude;
			var userLat = $rootScope.currentUser.location.latitude;
			var userLng = $rootScope.currentUser.location.longitude

			return getDistanceFromLatLonInKm(userLat, userLng, bookLat, bookLng);

		};

		function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
			var R = 6371; // Radius of the earth in km
			var dLat = (lat2 - lat1) * (Math.PI / 180);  // deg2rad
			var dLon = (lon2 - lon1) * (Math.PI / 180);
			var a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
				Math.sin(dLon / 2) * Math.sin(dLon / 2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			var d = R * c; // Distance in km
			return Math.round(d);
		}


	});


