class DataSource {
    public send(command: string):ReadonlyArray<any> {
        return [command];
    }
}

export { DataSource };