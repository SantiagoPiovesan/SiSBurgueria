app.controller('contatoCtrl', function ($scope, Data, $location) {
	$scope.submitForm = function(isValid) {
        if (isValid) {
            alert('E-mail Enviado com sucesso!');
            window.location.href = "#/"; 
        }
    };
});