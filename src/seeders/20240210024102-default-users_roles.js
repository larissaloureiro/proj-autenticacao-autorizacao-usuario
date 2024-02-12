'use strict';
const database = require('../models')
const { Op } = require('sequelize')
 
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up (queryInterface, Sequelize) {
    const user1 = await database.users.findOne();
    const role1 = await database.roles.findOne();

    const user2 = await database.users.findOne({
      where: {
        id: {
          [Op.ne]: user1.id
        }
      }
    });
    const role2 = await database.roles.findOne({
      where: {
        id: {
          [Op.ne]: role1.id
        }
      }
    });

    await queryInterface.bulkInsert('users_roles', [
      {
        user_id: user1.id,
        role_id: role1.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: user2.id,
        role_id: role2.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users_roles', null, {});
  }
}