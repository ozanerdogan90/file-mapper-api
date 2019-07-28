import { ValidationError } from 'joi';

export interface IFormattedError {
  [key: string]: string[];
}

export function errorFormatter(error: ValidationError): object {
  const formattedError: IFormattedError = {};

  error.details.forEach(validationErrorItem => {
    const key =
      (validationErrorItem.context && validationErrorItem.context.key) ||
      'general';
    const message = validationErrorItem.message.replace(/["]/gi, '');

    formattedError[key] = formattedError[key]
      ? formattedError[key].concat(message)
      : [message];
  });

  return formattedError;
}
