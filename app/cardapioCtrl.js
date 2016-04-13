app.controller('cardapioCtrl', function ($scope, Data, $location) {
	

	//MOSTRAR OS LANCHES
	Data.get('todosOsLanches').then(function(result){	 	
	 	var cardapio=result;	 	
	 	//console.log(result);
	  	if(cardapio.status == 'success') {
	  		$scope.cardapio = cardapio.data;
	  	}else{
	   		$scope.err = "Erro!";
	  	} 
	});

	//SALVAR LANCHE
	$scope.saveLanche = function (lanche) {  
		if(lanche.id == null || undefined){
			Data.post('cadastroLanches', lanche).then(function (result) {
		        if(result.status != 'error'){
		            var x = angular.copy(lanche);
		            x.save = 'insert';
		            x.id = result.data;                                                                                              
		        }else{
		            $scope.err = result.message;
		        }
		        $scope.cardapio.push(lanche);
		        $scope.lanche = {};  
	    }); 
	  } else {
	  	Data.put('editarlanche', lanche).then(function (result) {
		        if(result.status != 'error'){
		                                                                                                         
		        }else{
		           $scope.err = result.message;
		        }
		        $scope.lanche = {};  
	  });
	};
};


	// // EDITAR LANCHE
	 $scope.editarLanche = function(lanche){
		$scope.lanche=lanche;
	 };

	//DELETAR LANCHE
	$scope.deleteLanche = function(lanche){
       if(confirm("Deseja realmente deletar o Lanche?")){
            Data.delete("excluirLanche/"+lanche.id).then(function(result){
                $scope.cardapio = _.without($scope.cardapio, _.findWhere($scope.cardapio, {id:lanche.id}));
            });
       }
    }; 
});