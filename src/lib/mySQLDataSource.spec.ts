import { MySQLDataSource } from './mySQLDataSource';

describe('MySQL datasource', () => {
    let fixture: MySQLDataSource;
    
    beforeEach(() => {
        fixture = new MySQLDataSource('squeal', 'localhost', 3306, 'root', 'password');
    });

    it('should connect to a MySQL database', (done) => {
        fixture.connect().then(
            () => done(),
            (error) => { 
                fail('error should not have occurred: ' + error)
                done();
            }
        );
    });

    it('should send a query command to the MySQL database', (done) => {
        fixture.connect().then(
            () => {
                fixture.send('select 1', (row: any, sendErrorMessage?: string) => {
                    expect(row).toBeTruthy();
                    expect(sendErrorMessage).toBeUndefined();
                    done();
                });
            },
            (error) => { 
                fail('error should not have occurred: ' + error)
                done();
            }
        );
    });
});