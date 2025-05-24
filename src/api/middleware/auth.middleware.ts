import type { Request, Response, NextFunction } from "express"
import { HTTP_STATUS } from "../common/types"
import { db } from "src/data/database"

// Mock Auth
export async function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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

  const user = await db
    .selectFrom("user")
    .select(["id", "role"])
    .where("id", "=", Number(userId))
    .executeTakeFirst()

  if (!user) {
    res.status(HTTP_STATUS.AUTHN).json({ error: "Unauthenticated" })
    return
  }

  req.user = { id: user.id.toString(), role: user.role }
  next()
}
