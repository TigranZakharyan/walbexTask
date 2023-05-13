import { Sequelize } from 'sequelize'
import { DB_NAME, PG_PASS, PG_USER } from './config';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  username: PG_USER,
  password: PG_PASS,
  database: DB_NAME
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}