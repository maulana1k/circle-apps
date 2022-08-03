import { Response } from 'express';
import { ResPayload } from '@circle-app/api-interfaces';

// const response_handler = (
//   res: Response,
//   { statusCode, error, message, data }: ResponseType
// ): void => {
//   res.status(statusCode).json({ message, error, data });
// };

export function response_success<T>(
  res: Response,
  data: T,
  message: string = 'Success'
) {
  const payload: ResPayload<T> = { message, err: null, data };
  res.status(200).json(payload);
}

export function response_not_found(
  res: Response,
  message: string,
  err: any = 'Not found'
) {
  const payload: ResPayload<null> = { message, err, data: null };
  res.status(404).json(payload);
}
export function response_bad_request(
  res: Response,
  message: string,
  err: any = 'Bad request'
) {
  const payload: ResPayload<null> = { message, err, data: null };
  res.status(400).json(payload);
}

export function response_forbidden(
  res: Response,
  message: string,
  err: any = 'Access forbidden'
) {
  const payload: ResPayload<null> = { message, err, data: null };
  res.status(403).json(payload);
}

export function response_server_error(
  res: Response,
  message: string,
  err: any = 'Internal server error'
) {
  const payload: ResPayload<null> = { message, err, data: null };
  res.status(500).json(payload);
}
