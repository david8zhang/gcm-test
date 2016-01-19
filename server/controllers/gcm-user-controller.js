var AWS = require('aws-sdk');
var sha1 = require('sha-1');
var docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });

/** Get the user based on the id. */
exports.getUser = function(req, res) {
	var user_id = req.query.user_id;
	params.TableName = 'GCM-users';

}