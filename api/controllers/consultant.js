'use strict';
// Include our "db"
var db = require('../../config/db')();
// Exports all the functions to perform on the db
module.exports = { getAll, getAverageFixedCost, getEarning };

//GET /consultant 
function getAll(req, res, next) {
	db.find().then(function(values) {
		res.json({ data: values });
	});
}
//POST /consultant/average 
function getAverageFixedCost(req, res, next) {
		var consultants = req.body.consultants;
		db.averageFixedCost(consultants).then(function(response) {
			res.json({ data: response });
		});
}

//POST /consultant/earnings 
function getEarning(req, res, next) {
	var consultants = req.body.consultants;
	var monthstart = req.body.monthStart;
	var monthend = req.body.monthEnd;
	db.earnings(consultants, monthstart, monthend).then(function(response) {
		res.json({ data: response });
	});
	
}