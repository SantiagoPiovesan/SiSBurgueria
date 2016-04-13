var validationApp = angular.module('validationApp', []);

validationApp.controller('mainController', function($scope) {
	$scope.submitForm = function(isValid) {
        if (isValid) {
            alert('E-mail Enviado com sucesso!');
            window.location.href = "../index.html"; 
        }
    };
});