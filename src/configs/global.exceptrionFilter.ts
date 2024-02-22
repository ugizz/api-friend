import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError } from 'typeorm';
import { ResponseEntity } from './ResponseEntity';


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let message = (exception as any).message.message;
        let code = 'HttpException';

        Logger.error(message, (exception as any).stack, `${request.method} ${request.url}`);

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        
        switch (exception.constructor) {
            case BadRequestException:
                status = (exception as BadRequestException).getStatus(); 
                message = (exception as BadRequestException).message;
            case HttpException:
                status = (exception as HttpException).getStatus();
                break;
            case QueryFailedError:  // this is a TypeOrm error
                status = HttpStatus.UNPROCESSABLE_ENTITY
                message = (exception as QueryFailedError).message;
                code = (exception as any).code;
                break;
            case EntityNotFoundError:  // this is another TypeOrm error
                status = HttpStatus.UNPROCESSABLE_ENTITY
                message = (exception as EntityNotFoundError).message;
                code = (exception as any).code;
                break;
            case CannotCreateEntityIdMapError: // and another
                status = HttpStatus.UNPROCESSABLE_ENTITY
                message = (exception as CannotCreateEntityIdMapError).message;
                code = (exception as any).code;
                break;
            case UnauthorizedException:
                status = HttpStatus.UNAUTHORIZED
                message = (exception as UnauthorizedException).message;
                code = (exception as any).code;
                break;
            default:
                status = HttpStatus.INTERNAL_SERVER_ERROR
        }
        response.status(status).json(ResponseEntity.ERROR_WITH(status, message));

    }
}


