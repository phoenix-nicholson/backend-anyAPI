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
  static async updateCharacter(id, attributes) {
    const currentCharacter = await Character.getById(id);

    const editedCharacter = { ...currentCharacter, ...attributes };
    const { name, crew } = editedCharacter;

    // const name = editedCharacter.name ?? currentCharacter.name;
    // const crew = editedCharacter.crew ?? currentCharacter.crew;

    const { rows } = await pool.query(
      'UPDATE onepiece SET name=$2, crew=$3 WHERE id=$1 RETURNING *;',
      [id, name, crew]
    );
    return new Character(rows[0]);
  }
};
