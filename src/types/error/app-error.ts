export class AppError implements Error {
  public message: string;
  public stack?: string;
  public readonly name: string;
  public readonly httpCode: number;
  public readonly description: string;
  constructor(name: string, httpCode: number, description?: string) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.name = name;
    this.httpCode = httpCode;
    this.description = description;
  }
}
