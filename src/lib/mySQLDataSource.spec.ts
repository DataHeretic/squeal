import { MySQLDataSource } from './mySQLDataSource';

describe('MySQL datasource', () => {
    let fixture: MySQLDataSource;
    
    beforeEach(() => {
        fixture = new MySQLDataSource('squeal', 'localhost', 3306, 'root', 'password');
    });

    it('should connect to a MySQL database', async() => {
        await fixture.connect();
    });

    it('should send a query command to the MySQL database', async() => {
        await fixture.connect();
        const result = await fixture.send('select 1');
        expect(result).toBeTruthy();
    });
});