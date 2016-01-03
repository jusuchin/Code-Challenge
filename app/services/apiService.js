app.factory('apiService', ['$http', function ($http) {
    var booksApiEndPoint = 'https://www.googleapis.com/books/v1/volumes'
    return {
        getBooks: function (searchTerm) {
            return $http.get(booksApiEndPoint + '?q=' + searchTerm + '&projection=lite&maxResults=15')
                .then(function (response) {
                    return response.data;
                })
        }
    }
}]);