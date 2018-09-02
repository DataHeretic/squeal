import { print } from "util";

class DataSource {
    public send(command: string):void {
        print(command);
    }
}

export { DataSource };