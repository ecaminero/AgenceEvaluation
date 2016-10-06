'use strict;'
//Include crypto to generate the movie id
var crypto = require('crypto');
var connection = require('./connection');
const _ = require('lodash');

module.exports = function () {
	return {
		movieList: [],

		save(movie) {
			movie.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
			return 1;
		},
		/*
		 * Find all users in cao_usuario 
		 */
		find() {
			return new Promise(function (resolve, reject) {
				const query = `SELECT * FROM cao_usuario as cu 
					INNER JOIN permissao_sistema AS ps ON ps.co_usuario = cu.co_usuario 
					WHERE ps.co_sistema=1 and ps.in_ativo = 'S' and ps.co_tipo_usuario in (0,1,2);`;

				connection.query(query, function (err, rows) {
					if (err) { return reject(err); }
					resolve(rows);
				});
			});
		},
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
		},
		earnings(users, monthstart, monthend) {
			return new Promise(function (resolve, reject) {
				const query = `SELECT SUM(ca.valor - (ca.valor*(ca.total_imp_inc/100))) as receita_liquida, os.co_usuario,
						month(ca.data_emissao) as month_id, sa.brut_salario
						FROM cao_fatura as ca
						RIGHT OUTER JOIN cao_os AS os ON ca.co_os = os.co_os 
						RIGHT OUTER JOIN cao_salario AS sa ON sa.co_usuario = os.co_usuario
						WHERE os.co_usuario in ("`+users.join('" ,"')+`")
						and (ca.data_emissao BETWEEN "${monthstart}" AND "${monthend}")
						GROUP BY month(ca.data_emissao), sa.brut_salario, os.co_usuario;`;
				connection.query(query, function (err, rows) {
					if (err) { return reject(err); }
					resolve(rows);
				});
			});
		}
	}
}; 


