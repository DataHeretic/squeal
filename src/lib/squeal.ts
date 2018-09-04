import { DataSource } from './datasource';
import { Events } from './events';
import { TestCase } from './testCase';

class Squeal {
    private readonly dataSource: DataSource;
    
    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    public run(testCase: TestCase, events: Events): void {
        this.dataSource.send(testCase.given);
        const whenResult = this.dataSource.send(testCase.when);
       
        if(testCase.then !== whenResult) {
            this.emitFailure(events);
        } else {
            this.emitSuccess(events);
        }
    }

    private emitSuccess(events: Events): void {
        if(events.onSuccess) {
            events.onSuccess();
        }
    }

    private emitFailure(events: Events): void {
        if(events.onFailure) {
            events.onFailure();
        }
    }
}

export { Squeal };