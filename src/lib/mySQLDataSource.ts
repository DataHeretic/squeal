import { createConnection, MysqlError } from 'mysql';

class MySQLDataSource {

    private readonly database: string;
    private readonly host: string;
    private readonly port: number;
    private readonly user: string;
    private readonly password: string;

    constructor(database: string, host: string, port: number, user: string, password: string) {
        this.database = database;
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
    }

    public connect(onConnect: (errorMessage?: string) => void): void {
        const connection = createConnection({
            database : this.database,
            host: this.host,
            password: this.password,
            port: this.port,
            user: this.user     
        });

        connection.connect((mySqlError: MysqlError) => {
            onConnect(mySqlError ? mySqlError.message : undefined);
        });
    }

    public send(command: string):string {
        return command;
    }
}

export { MySQLDataSource };