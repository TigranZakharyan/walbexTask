import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT
export const PG_USER = process.env.PG_USER
export const PG_PASS = process.env.PG_PASS
export const DB_NAME = process.env.DB_NAME
export const TOKEN_KEY = process.env.TOKEN_KEY
export const HOST = process.env.HOST