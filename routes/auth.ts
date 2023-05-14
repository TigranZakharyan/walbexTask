import { Router } from 'express'
import { login, registration } from '../controllers/auth'

const authRouter = Router()

authRouter.post('/reg', registration as any)
authRouter.post('/login', login as any)

export { authRouter }
