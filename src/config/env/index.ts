import * as dotenv from 'dotenv';

dotenv.config();
const defaultPort: number = 3000;
const defaultRadix: number = 10;
const defaultTokenTime: number = 900;

interface IConfig {
  port: number;
  database: {
    MONGODB_URI: string;
    MONGODB_DB_MAIN: string;
  };
  secret: string;
  tokenTime: number;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
  port: parseInt(process.env.PORT, defaultRadix) || defaultPort,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db'
  },
  secret: process.env.SECRET || '@QEGTUI',
  tokenTime: parseInt(process.env.TOKEN_TIME, defaultRadix) || defaultTokenTime
};

const production: IConfig = {
  port: parseInt(process.env.PORT, defaultRadix) || defaultPort,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://production_uri/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db'
  },
  secret: process.env.SECRET || '@QEGTUI',
  tokenTime: parseInt(process.env.TOKEN_TIME, defaultRadix) || defaultTokenTime
};

const test: IConfig = {
  port: parseInt(process.env.PORT, defaultRadix) || defaultPort,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    MONGODB_DB_MAIN: 'test_users_db'
  },
  secret: process.env.SECRET || '@QEGTUI',
  tokenTime: parseInt(process.env.TOKEN_TIME, defaultRadix) || defaultTokenTime
};

const config: {
  [name: string]: IConfig;
} = {
  test,
  development,
  production
};
export const Config: IConfig = config[NODE_ENV];
