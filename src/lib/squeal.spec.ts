import { instance, mock, verify, when } from 'ts-mockito';
import { DataSource } from './datasource';
import { Events, Squeal } from './squeal';
import { TestCase } from './testCase';

describe('squeal', () => {
    let fixture: Squeal;
    let testCase: TestCase;
    let events: Events;
    let dataSource: DataSource;

    beforeEach(() => {
        dataSource = mock(DataSource);
        testCase = {
            given: "insert into pets (name, status) values ('pet1', 'pending');",
            then: "pet1|pending",
            when: "select * from pets",
        };
        fixture = new Squeal(instance(dataSource));
        events = new Events();
    });

    it('should run a test case against a datasource', () => {
        fixture.run(testCase, events);

        verify(dataSource.send(testCase.given)).called();
        verify(dataSource.send(testCase.when)).called();
    });

    it('should fail when the test case \'then\' value does not equal the result of the \'when\' clause', () => {
        const onFailure = jasmine.createSpy('onFailure');
        const onSuccess = jasmine.createSpy('onSuccess');

        when(dataSource.send(testCase.when)).thenReturn('not|the|same|as|then');
        
        fixture.run(testCase, {onFailure, onSuccess});
        
        expect(onFailure).toHaveBeenCalled();
        expect(onSuccess).not.toHaveBeenCalled();
    });

    it('should succeed when the test case \'then\' value equals the result of the \'when\' clause', () => {
        const onFailure = jasmine.createSpy('onFailure');
        const onSuccess = jasmine.createSpy('onSuccess');
        
        when(dataSource.send(testCase.when)).thenReturn(testCase.then);
        
        fixture.run(testCase, {onSuccess, onFailure});
        
        expect(onSuccess).toHaveBeenCalled();
        expect(onFailure).not.toHaveBeenCalled();
    });

});