angular.module('patientService', [])

    // super simple service
    // each function returns a promise object
    .factory('Patients', [ '$http',  function($http) {
        return {
            get : function() {
                return $http.get('/api/v1/patients');
            },
            create : function(todoData) {
                return $http.post('/api/todos', todoData);
            },
            delete : function(id) {
                return $http.delete('/api/todos/' + id);
            }
        }
    }]);
