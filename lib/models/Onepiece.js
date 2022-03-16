const pool = require('../utils/pool');

module.exports = class Character {
  id;
  name;
  crew;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.crew = row.crew;
  }

  static async insert({ name, crew }) {
    const { rows } = await pool.query(
      'INSERT INTO onepiece(name, crew) VALUES ($1, $2) RETURNING *;',
      [name, crew]
    );
    const character = new Character(rows[0]);
    return character;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM onepiece;');
    return rows.map((row) => new Character(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM onepiece WHERE id=$1`, [
      id,
    ]);
    console.log('rows', rows[0]);
    return new Character(rows[0]);
  }
};
