'use strict';
const database = require('../models')

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up (queryInterface, Sequelize) {
    const user1 = await database.users.findOne();
    const role1 = await database.roles.findOne();
    await queryInterface.bulkInsert('users_roles', [
      {
        user_id: user1.id,
        role_id: role1.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users_roles', null, {});
  }
}