class TestCase {
    constructor(public readonly given: string, public readonly when: string, public readonly then: ReadonlyArray<any>) {
    }
}

export { TestCase };