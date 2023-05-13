import { DataTypes } from 'sequelize';
import { sequelize } from '../core/db';

export const Post = sequelize.define('post', {
  text: {
    type: DataTypes.STRING
  },
  media: {
    type: DataTypes.BLOB('long')
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

Post.sync();