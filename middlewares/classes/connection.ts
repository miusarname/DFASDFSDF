import mysql from 'mysql2'

export class Connection {
  host: string;
  database: string;
  user: string;
  password: string;
  connection : any;

  constructor(host: string, database: any, user: string, password: string) {
    this.host = host;
    this.database = database;
    this.user = user;
    this.password = password;

    try {
      this.connection =mysql.createPool({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database,
      });
    } catch (error) {
      console.log('algo sucedio')
    }
  }
   
  
}
