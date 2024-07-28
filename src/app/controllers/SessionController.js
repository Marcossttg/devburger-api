import * as Yup from 'yup'

import jwt from 'jsonwebtoken'

import authConfig from '../../config/auth'

import User from '../models/User'

// criando validação de email e senha com schema.isValid
class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const isValid = await schema.isValid(request.body)

    const userEmailOrPasswordIncorrect = () => {
      return response
        .status(400)
        .json({ error: 'Make sure your password or email are correct' })
    }

    if (!isValid) {
      return userEmailOrPasswordIncorrect()
    }

    const { email, password } = request.body

    const user = await User.findOne({
      where: { email },
    })
    if (!user) {
      return userEmailOrPasswordIncorrect()
    }

    const isSamePassword = await user.checkPassword(password)

    if (!isSamePassword) {
      return userEmailOrPasswordIncorrect()
    }

    return response.status(201).json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController()
