import { type IApiRequest, type IResponse } from './types';
export type MyResponse<T = any> = Promise<IResponse<T>>;
/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export declare const request: <T>({ method, url, payload, params, headers, host, timeout, auth, maxBodyLength, }: IApiRequest) => MyResponse<T>;
