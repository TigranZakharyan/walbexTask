import { Router } from 'express'
import { create, deleteOne, get, update } from '../controllers/post'
import { authenticateJWT } from '../controllers/auth'

const postRouter = Router()

postRouter.post('/', authenticateJWT as any, create as any)
postRouter.get('/', authenticateJWT as any, get as any)
postRouter.delete('/', authenticateJWT as any, deleteOne as any)
postRouter.post('/update', authenticateJWT as any, update as any)

export { postRouter }
