'use strict';
// Include our "db"
var db = require('../../config/db')();
const _ = require('lodash');
const Promise = require('bluebird');

// Exports all the functions to perform on the db
module.exports = { getAll, getAverageFixedCost, getEarning, getPerformanceComercial };

//GET /consultant 
function getAll(req, res, next) {
	db.find().then(function (values) {
		res.json({ data: values });
	});
}
//POST /consultant/average 
function getAverageFixedCost(req, res, next) {
		var consultants = req.body.consultants;
		db.averageFixedCost(consultants).then(function (response) {
			var objectlist = _.clone(response);

			var generateValues = new Promise.map(response, function(o) { 
				return o.brut_salario 
			});

			var getSum = new Promise.reduce(generateValues, function(sum, n) {
					return sum + n;
			});

			Promise.all([generateValues, getSum]).then(function (res) {
				objectlist.allSalario = res[1];
			}).then(function (response) {
				res.json({ data: objectlist, allSalario: objectlist.allSalario});
			});

		});
}

//POST /consultant/earnings 
function getEarning(req, res, next) {
	var consultants = req.body.consultants;
	var monthstart = req.body.monthStart;
	var monthend = req.body.monthEnd;
	db.earnings(consultants, monthstart, monthend).then(function (response) {
		res.json({ data: response });
	});

}

//POST /consultant/performance 
function getPerformanceComercial(req, res, next) {
		var consultants = req.body.consultants;
		var monthstart = req.body.monthStart;
		var monthend = req.body.monthEnd;
		db.performanceComercial(consultants, monthstart, monthend).then(function (response) {
			res.json({ data: response });
		});
}