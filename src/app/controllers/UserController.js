import * as Yup from 'yup'
import { v4 } from 'uuid'
import User from '../models/User'
/*
 Padrão MVC nos controles tem este padrão
 store => Cadastra ou Adiciona
 index =>  Listar vários
 show => Listar apenas UM
 update => Atualizar
 delete => Deletar
 */

class UserController {

  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(3),
      admin: Yup.boolean(),
    })

    try {  // valida schema error do validatesync
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, email, password, admin } = request.body

    // validação do email com findOne
    const userExists = await User.findOne({
      where: { email },
    })

    // validar se usuário existe
    if (userExists) {
      return response.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    })

    return response.status(201).json({
      id: user.id,
      name,
      email,
      admin,
    })
  }
}

export default new UserController()
