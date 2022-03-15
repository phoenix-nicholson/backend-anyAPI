module.exports = class Character {
  id;
  name;
  crew;

  constructor(row) {
    row.id = '1';
    row.name = 'Monkey D. Luffy';
    row.crew = 'Straw Hats';
  }
};
