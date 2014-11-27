var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('decisiondb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'decisiondb' database");
        db.collection('decisions', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'decisions' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    db.collection('decisions', function(err, collection) {
        collection.findOne({'decisionId': id}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('decisions', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addDecision = function(req, res) {
    var decision = req.body;
    console.log('Adding decision: ' + JSON.stringify(decision));
    db.collection('decisions', function(err, collection) {
        collection.insert(decision, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateDecision = function(req, res) {
    var id = req.params.id;
    var decision = req.body;
    console.log('Updating decision: ' + id);
    console.log(JSON.stringify(wine));
    db.collection('decisions', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, decision, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating decision: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(decision);
            }
        });
    });
}

exports.deleteDecision = function(req, res) {
    var id = req.params.id;
    console.log('Deleting decision: ' + id);
    db.collection('decisions', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

var populateDB = function(){
	var decisions =[
		{
			id: '1',
			title: 'Linehaul Scheduling – Task Creation',
			description: '24 In the transport department in DK tasks can be created for the driver to pick up equipment and leave to a location thus enabling asset management, these actions are supported in TSS. In NO tasks are not used, therefor no support for tasks exists in DDS.',
			recommender: 'Recommender',
			decisionType: 'Governance',
			decisionForum: 'Program Managment',
			decisionOwner: 'Decision Owner',
			status: 'Work in progress',
			created: 'Created',
			planDecisionDate: 'Plan Decision Date',
			actualDecisionDate: 'Actual Decision Date',
			options: [
							{
								title: 'Option 1: Keep functionality in TSS and manage pick up transport operations in TSS',
								proscons: [
												{
													type: 'pro',
													text: 'No disruption of current process for managing distribution services '
												},
												{
													type: 'pro',
													text: 'All current capability for within POL(MAM) will be maintained'
												},
												{
													type: 'pro',
													text: 'Minimum development needs within DDS.'
												},
											]
							},
							{
								title: 'Option 2: Develop TSS capability in DDS and adopt DDS process',
								proscons: 
								[
									{
										type: 'con',
										text: 'Multiple changes need to be performed DSS and in surrounding systems, interfaces (SAP etc.)'
									}
								]
							},
							{
								title: 'Option 3: Adopt DDS and NO process to current DK process ',
								proscons:
								[
									{
										type: 'con',
										text: 'Capability to manage and control transport operations will decreased leading to increase in operational costs'
									}
								]
							},

						],
			recommendation: 'Option 1',
			decision: 'decision'
		},
	];

	db.collection('decisions', function(err, collection){
		collection.insert(decisions, {safe:true}, function(err, result){});
	});
}
