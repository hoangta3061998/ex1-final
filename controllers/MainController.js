app.controller("MainController", [
  "$scope",
  "MyService",
  function($scope, MyService) {
    MyService.getData().then(function(data) {
      $scope.tree = data;
      
    });
    $scope.alert = function(){
      alert($scope.searchString);
    }
    
    
   
    
  }
]);
