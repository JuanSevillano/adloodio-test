import { Interface } from "readline";
import { App } from "./app";
import MySQLDatabaseService from "./frameworks/mySQLService";

const port = process.env.NODE_PORT || 4848;

const dbHost = process.env.MYSQL_HOST || '127.0.0.1';
const dbPort = process.env.MYSQL_PORT || 3306;

const dbPassword = process.env.MYSQL_ROOT_PASSWORD || 'L3148701433caliVLC';
const dbUserPassword = process.env.MYSQL_PASSWORD || 'root';
const dbUser = process.env.MYSQL_USER || 'root';
const dbId = process.env.MYSQL_DATABASE || 'adfoodio';

export const run = () => {

  const app: App = new App();
  app.listen(port as number);

  const foodSQLService: MySQLDatabaseService = new MySQLDatabaseService(dbId, dbUser, dbPassword, dbHost);



}

if (process.env.NODE_ENV !== 'testing') {
  run();
}
