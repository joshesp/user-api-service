class AppError extends Error {
    public readonly statusCode: number;
    public readonly message: string;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode = 500, isOperational = true, stack = '',) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default AppError;