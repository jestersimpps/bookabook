'use strict';

/**
 * @ngdoc function
 * @name bookxchangeApp.controller:myBooksCtrl
 * @description
 * # myBooksCtrl
 * Controller of the bookxchangeApp
 */
angular.module('bookxchangeApp')
	.controller('myBooksCtrl', function ($rootScope, $scope) {

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


	});
