app.service('$pouchDB',['$rootScope','$q',  function($rootScope, $q){
  var database;
  var changeListener;

  this.setDatabase = function(databaseName){
    database = new PouchDB(databaseName);
  }

  this.startListening = function(){
    changeListener = database.changes({// listening to changs
      live: true,
      include_docs: true
    }).on("change", function(change){ 
      if(!change.deleted){
        $rootScope.$broadcast("$pouchDB:change", change);
      }else{
        $rootScope.$broadcast("$pouchDB:delete", change);
      }
    });
  }
    /*
  this.sync = function(remoteDatabase){
    database.sync(remoteDatabase, {live: true, retry: true});
  }; */

  this.save = function(jsonDocument){
    var deferred = $q.defer();
    if(!jsonDocument._id){ //post if the object has no _id data
      database.post(jsonDocument).then(function(response){
        deferred.resolved(response);
      }).catch(function(error){        
          deferred.reject(error);        
      });
    }else{  //put if the object has _id data
      database.put(jsonDocument).then(function(response){
        deferred.resolve(response);
      }).catch(function(error){
        deferred.reject(error);
      });
    }
    return deferred.promise;
  }

  this.delete = function(documentId,rev){ // using _id and _rev data
    return database.remove(documentId, rev);
  }

  this.get = function(documentId){ // using _id data
    return database.get(documentId);
  }
}]);