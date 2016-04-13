var app = angular.module('myApp', ['ngRoute'] );
    
app.config(['$routeProvider', function($routeProvider){
  	$routeProvider.when('/', 	     {templateUrl: 'pages/home.html'});
	$routeProvider.when('/cardapio', {templateUrl: 'pages/cardapio.html', controller:'cardapioCtrl'});
	$routeProvider.when('/pedido',   {templateUrl: 'pages/pedido.html'});
	$routeProvider.when('/entrega',  {templateUrl: 'pages/entrega.html'});
	$routeProvider.when('/contato',  {templateUrl: 'pages/contato.html', controller:'contatoCtrl'});
	$routeProvider.when('/admin', 	 {templateUrl: 'pages/admin.html', controller:'cardapioCtrl'});
 	$routeProvider.otherwise({redirectTo: '/'})
 }]);

