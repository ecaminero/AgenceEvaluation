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
				const query = `SELECT SUM(fa.valor - (fa.valor*(fa.total_imp_inc/100))) AS ganancia, us.no_usuario
						FROM cao_fatura AS fa
						RIGHT OUTER JOIN cao_os AS os ON fa.co_os = os.co_os
						INNER JOIN cao_usuario AS us ON us.co_usuario = os.co_usuario
						WHERE os.co_usuario in("`+users.join('" ,"')+`")
						GROUP BY os.co_usuario;`;
				connection.query(query, function (err, rows) {
					if (err) { return reject(err); }
					resolve(rows);
				});
			});
		},
		earnings(users, monthstart, monthend) {
			return new Promise(function (resolve, reject) {
				const query = `SELECT SUM(fa.valor - (fa.valor*(fa.total_imp_inc/100))) AS receita_liquida, os.co_usuario, 
				us.no_usuario, us.no_usuario,
				MONTH(fa.data_emissao) month_id, sa.brut_salario,
				SUM(fa.total_imp_inc) * SUM(fa.comissao_cn) AS comision
				FROM cao_fatura AS fa
				RIGHT OUTER JOIN cao_os AS os ON fa.co_os = os.co_os
				RIGHT OUTER JOIN cao_salario AS sa ON sa.co_usuario = os.co_usuario
				INNER JOIN cao_usuario AS us ON us.co_usuario = os.co_usuario
				WHERE os.co_usuario in ("`+users.join('" ,"')+`")
				and (fa.data_emissao BETWEEN "${monthstart}" AND "${monthend}")
				GROUP BY month(fa.data_emissao), sa.brut_salario, os.co_usuario, us.no_usuario;`;
				connection.query(query, function (err, rows) {
					if (err) { return reject(err); }
					resolve(rows);
				});
			});
			
		},
		performanceComercial(users, monthstart, monthend) {
			return new Promise(function (resolve, reject) {
				console.log(users);
				const query = `SELECT SUM(fa.valor - (fa.valor*(fa.total_imp_inc/100))) as ganancia, os.co_usuario, us.no_usuario ,
					(SELECT SUM(brut_salario)/${users.length} FROM cao_salario WHERE co_usuario in ("`+users.join('" ,"')+`")) as media,
					MONTH(fa.data_emissao) month_id
					FROM agence.cao_fatura AS fa
					RIGHT OUTER JOIN cao_os AS os ON fa.co_os = os.co_os
					INNER JOIN cao_usuario AS us ON us.co_usuario = os.co_usuario
					WHERE os.co_usuario in ("`+users.join('" ,"')+`")
					AND (fa.data_emissao BETWEEN "${monthstart}" AND "${monthend}")
					GROUP BY month(fa.data_emissao), os.co_usuario
					ORDER BY os.co_usuario;`;
				connection.query(query, function (err, rows) {
					if (err) { return reject(err); }
					resolve(rows);
				});
			});
		},
	}
}; 