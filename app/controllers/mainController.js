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