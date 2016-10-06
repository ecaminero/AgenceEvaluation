'use strict;'
//Include crypto to generate the movie id
var crypto = require('crypto');
var connection = require('./connection');


module.exports = function () {
	return {
		movieList: [],
		/*
		 * Save the movie inside the "db".
		 */
		save(movie) {
			movie.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
			return 1;
		},
		/*
		 * Retrieve a movie with a given id or return all the movies if the id is undefined.
		 */
		find() {
				 return new Promise(function (resolve, reject) {
					const query = "SELECT * FROM cao_usuario as cu INNER JOIN permissao_sistema AS ps ON ps.co_usuario = cu.co_usuario WHERE ps.co_sistema=1 and ps.in_ativo = 'S' and ps.co_tipo_usuario in (0,1,2);";
					connection.query(query, function (err, rows) {
						if (err) { return reject(err); }
						resolve(rows);
					});
				});
		},
		/*
		 * Delete a movie with the given id.
		 */
		remove(id) {
			var found = 0;
			this.movieList = this.movieList.filter(element => {
				if (element.id === id) {
					found = 1;
				} else {
					return element.id !== id;
				}
			});
			return found;
		},
		/*
		 * Update a movie with the given id
		 */
		update(id, movie) {
			var movieIndex = this.movieList.findIndex(element => {
				return element.id === id;
			});
			if (movieIndex !== -1) {
				this.movieList[movieIndex].title = movie.title;
				this.movieList[movieIndex].year = movie.year;
				return 1;
			} else {
				return 0;
			}
		}
	}
};  