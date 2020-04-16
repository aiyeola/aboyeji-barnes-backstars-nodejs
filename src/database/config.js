import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    operatorsAliases: 0
  },
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DEV,
    host: '127.0.0.1',
    logging: false,
    dialect: 'postgres',
    operatorsAliases: 0
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_TEST,
    host: '127.0.0.1',
    logging: false,
    dialect: 'postgres',
    operatorsAliases: 0
  }
};
