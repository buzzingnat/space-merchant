'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todos', [{
        title: 'Buy milk and eggs',
        complete: false,
        UserId: 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        title: 'Learn Ruby',
        complete: false,
        UserId: 3,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        title: 'Create an award winning game',
        complete: false,
        UserId: 3,
        createdAt : new Date(),
        updatedAt : new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
