/** A lambda function that runs in response to S3 events. */
var async = require('async');
var util = require('util');
var Client = require('node-rest-client').Client;


exports.handler = function(event, context) {
	console.log("Reading options from event: \n", util.inspect(event, {depth: 5}));
	var srcBucket = event.Records[0].s3.bucket.name;

	async.waterfall([
		function upload(next) {
			var client = new Client();
			var ddbargs = {
				parameters: {text: "algorithm results go here!"},
				headers: {"Content-Type" : "application/json"}
			};
			client.post("https://fast-taiga-6198.herokuapp.com/api/v1/gcm/upload", ddbargs, function(data) {
				console.log(data);
				console.log(response);
			})

		}
	])
}