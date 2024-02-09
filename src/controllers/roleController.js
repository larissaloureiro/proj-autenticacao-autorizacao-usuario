const RoleService = require('../services/roleService')

const roleService = new RoleService()

class RoleController {
  static async createRole(req,res){
    const { name } = req.body
    try {
      const role = await roleService.createRole({ name })
      res.status(201).send(role)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }

  static async findAllRoles(req, res) {
    const roles = await roleService.findAllRoles()
    res.status(200).json(roles)
  }

  static async findRoleById(req, res) {
    try {
        const { id } = req.params
        const role = await roleService.findRoleById(id)
        res.status(200).json(role) 
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
  }

  static async updateRoleById(req, res) {
    const { id } = req.params
    const { name } = req.body
    try {
      const role = await roleService.updateRoleById({ id, name })
      res.status(200).json(role)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }

  static async deleteRoleById(req, res) {
    const { id } = req.params
    try {
        await roleService.deleteRoleById(id)
        res.status(200).send({ message: 'Role deletada com sucesso!' })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
  }


}

module.exports = RoleController