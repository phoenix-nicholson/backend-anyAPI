const { Router } = require('express');
const { getAll } = require('../models/Onepiece');
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
    try {
      const allCharacters = await getAll();
      res.json(allCharacters);
    } catch (error) {
      error;
    }
  });
