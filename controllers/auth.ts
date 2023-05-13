import { Response } from 'express'
import { User } from '../models'
import { TypedRequestBody } from '../types/request'
import { LoginBody, RegistrationBody } from './types/auth'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_KEY } from '../core/config'

export const registration = async(req: TypedRequestBody<RegistrationBody>, res: Response) => {
  try {
    const data = {...req.body}
    console.log(data)
    const isUserExists = await User.findOne({ where: { email: data.email } })
    if(isUserExists !== null) {
      return res.status(404).send("User exists")
    }
    data.password = await bcrypt.hash(data.password, 5)
    const user = await User.create({ ...data })
    const token = jwt.sign({ user_id: user.dataValues.id }, TOKEN_KEY as string);
    delete user.dataValues.password
    const response = {
      ...user.dataValues,
      token
    }
    res.send(response)
  } catch (err) {
    res.status(404)
  }
}

export const login = async(req: TypedRequestBody<LoginBody>, res: Response) => {
  try {
    const data = {...req.body}
    console.log(data)
    const isUserExists = await User.findOne({ where: { email: data.email } })
    if(isUserExists === null) {
      return res.status(404).send("User doesn't exist")
    }
    const isPassValid = bcrypt.compare(data.password, isUserExists.dataValues.password)
    if(!isPassValid) {
      return res.status(404).send("Password is incorrect")
    }
    const token = jwt.sign({ user_id: isUserExists.dataValues.id }, TOKEN_KEY as string);
    delete isUserExists.dataValues.password
    const response = {
      ...isUserExists.dataValues,
      token
    }
    res.send(response)
  } catch (err) {
    res.status(404)
  }
}
