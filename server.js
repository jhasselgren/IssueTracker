
var express = require('express');
var bodyParser = require('body-parser');
var decision = require('./server/decision');
 
var app = express();

//app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());

/*
app.get('/', function(req, res){
	res.render('index.html');
});
*/

app.get('/api/decision', decision.findAll);
app.get('/api/decision/:id', decision.findById);
app.post('/api/decision', decision.addDecision);
app.put('/api/decision/:id', decision.updateDecision);
app.delete('/api/decision/:id', decision.deleteDecision);


 
app.listen(3000, function(){
	console.log('Listening on port 3000...');
});
