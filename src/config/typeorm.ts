import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  // Al crear migraciones, crearlas en src/migrations
  // Primero hacer un npm run build para que se transfile la migración y despues probarla
  autoLoadEntities: true,
  logging: false,
  synchronize: true,
  dropSchema: true,
};

export const typeOrmConfig = registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);