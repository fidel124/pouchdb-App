var app = angular.module('testApp', []);

app.run(function($pouchDB){
  $pouchDB.setDatabase("pouchdb-sample");
  //$pouchDB.sync("http://localhost:44984/remote-pouchdb");
})





     
   

   
  
    