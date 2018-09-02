import { instance, mock, verify } from 'ts-mockito';
import { DataSource } from './datasource';
import { Squeal } from './squeal';
import { TestCase } from './testCase';

describe('squeal api', () => {
    it('should run a test case against a datasource', () => {
        const testCase:TestCase = {
            given: "insert into pets (name, status) values ('pet1', 'pending');",
            then: "pet1|pending",
            when: "select * from pets",
        };

        const dataSource:DataSource = mock(DataSource);
        
        const squeal = new Squeal(instance(dataSource));
        squeal.run(testCase);

        verify(dataSource.send(testCase.given)).called();
        verify(dataSource.send(testCase.then)).called();
        verify(dataSource.send(testCase.when)).called();
    });
});