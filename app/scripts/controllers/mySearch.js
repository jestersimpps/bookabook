'use strict';


angular.module('bookxchangeApp')
	.controller('mySearchCtrl', function ($rootScope, $scope, $modal, books) {


		$rootScope.tabIndex = 21;
		$rootScope.loading = true;

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
					cellTemplate   : '<div class="ui-grid-cell-contents"><span class="grid-align"><a href="#/">{{grid.appScope.calculateDistance(row)}} km</a></span></div>',
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
					cellTemplate   : '<span class="grid-align"><a href="#/" ng-click="grid.appScope.showUser(row)">{{grid.getCellValue(row, col)}}</a></span>',
					width          : '110'
				},
				{
					name   : 'UserID',
					field  : 'userID',
					visible: false
				},
				{
					name           : 'Actions',
					visible        : true,
					enableFiltering: false,
					width          : '135',
					cellTemplate   : '<div class="ui-grid-cell-contents"><button class="btn btn-primary" ng-click="grid.appScope.showInfo(row)">Info</button><button style="margin-left: 5px;" class="btn btn-info" ng-click="grid.appScope.borrowBook(row)">Borrow</button></div>'
				}
			]
		};


		function setHeight() {
			//$scope.height = (($scope.gridOptions.data.length * 50) + 50);
			$scope.height = window.innerHeight - 190;
		}


		books.all().then(
			function (data) {
				//success

				$scope.books = data;

				$scope.gridOptions.data = $scope.books;
				$rootScope.loading = false;
				setHeight();
			},
			function (data) {
				//fall
				console.log(data);
			});


		$scope.showBook = function (keyword) {

			var $btn = $('#searchButton').button('loading');


		};

		$scope.calculateDistance = function (row) {

			var bookLat = row.entity.location.latitude;
			var bookLng = row.entity.location.longitude;
			var userLat = $rootScope.currentUser.attributes.location.latitude;
			var userLng = $rootScope.currentUser.attributes.location.longitude

			return getDistanceFromLatLonInKm(userLat, userLng, bookLat, bookLng);

		};

		function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
			var R = 6371; // Radius of the earth in km
			var dLat = deg2rad(lat2 - lat1);  // deg2rad below
			var dLon = deg2rad(lon2 - lon1);
			var a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
				Math.sin(dLon / 2) * Math.sin(dLon / 2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			var d = R * c; // Distance in km
			return Math.round(d);
		}

		function deg2rad(deg) {
			return deg * (Math.PI / 180)
		}


	});


