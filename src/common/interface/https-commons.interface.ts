import { HttpException, HttpStatus } from '@nestjs/common';

export interface IServiceCommonResponse {
    message: string;
    data: any | undefined;
}

export interface IServiceErrorResponse {
    message: string;
    error: any;
}

export interface IServiceResponse<T> extends IServiceCommonResponse {
    data: T | undefined;
}

export function okResponse<T>(data: T, error: any = null): IServiceResponse<T> {
    return {
        message: 'operation successful 🙌',
        data,
    };
}

export function errorResponse(
    message: string,
    error: any,
): IServiceErrorResponse {
    return {
        message,
        error,
    };
}

export async function httpResponse<T>(
    fn: () => Promise<T>,
): Promise<IServiceResponse<T> | IServiceErrorResponse> {
    try {
        const result: T = await fn();
        return okResponse(result);
    } catch (error) {
        if (error instanceof HttpException) {
            const status: number = error.getStatus();
            const nvoError = new HttpException(
                {
                    status: status,
                    message: error.message,
                    data: null,
                    errors: {
                        message: error.message,
                    },
                },
                status,
            );
            nvoError.stack = error.stack;
            throw nvoError;
        }
        const nvoError = new HttpException(
            {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error inesperado',
                data: null,
                errors: {
                    message: error.message,
                },
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        nvoError.stack = error.stack;
        throw nvoError;
    }
}
