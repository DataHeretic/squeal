import { MySQLDataSource } from './mySQLDataSource';

describe('MySQL datasource', () => {
    let fixture: MySQLDataSource;
    
    beforeEach(() => {
        fixture = new MySQLDataSource('squeal', 'localhost', 3306, 'root', 'password');
    });

    it('should connect to a MySQL database', (done) => {
        fixture.connect((error?: string) => {
            if(error) {
                fail('error should not have occurred: ' + error);
                done();
            }
            done();
        });
    });
});