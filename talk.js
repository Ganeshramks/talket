app = angular.module("talket",['ngMaterial']);

app.controller("talketrl", ["$scope", "$http", function($scope, $http){

	$scope.msg = "Om Sai Ram";

	$scope.btn_name = "Play Now";
	
	$scope.start = function(){
		if ($scope.board_name !== undefined) {

		} else {
			
			$scope.btn_name = "Start";
		}
	}

	$scope.playGame = function(){

		ws = new WebSocket('ws://localhost:8000');

		ws.onopen =  function(){
			console.log('ws connection opened');
			ws.send('Hi from Browser!', function(err){
				if (err)
					console.log(err);
			})
		};

		ws.onmessage =  function(message, flags){
			console.log('received : '+JSON.parse(message.data));
		};

		ws.onclose = function(){
			console.log('ws connection closed');
		};
	}

}]);
