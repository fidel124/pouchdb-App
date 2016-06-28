app.controller('MainCtrl',['$scope','$rootScope','$pouchDB', function($scope, $rootScope,$pouchDB){
  $scope.items = {};
  $pouchDB.startListening();

  $rootScope.$on("$pouchDB:change", function(event, data){
    $scope.items[data.doc._id] = data.doc;
    $scope.$apply();
  });

  $rootScope.$on("$pouchDB:delete", function(event, data){
    delete $scope.items[data.doc._id];
    $scope.$apply();
  });

  $scope.save = function(p){ // clicking the add button
    if(typeof p.firstname === 'string' && (typeof p.lastname === 'string') && p.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/) == p.email){
     var jsonObject = {          // much much form validation is required here.
      "firstname": p.firstname,
      "lastname": p.lastname,
      "email": p.email
     }
    
    if(p._id){
      jsonObject._id = p._id;
      jsonObject._rev = p._rev;            
    }
    $pouchDB.save(jsonObject).then(function(response){
    });
      $scope.inputForm = {};
    }   
  }

  $scope.delete = function(id,rev){ // clicking the Del button
    $pouchDB.delete(id,rev);
  }

  $scope.edit = function(id){ // clicking the Edit button, for some reason   
    $pouchDB.get(id).then(function(response){// this has to be click 2 times
      $scope.inputForm = response;           // for it to work
    }, function(error){
      console.log("Error " + JSON.stringify(error));
    });    
  }

  $scope.cancel = function(){ // clicking the Cancel botton
    $scope.inputForm = {};
  }

}]);