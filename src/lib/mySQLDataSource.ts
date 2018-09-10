import { Connection, createConnection, MysqlError } from 'mysql';

class MySQLDataSource {

    private readonly connection: Connection;

    constructor(database: string, host: string, port: number, user: string, password: string) {
        this.connection = createConnection({
            'database' : database,
            'host': host,
            'password': password,
            'port': port,
            'user': user     
        });
    }

    public connect(): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            this.connection.connect((mySqlError: MysqlError) => {
                mySqlError ? reject(mySqlError.message) : resolve();
            });
        });
        return promise;
    }

    public send(command: string, onResult: (row?: any, errorMessage?: string) => void): void {
        this.connection.query(command).on('error', (mySqlError: MysqlError) => { 
            onResult(undefined, mySqlError.message);
        }).on('result', (row: any) => {
            onResult(row, undefined);
        })
    }
}

export { MySQLDataSource };