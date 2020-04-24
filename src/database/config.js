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
    dialect: 'postgres',
    operatorsAliases: 0
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: 'postgres',
    operatorsAliases: 0
  }
};
// development: {
//   use_env_variable: 'DEV_DATABASE_URL',
//   dialect: 'postgres',
//   operatorsAliases: 0
// },
