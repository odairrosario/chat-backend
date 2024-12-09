/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataSource } from 'typeorm';
import {
  DATABASE_TYPE,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  validateDatabaseConfig,
} from './../../config/database.config';

validateDatabaseConfig();

export const AppDataSource = new DataSource({
  type: DATABASE_TYPE as any,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  database: DATABASE_NAME,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  synchronize: true,
  logging: true,
  entities: ['dist/modules/**/entities/*.entity.js'],
});

export const initializeDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
      .then(() => console.log('Database connected'))
      .catch((error) => console.error('Error connecting to database:', error));
  }
};
