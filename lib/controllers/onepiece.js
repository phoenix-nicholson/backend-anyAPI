const { Router } = require('express');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const { rows } = await pool.query(
    `INSERT INTO onepiece(name, crew) VALUES ($1, $2) RETURNING *;`,
    [req.body.name, req.body.crew]
  );
  const character = { id: '1', name: 'Monkey D. Luffy', crew: 'Straw Hats' };
  res.send(character);
});
