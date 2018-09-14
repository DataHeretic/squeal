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
        return new Promise<void>((resolve, reject) => {
            this.connection.connect((mySqlError: MysqlError) => {
                mySqlError ? reject(mySqlError.message) : resolve();
            });
        });
    }

    public send(command: string): Promise<ReadonlyArray<any>> {
        const rows: any = [];
        return new Promise<ReadonlyArray<any>>((resolve, reject) => {
            this.connection.query(command).on('error', (mySqlError: MysqlError) => { 
                reject(mySqlError.message);
            }).on('result', (row: any) => {
                rows.push({...row});
            }).on('end', () => {
                resolve(rows);
            })
        });
    }
}

export { MySQLDataSource };