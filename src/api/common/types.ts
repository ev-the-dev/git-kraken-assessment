import { Request } from "express"

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  AUTHN = 401,
  AUTHZ = 403,
  NOT_FOUND = 404,
  INTERNAL = 500,
  NOT_IMPL = 501,
}

export type ControllerRequest<
  TRequest,
  TParams = Record<string, string>,
  TQuery = Record<string, string>,
> = Request<ParamsDictionary<TParams>, void, TRequest, TQuery> & {
  user: {
    id: string
    role: "user" | "admin"
  }
}

type ParamsDictionary<T = Record<string, string>> = {
  [U in keyof T]: T[U]
}
