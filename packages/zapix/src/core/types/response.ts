export type ApiHeaders = Readonly<Record<string, string>>;

export interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  details?: unknown;
}

export type ApiResponseBody<T> = SuccessResponse<T> | ErrorResponse;

export interface AwsApiResponse {
  statusCode: number;
  headers: ApiHeaders;
  body: string;
}
