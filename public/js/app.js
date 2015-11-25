var patientApp = angular.module('patientApp', [] );

// super simple service
// each function returns a promise object
patientApp.factory('Patients', [ '$http',  function($http) {
    return {
        list : function() {
            return $http.get('/api/v1/patients');
        },
        get : function(id) {
            return $http.get('/api/v1/patient/' + id);
        },
        getMedications : function(id) {
            return $http.get('/api/v1/patientMedications/' + id);
        },
        getVitals : function(id) {
            return $http.get('/api/v1/patientVitals/' + id);
        },
        saveVitals : function(id, todoData) {
            return $http.post('/api/v1/patientVitals/' + id, todoData);
        }
    }
}]);

// inject the Patients service factory into our controller
patientApp.controller('mainController', ['$scope', '$http', 'Patients', function($scope, $http, Patients) {
    $scope.formData = {};

    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
    Patients.list()
        .success(function(data) {
            $scope.patients = data;
        });

    $scope.getPatientDetails = function(id) {
        Patients.getMedications(id).success(function(data){
            $scope.patientMedications = data
        });

        Patients.getVitals(id).success(function(data){
            $scope.patientVitals = data
        });
    }

    $scope.saveVitals
    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.saveVitals = function(id) {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        // people can't just hold enter to keep adding the same to-do anymore
        if (!$.isEmptyObject($scope.formData)) {

            // call the create function from our service (returns a promise object)
            Patients.saveVitals(id, $scope.formData)

                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.patients = data; // assign our new list of patients
                });
        }
    };

}]);
