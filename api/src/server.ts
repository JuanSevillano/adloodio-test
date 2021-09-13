import { App } from "./app";
import MySQLDatabaseService from "./frameworks/mySQLService";
import SocketIoService from "./frameworks/socketIoService";
import { Server } from 'http';

const port = process.env.NODE_PORT || 4848;

const dbHost: string = process.env.MYSQL_HOST || '127.0.0.1';
const dbPort = process.env.MYSQL_PORT || 3306;

const dbPassword: string = process.env.MYSQL_ROOT_PASSWORD || 'L3148701433caliVLC';
const dbUserPassword: string = process.env.MYSQL_PASSWORD || 'root';
const dbUser: string = process.env.MYSQL_USER || 'root';
const dbId: string = process.env.MYSQL_DATABASE || 'adfoodio';



export const run = () => {


  const mysql: MySQLDatabaseService = new MySQLDatabaseService(dbId, dbUser, dbPassword, dbHost);
  const app: App = new App(mysql, port as number);



}

if (process.env.NODE_ENV !== 'testing') {
  run();
}
