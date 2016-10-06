'use strict';
// Include our "db"
var db = require('../../config/db')();
// Exports all the functions to perform on the db
module.exports = { getAll, save, getOne, update, delMovie, getEarning };

//GET /consultant operationId
function getAll(req, res, next) {
	db.find().then(function(values) {
		res.json({ data: values });
	});
}
//POST /consultant operationId
function save(req, res, next) {
		res.json({ success: db.save(req.body), description: "Movie added to the list!" });
}
//GET /consultant/{id} operationId
function getOne(req, res, next) {
		var id = req.swagger.params.id.value; //req.swagger contains the path parameters
		var movie = db.find(id);
		if (movie) {
		res.json(movie);
		} else {
		res.status(204).send();
		}
}
//PUT /consultant/{id} operationId
function update(req, res, next) {
		var id = req.swagger.params.id.value; //req.swagger contains the path parameters
		var movie = req.body;
		if (db.update(id, movie)) {
		res.json({ success: 1, description: "Movie updated!" });
		} else {
		res.status(204).send();
		}

}
//DELETE /consultant/{id} operationId
function delMovie(req, res, next) {
		var id = req.swagger.params.id.value; //req.swagger contains the path parameters
		if (db.remove(id)) {
		res.json({ success: 1, description: "Movie deleted!" });
		} else {
		res.status(204).send();
		}

}

//POST /consultant/earnings operationId
function getEarning(req, res, next) {
	var consultants = req.body.consultants;
	var monthstart = req.body.monthStart;
	var monthend = req.body.monthEnd;
	db.earnings(consultants, monthstart, monthend).then(function(response) {
		console.log(response);
		res.json({ data: response });
	});
	
}