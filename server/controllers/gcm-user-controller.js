var AWS = require('aws-sdk');
var sha1 = require('sha-1');
var docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });

/** GET the user based on the id. */
exports.getUser = function(req, res) {
	var user_id = req.query.user_id;
	params = {};
	params.TableName = 'GCM-users';
	params.FilterExpression = "user_id = :user_id";
	params.ExpressionAttributeValues = {
		":user_id" : user_id
	};
	docClient.scan(params, function(err, data) {
		if(err) {
			res.send(err);
		} else {
			res.json(data);
		}
	})
}

/** POST a new user to the database. */
exports.createUser = function(req, res) {
	var reg_token = req.body.reg_token;
	var user_id = sha1(Math.floor(Date.now() / 1000).toString());
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var params = {};
	params.TableName = 'GCM-users'
	params.Item = {
		user_id: user_id,
		email: email,
		username: username,
		password: password,
		reg_token: reg_token
	}
	docClient.put(params, function(err, data) {
		if(err) {
			res.send(err);
		} else {
			res.status(200).send("Success! User was created!");
		}
	})
}