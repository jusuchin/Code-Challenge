var app = angular.module('app', ['ngSanitize']);

app.filter('map', function() {
  return function(input, propName) {
    return input.map(function(item) {
      return item[propName];
    });
  };
});

app.factory('apiService', function ($http) {
    var booksApiEndPoint = 'https://www.googleapis.com/books/v1/volumes'
    return {
        getBooks: function (searchTerm) {
            return $http.get(booksApiEndPoint + '?q=' + searchTerm + '&projection=lite&maxResults=15')
                .then(function (response) {
                    return response.data;
                })
        }
    }
});

app.controller('MainController', ['$scope', 'apiService', function ($scope, apiService) {

    $scope.getBooks = function () {
        if (typeof $scope.searchTerm !== 'undefined' && $scope.searchTerm !== '') {
            apiService.getBooks($scope.searchTerm)
                .then(function (apiResponse) {
                    $scope.books = apiResponse;
                    $scope.resultsFound = true;
                    $scope.lastSearchTerm = $scope.searchTerm;
                    if ($scope.books.totalItems == 0) {
                        $scope.resultsFound = false;
                        $scope.resultsMessage = 'No Results Found.  Please enter a different search.'
                    }
                });
        }

        if ($scope.searchTerm === '') {
            $scope.resultsFound = false;
            $scope.resultsMessage = 'No search term was entered. Please enter a search term.'
        }
    }

}]);