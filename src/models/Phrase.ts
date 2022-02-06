import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../intances/mysql';

export interface PhraseInstance extends Model {
   id: number;
   author: string;
   txt: string;
}

export const Phrase = sequelize.define<PhraseInstance>(
   'Phrase',
   {
      id: {
         primaryKey: true,
         type: DataTypes.INTEGER,
         autoIncrement: true,
      },
      author: {
         type: DataTypes.STRING,
      },
      txt: {
         type: DataTypes.STRING,
      },
   },
   {
      tableName: 'phrases',
      timestamps: false,
   }
);
