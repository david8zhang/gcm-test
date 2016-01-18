var AWS = require('aws-sdk');
var sha1 = require('sha-1');
var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

/** Get all the GCM Objects. */
exports.getObjs = function(req, res) {
	var start = req.query.start;
	var end = req.query.end;
	var params = {};
	params.TableName = 'GCM-obj';
	if(start != null && end != null) {
		var count = start - end;
		params.Limit = count;
	}
	docClient.scan(params, function(err, data) {
		if(err) {
			console.log(err, err.stack);
		} else {
			var jsonString = JSON.parse(JSON.stringify(data));
			res.json(jsonString);
		}
	})
};

/** POST a new GCM Object. */
exports.postObj = function(req, res) {
	var text = req.body.text;
	var id = sha1(text + Math.floor(Date.now() / 1000).toString());

	//POST to DynamoDB
	var params = {};
	params.TableName = 'GCM-obj';
	params.Item = {
		id: id,
		text: text
	}
	docClient.put(params, function(err, data) {
		if(err) {
			res.send(err);
		} else {
			var response = {};
			response.id = id;
			console.log("Successfully posted object");
			res.send(response);
		}
	})
}