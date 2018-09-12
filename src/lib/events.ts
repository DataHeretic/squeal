class Events {
    constructor(public readonly onFailure?: () => void, public readonly onSuccess?: () => void) {
        this.onFailure = onFailure;
        this.onSuccess = onSuccess;
    }
}

export { Events };