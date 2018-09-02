class TestCase {
    public readonly given: string;
    public readonly when: string;
    public readonly then: string;

    constructor(given: string, when: string, then: string) {
        this.given = given;
        this.when = when;
        this.then = then;
    }
}

export { TestCase };