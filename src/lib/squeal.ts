import { DataSource } from './datasource';
import { TestCase } from './testCase';

class Events {
    public readonly onFailure?: () => void;
    public readonly onSuccess?: () => void;

    constructor(onFailure?: () => void, onSuccess?: () => void) {
        this.onFailure = onFailure;
        this.onSuccess = onSuccess;
    }
}

class Squeal {
    private readonly dataSource: DataSource;
    
    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    public run(testCase: TestCase, events: Events): void {
        this.dataSource.send(testCase.given);
        const when = this.dataSource.send(testCase.when);
       
        if(testCase.then !== when) {
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

export { Squeal, Events };