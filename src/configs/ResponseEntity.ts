import { HttpStatus } from "@nestjs/common";
import { ResponseStatus } from "./ResponseStatus";

export class ResponseEntity<T> {

    private readonly statusCode: number;

    private readonly message: string;

    data: T;

  public constructor(status: number, message: string, data: T) {
    this.statusCode = status;
    this.message = message;
    this.data = data;
  }

  static OK(): ResponseEntity<string> {
    return new ResponseEntity<string>(ResponseStatus.OK, 'success', '');
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.OK, 'success', data);
  }
  static OK_MSG<T>(msg: string ,data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(ResponseStatus.OK, msg, data);
  }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      ResponseStatus.SERVER_ERROR,
      '서버 에러가 발생했습니다.',
      '',
    );
  }


  static ERROR_WITH(
    status : HttpStatus,
    message: string,
  ): ResponseEntity<string> {
    return new ResponseEntity<string>(status, message, '');
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    code: ResponseStatus = ResponseStatus.SERVER_ERROR,
    data: T,
  ): ResponseEntity<T> {
    return new ResponseEntity<T>(code, message, data);
  }
    
}


