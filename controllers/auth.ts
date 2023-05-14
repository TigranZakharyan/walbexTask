import { NextFunction, Response } from 'express'
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
    const token = 'Bearer ' + jwt.sign({ user_id: user.dataValues.id }, TOKEN_KEY as string);
    delete user.dataValues.password
    const response = {
      ...user.dataValues,
      token
    }
    res.send(response)
  } catch (err) {
    res.status(404).send("error")
  }
}

export const login = async(req: TypedRequestBody<LoginBody>, res: Response) => {
  try {
    const data = {...req.body}
    console.log(data)
    const isUserExists = (await User.findOne({ where: { email: data.email } }))?.dataValues
    if(isUserExists === null) {
      return res.status(404).send("User doesn't exist")
    }
    const isPassValid = bcrypt.compare(data.password, isUserExists.password)
    if(!isPassValid) {
      return res.status(404).send("Password is incorrect")
    }
    const token = 'Bearer ' + jwt.sign({ user_id: isUserExists.id }, TOKEN_KEY as string);
    delete isUserExists.password
    const response = {
      ...isUserExists,
      token
    }
    res.send(response)
  } catch (err) {
    res.status(404).send("error")
  }
}

export const authenticateJWT = async (req: TypedRequestBody, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (token) {
      const decoded = jwt.verify(token, TOKEN_KEY as string) as { user_id: number }
      if(decoded) { 
        req.user = (await User.findOne({ where: { id: decoded.user_id } }))?.dataValues
        return next();
      }
      res.sendStatus(401);
    } else {
      res.sendStatus(401);
  }
};