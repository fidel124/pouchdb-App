var express = require('express');
var app = express();

//set port
app.set('port', (3000));
// set static path
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function(){
   console.log('Server Has started on port: '+app.get('port'));
});