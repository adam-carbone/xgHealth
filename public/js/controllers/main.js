// js/controllers/main.js
angular.module('patientController', [])

    // inject the Patients service factory into our controller
    .controller('mainController', ['$scope', '$http', function($scope, $http, Patients) {
        $scope.formData = {};

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        Patients.get()
            .success(function(data) {
                $scope.todos = data;
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            // people can't just hold enter to keep adding the same to-do anymore
            if (!$.isEmptyObject($scope.formData)) {

                // call the create function from our service (returns a promise object)
                Patients.create($scope.formData)

                    // if successful creation, call our get function to get all the new todos
                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.patients = data; // assign our new list of patients
                    });
            }
        };

        // DELETE ==================================================================
        // delete a todo after checking it
        $scope.deleteTodo = function(id) {
            Patients.delete(id)
                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.patients = data; // assign our new list of patients
                });
        };
    }]);
