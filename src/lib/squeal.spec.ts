import { instance, mock, verify, when } from 'ts-mockito';
import { DataSource } from './datasource';
import { Squeal } from './squeal';
import { TestCase } from './testCase';

describe('squeal', () => {
    let fixture: Squeal;
    let testCase: TestCase;
    let dataSource: DataSource;

    beforeEach(() => {
        dataSource = mock(DataSource);
        testCase = {
            given: "insert into pets (name, status) values ('pet1', 'pending');",
            then: [{name: "pet1", status: "pending"}],
            when: "select * from pets",
        };
        fixture = new Squeal(instance(dataSource));
    });

    it('should fail when the test case \'then\' value does not equal the result of the \'when\' clause', async() => {
        when(dataSource.send(testCase.when)).thenReturn([{name: "pet1", status: "notPending"}]);
        try {
            await fixture.run(testCase);
            fail('should have thrown an exception denoting failure');
        } catch(e) {
            verifyDataSourceWasSentTestCaseWhenAndGiven();
        }
    });

    it('should succeed when the test case \'then\' value equals the result of the \'when\' clause', async() => {
        when(dataSource.send(testCase.when)).thenReturn([{name: "pet1", status: "pending"}]);
        await fixture.run(testCase);
        verifyDataSourceWasSentTestCaseWhenAndGiven();
    });

    function verifyDataSourceWasSentTestCaseWhenAndGiven(): void {
        verify(dataSource.send(testCase.when)).called();
        verify(dataSource.send(testCase.given)).called();
    }
});