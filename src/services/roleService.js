const database = require('../models')
const uuid = require('uuid')

class RoleService {
  async createRole(dto){
    const role = await database.roles.findOne({
      where: {
        name: dto.name
      }
    })
    if (role){
      throw new Error('Role já cadastrada.')
    }
    try {
      const newRole = await database.roles.create({
        id: uuid.v4(),
        name: dto.name
      })
      return newRole
    } catch (error) {
      throw new Error('Erro ao cadastrar role.')
    }
  }

  async findAllRoles() {
    const roles = await database.roles.findAll()
    return roles;
  }

  async findRoleById(id) {
    const role = await database.roles.findOne({
      where: {
        id: id
      }
    });
    if (!role) {
      throw new Error('Role informada não cadastrada!')
    }
    return role;
  }

  async updateRoleById(dto) {
    const role = await this.findRoleById(dto.id);
    try {
      role.name = dto.name
      role.descricao = dto.descricao
      await role.save()
      return await role.reload()
    } catch (error) {
      throw new Error('Erro ao editar role.')
    }
  }

  async deleteRoleById(id) {
    const role = await this.findRoleById(id)
    try {
      await database.roles.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new Error('Erro ao tentar deletar o role.')
    }
  }

}

module.exports = RoleService