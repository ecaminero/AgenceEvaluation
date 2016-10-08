'use strict;'
//Include crypto to generate the movie id
var crypto = require('crypto');
var connection = require('./connection');
const _ = require('lodash');

module.exports = function () {
	return {
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
		averageFixedCost(users) {
			return new Promise(function (resolve, reject) {
				const query = `SELECT SUM(brut_salario)/${users.length} AS cost
					FROM agence.cao_salario
					WHERE co_usuario in ("`+users.join('" ,"')+`");`;
				connection.query(query, function (err, rows) {
					if (err) { console.log(err); return reject(err); }
					resolve(rows[0]);
				});
			});
		},
		earnings(users, monthstart, monthend) {
			return new Promise(function (resolve, reject) {
				const query = `SELECT SUM(fa.valor - (fa.valor*(fa.total_imp_inc/100))) AS receita_liquida, os.co_usuario,
				MONTH(fa.data_emissao) month_id, sa.brut_salario,
				SUM(fa.total_imp_inc) * SUM(fa.comissao_cn) AS comision
				FROM cao_fatura AS fa
				RIGHT OUTER JOIN cao_os AS os ON fa.co_os = os.co_os
				RIGHT OUTER JOIN cao_salario AS sa ON sa.co_usuario = os.co_usuario
				WHERE os.co_usuario in ("`+users.join('" ,"')+`")
				and (fa.data_emissao BETWEEN "${monthstart}" AND "${monthend}")
				GROUP BY month(fa.data_emissao), sa.brut_salario, os.co_usuario;`;

				connection.query(query, function (err, rows) {
					if (err) { return reject(err); }
					resolve(rows);
				});
			});
		}
	}
}; 