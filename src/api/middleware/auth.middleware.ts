import type { Request, Response, NextFunction } from "express"
import { HTTP_STATUS } from "../common/types"

// Mock Auth
export function auth(req: Request, res: Response, next: NextFunction): void {
  const userId = req.headers["x-user-id"]
  if (!userId) {
    res.status(HTTP_STATUS.AUTHN).json({ error: "Unauthenticated" })
    return
  }

  if (typeof userId != "string") {
    res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: "Expected `x-user-id` header to be a string" })
    return
  }

  req.user = { id: userId }
  next()
}
