import mysql from 'mysql2';
export class Connection {
    constructor(host, database, user, password) {
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        try {
            this.connection = mysql.createPool({
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.database,
            });
        }
        catch (error) {
            console.log('algo sucedio');
        }
    }
}
