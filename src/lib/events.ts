class Events {
    public readonly onFailure?: () => void;
    public readonly onSuccess?: () => void;

    constructor(onFailure?: () => void, onSuccess?: () => void) {
        this.onFailure = onFailure;
        this.onSuccess = onSuccess;
    }
}

export { Events };