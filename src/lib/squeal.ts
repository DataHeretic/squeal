import { isEqual } from 'lodash';
import { DataSource } from './datasource';
import { TestCase } from './testCase';

class Squeal {
    
    constructor(private readonly dataSource: DataSource) {
    }

    public run(testCase: TestCase): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.dataSource.send(testCase.given);
            const whenResult = this.dataSource.send(testCase.when);
            isEqual(testCase.then, whenResult) ? resolve() : reject('failed');
        });
    } 
}

export { Squeal };