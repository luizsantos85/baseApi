import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../intances/mysql';

export interface UserInstance extends Model {
   id: number;
   email: string;
   password: string;
}

export const User = sequelize.define<UserInstance>(
   'User',
   {
      id: {
         primaryKey: true,
         type: DataTypes.INTEGER,
         autoIncrement: true,
      },
      email: {
         type: DataTypes.STRING,
         unique: true,
      },
      password: {
         type: DataTypes.STRING,
      },
   },
   {
      tableName: 'users',
      timestamps: false,
   }
);
