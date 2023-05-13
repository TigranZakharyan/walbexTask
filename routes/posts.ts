import { Router } from 'express'
import { create } from '../controllers/posts'

const postsRouter = Router()

postsRouter.post('/', create)

export { postsRouter }
