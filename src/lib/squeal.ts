import { DataSource } from "./datasource";
import { TestCase } from "./testCase";

class Squeal {
    private readonly dataSource: DataSource;
    
    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    public run(testCase: TestCase):void {
        this.dataSource.send(testCase.given);
        this.dataSource.send(testCase.when);
        this.dataSource.send(testCase.then);
    }
}

export { Squeal };