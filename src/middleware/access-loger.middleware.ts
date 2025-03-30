import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AccessLoggerMiddleware implements NestMiddleware {
    private logger = new Logger(AccessLoggerMiddleware.name);
    constructor() { }

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl: url } = request;
        const userAgent = request.get('user-agent') || '';
        const startTime = Date.now();

        response.on('close', () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length');
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            this.logger.debug(
                `📞 | ${method} ${url} - ${statusCode} ${contentLength} - ${userAgent} ${ip} - ResponseTime ${responseTime}ms`,
            );
        });
        next();
    }
}
