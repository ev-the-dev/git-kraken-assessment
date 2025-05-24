import type { Request as ExpressRequest } from "express"

declare module "express" {
  interface Request extends ExpressRequest {
    user: {
      id: string
      role: "user" | "admin"
    }
  }
}
