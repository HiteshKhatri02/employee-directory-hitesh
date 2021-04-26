const { Client } = require('pg');
const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
  },
  query_timeout: 2000, // number of milliseconds before a query call will timeout, default is no timeout
  connectionTimeoutMillis: 1000,
});

const createEmployee = (request, response) => {
	client.connect();
	const { name, employee_Id } = request.body;
	client.query('INSERT INTO emp (name, employee_Id) VALUES ($1, $2)', [ name, employee_Id ], (error, result) => {
		if (error) {
			console.log(JSON.stringify(error));
			throw error;
		}
		response
			.status(201)
			.send(
				'New employee has been added into the database with ID = ' +
					request.body.employee_Id +
					' and Name = ' +
					request.body.name
			);
	});
	client.end();
};

const viewEmployee = (request, response) => {
	const { employee_Id } = request.body;
	const query = {
		text: 'SELECT employee_id, name FROM emp WHERE employee_id = $1',
		values: [ employee_Id ]
	};
	client.connect();
	client.query(query, (error, result) => {
		if (error) {
			console.log(JSON.stringify(error));
			throw error;
		}
		if (result && result.rows[0]) {
			response
				.status(201)
				.send(
					'Find resource details = ' +
						result.rows[0].employee_id +
						' and Name = ' +
						result.rows[0].name
				);
		} else if (result) {
			response.status(400).send('Record does not exist.');
		}
	});
	client.end();
};

const deleteEmployee = (request, response) => {
	const { employee_Id } = request.body;
	const query = {
		text: 'DELETE FROM emp WHERE employee_Id = $1',
		values: [ employee_Id ]
	};
	client.connect();
	client.query(query, (error, result) => {
		if (error) {
			console.log(JSON.stringify(error));
			throw error;
		}
		console.log(JSON.stringify(result));
		response.status(201).send('Record has been deleted.');
	});
	client.end();
};

// const { Pool } = require('pg')
// const pool = new Pool({
//   user: 'hiteshkhatri',
//   host: 'localhost',
//   database: 'emp2',
//   password: 'H8#9IjhKAB&#q1&*w1',
//   port: 5432,
//   idleTimeoutMillis: 2000,
//   connectionTimeoutMillis: 2000,
// });

// const createEmployee = (request, response) => {
//   console.log('I reched here.... ');
//     const { name, employee_Id } = request.body
//     pool.query('INSERT INTO emp (name, employee_Id) VALUES ($1, $2)', [name, employee_Id], (error, result) => {
//       if (error) {
//         console.log(JSON.stringify(error));
//         throw error
//       }
//       response.status(201).send("New employee has been added into the database with ID = "+request.body.employee_Id+ " and Name = "+request.body.name);
//     })
//   }

// const viewEmployee = (request, response) => {
//   console.log('I reched here too ');
//     const { employee_Id } = request.body;
//     const query = {
//       text: 'SELECT employee_id, name FROM emp WHERE employee_id = $1',
//       values: [employee_Id],
//     }

//     pool.query(query, (error, result) => {
//       if (error) {
//         console.log(JSON.stringify(error));
//         throw error
//       }
//       if(result && result.rows[0]){
//         response.status(201).send("New employee has been added into the database with ID = "+result.rows[0].employee_id+ " and Name = "+result.rows[0].name);

//       }else if(result){
//         response.status(400).send('Record does not exist.');
//       }
//        })
//   }

//   const deleteEmployee = (request, response) => {
//       const { employee_Id } = request.body;
//       const query = {
//         text: 'DELETE FROM emp WHERE employee_Id = $1',
//         values: [employee_Id],
//       }

//       pool.query(query, (error, result) => {
//         if (error) {
//           console.log(JSON.stringify(error));
//           throw error
//         }
//         console.log(JSON.stringify(result));
//         response.status(201).send("Record has been deleted.");
//       })
//     }

module.exports = {
	createEmployee,
	viewEmployee,
	deleteEmployee
};
