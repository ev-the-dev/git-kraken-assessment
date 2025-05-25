import { Request, Resposne } from "express"

export function mockRequest(overrides: Partial<Request> = {}): Request {
  return {
    params: {},
    headers: {},
    body: {},
    user: {
      id: "2",
      role: "user",
    },
    ...overrides,
  } as Request
}

// TODO: think about making this a class
export function mockResponse() {
  const res: Partial<Response> = {
    body: {} as Response["body"],
    status: 0,
		set status()
  }
}
