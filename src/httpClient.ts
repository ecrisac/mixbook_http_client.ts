import {Stream} from "./stream";
import {Url} from "./url";

export type THttpMethod = "GET" | "POST" | "PUT" | "HEAD" | "PATCH" | "DELETE";

export interface IRequest {
  url: Url | string;
  method: THttpMethod;
  body?: string | Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface IResponse {
  text: string;
  arrayBuffer: Promise<ArrayBuffer | Buffer>;
  json: Record<string, any>;
  status: number;
  headers: Record<string, string>;
}

export interface IProgress {
  total: number;
  loaded: number;
}

export interface IHttpClientSession {
  onUploadProgress: Stream<IProgress>;
  onDownloadProgress: Stream<IProgress>;
  promise: Promise<IResponse>;
  abort(): void;
}

export interface IHttpClient {
  get(url: Url | string, headers?: Record<string, string>): Promise<IResponse>;
  post(url: Url | string, body: string | Record<string, any>, headers?: Record<string, string>): Promise<IResponse>;
  put(url: Url | string, body: string | Record<string, any>, headers?: Record<string, string>): Promise<IResponse>;
  delete(url: Url | string, body: string | Record<string, any>, headers?: Record<string, string>): Promise<IResponse>;
  send(request: IRequest): IHttpClientSession;
}

export abstract class HttpClient implements IHttpClient {
  public get(url: Url | string, headers?: Record<string, string>): Promise<IResponse> {
    return this.send({url, method: "GET", headers}).promise;
  }

  public post(
    url: Url | string,
    body: string | Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IResponse> {
    return this.send({url, method: "POST", body, headers}).promise;
  }

  public put(
    url: Url | string,
    body: string | Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IResponse> {
    return this.send({url, method: "PUT", body, headers}).promise;
  }

  public delete(
    url: Url | string,
    body: string | Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IResponse> {
    return this.send({url, method: "DELETE", body, headers}).promise;
  }

  public abstract send(request: IRequest): IHttpClientSession;
}
