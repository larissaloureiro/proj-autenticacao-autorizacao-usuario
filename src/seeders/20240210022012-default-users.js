'use strict';
const { hash } = require('bcryptjs')
const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: uuid.v4(),
        name: 'Ana',
        email: 'ana@email.com',
        password: await hash('123456', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'Bia',
        email: 'bia@email.com',
        password: await hash('123456', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid.v4(),
        name: 'Carla',
        email: 'carla@email.com',
        password: await hash('123456', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};

