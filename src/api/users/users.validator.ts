import { NewUser } from "../../data/types"
import { BloggeurError, ValidationError } from "../common/errors"

export function validateCreateUserBody(user: NewUser): BloggeurError | void {
  const { name, role } = user

  if (!name || typeof name !== "string") {
    return new ValidationError(
      `Expected (name) to be of type (string) but received (${typeof name})`
    )
  }

  if (role && role !== "admin" && role !== "user") {
    return new ValidationError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Expected (role) to be of type ("admin" | "user") but received (${role})`
    )
  }
}
