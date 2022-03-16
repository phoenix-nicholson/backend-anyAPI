const { Router } = require('express');
const Character = require('../models/Onepiece');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const character = await Character.insert({
      name: req.body.name,
      crew: req.body.crew,
    });
    res.json(character);
  })
  .get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM onepiece;');
    const allCharacters = rows.map((row) => new Character(row));

    res.json(allCharacters);
  });
// const { rows } = await pool.query(
//   `INSERT INTO onepiece(name, crew) VALUES ($1, $2) RETURNING *;`,
//   [req.body.name, req.body.crew]
// );
