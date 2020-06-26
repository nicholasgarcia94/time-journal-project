const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
});

const getActivites = (request, response) => {
    pool.query('SELECT * FROM activities ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        return response.status(200).json(results.rows);
    })
}

const addActivity = (request, response) => {
    const {name, duration} = request.body;
    pool.query(
        'INSERT INTO activities (name, duration) VALUES ($1, $2)',
        [name, duration],
        (error, results) => {
            if (error) throw error;
            response.status(201).send(`Activity added with name: ${name} and duration: ${duration} minutes.`);
        }
        )
}

const deleteActivity = (request, response) => {
    const id = parseInt(request.params.id, 10);
    pool.query('DELETE FROM activities WHERE id = $1', [id], (error, results) => {
        if (error) throw error;
        response.status(200).send(`User deleted with ID: ${id}`);
    })
}


module.exports = {
    getActivites,
    addActivity,
    deleteActivity,
}
