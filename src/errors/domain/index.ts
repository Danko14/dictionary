class DomainError extends Error {}

export class InvalidRequestError extends DomainError {
    constructor(message: string = 'Invalid request') {
        super(message)
    }
}

export class InsufficientData extends DomainError {
    constructor(message: string = 'Insufficient data') {
        super(message)
    }
}

export class NotFoundError extends DomainError {
    constructor(message: string = 'Word not found') {
        super(message)
    }
}
