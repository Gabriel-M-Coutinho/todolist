export class UserResponseDto {
  statusCode: number;
  message: string;
  data?: any;

  constructor(message: string, statusCode: number) {
    (this.message = message), (this.statusCode = statusCode);
  }
}
