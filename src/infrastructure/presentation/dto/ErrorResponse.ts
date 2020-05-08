interface ErrorType {

    status: number;
    message: string;

}

interface ErrorResponse {

    error: ErrorType;

}

export default ErrorResponse;