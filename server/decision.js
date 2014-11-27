var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var options ={
	server: {},
	replset: {}
};

options.server.socketOptions = options.replset.socketOptions = { keepAlive: 1 };

mongoose.connect('mongodb://localhost:27017/decisiondb');

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback () {
	/*
	conn.db.collection('decisions', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'decisions' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
	*/
	console.log("Connected to 'decisiondb' database");
});

var decisionSchema = mongoose.Schema({
	decisionId: String,
	title: String,
	description: String,
	recommender: String,
	decisionType: String,
	decisionForum: String,
	decisionOwner: String,
	status: String,
	created: String,
	planDecisionDate: String,
	actualDecisionDate: String,
	decisionOptions: [{title: String, proscons: [{type: String, text: String}]}],
	recommendation: String,
	decision: String
});

decisionSchema.set('toJSON', { getters: true });

var Decision = mongoose.model('Decision', decisionSchema);

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving decision: ' + id);

    Decision.findOne({'decisionId':id}, function(err, decision){
    	if(err) return console.error(err);
    	res.send(decision);
    });
};

exports.findAll = function(req, res) {
	Decision.find(function(err, decisions){
		if(err) return console.error(err);

		 res.send(decisions);

	});
};

function addDecision(req, res) {
    var decision = req.body;
    console.log('Adding decision: ' + JSON.stringify(decision));

    var promise = Decision.create(decision, function(err, savedDecision){
        if(err) return console.error(err);
    });

    promise.then(function(savedDecision){
        res.send(savedDecision);
    });
}

exports.addDecision = addDecision;


exports.updateDecision = function(req, res) {
    var id = req.params.id;
    var decisionData = req.body;
    console.log('Updating decision: ' + id);
    console.log(JSON.stringify(decisionData));


    Decision.findByIdAndUpdate(id, { $set: decisionData }, function (err, decision) {
        if (err) return console.error(err);

        console.log('' + decision + ' document(s) updated');
        res.send(decision);
    });

}

exports.deleteDecision = function(req, res) {
    var id = req.params.id;
    console.log('Deleting decision: ' + id);

    Decision.remove({'_id': id}, function(err){
        if(err) return console.error(err);

        console.log('' + id + ' deleted');
        res.send(id);

    });
}
