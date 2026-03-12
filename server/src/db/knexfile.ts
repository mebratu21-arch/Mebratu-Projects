import type { Knex } from 'knex';
import { config } from '../config';

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      connectionString: config.database.url,
      ssl: config.database.url.includes('neon.tech') ? { rejectUnauthorized: false } : false,
    },
    migrations: {
      directory: '../../../database/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: '../../../database/seeds',
      extension: 'ts',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  test: {
    client: 'pg',
    connection: config.database.url,
    migrations: {
      directory: '../../../database/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: '../../../database/seeds',
      extension: 'ts',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: config.database.url,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: '../../../database/migrations',
      extension: 'ts',
    },
    pool: {
      min: 2,
      max: 20,
    },
  },
};

export default knexConfig;
module.exports = knexConfig;
