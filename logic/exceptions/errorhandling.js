class CustomError extends Error {

    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

class UnexistingResourceError extends CustomError {

    constructor(message) {
        super(404, message);
    }
}

export { CustomError, UnexistingResourceError }
