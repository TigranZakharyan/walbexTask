import { Router } from 'express'
import { create, deleteOne, get, update } from '../controllers/post'
import { authenticateJWT } from '../controllers/auth'

const postRouter = Router()

postRouter.post('/', authenticateJWT as any, create)
postRouter.get('/', authenticateJWT as any, get)
postRouter.delete('/', authenticateJWT as any, deleteOne)
postRouter.post('/update', authenticateJWT as any, update)

export { postRouter }
