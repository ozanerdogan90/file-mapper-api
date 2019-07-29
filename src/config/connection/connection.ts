import * as mongoose from 'mongoose';
import { Config } from '../../config/env';

interface IConnectOptions {
  autoReconnect: boolean;
  reconnectTries: number; // Never stop trying to reconnect
  reconnectInterval: number;
  loggerLevel?: string;
  useNewUrlParser?: boolean;
}

const connectOptions: IConnectOptions = {
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true
};
const MONGO_URI: string = `${Config.database.MONGODB_URI}${Config.database.MONGODB_DB_MAIN}`;

export const connectDb = () => {
  return mongoose.connect(MONGO_URI, connectOptions);
};
