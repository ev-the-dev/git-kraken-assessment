import { UpdatePost } from "src/data/types"
import { BloggeurError, ValidationError } from "../common/errors"

export function validateUpdatePostBody(post: UpdatePost): BloggeurError | void {
  const { content, status, title } = post
  if (content && typeof content !== "string") {
    return new ValidationError(
      `Expected (content) to be of type (string) but received (${typeof content})`
    )
  }

  if (status && status != "draft" && status != "published") {
    return new ValidationError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Expected (status) to be of type ("draft" | "published") but received (${status})`
    )
  }

  if (title && typeof title != "string") {
    return new ValidationError(
      `Expected (title) to be of type (string) but received (${typeof title})`
    )
  }
}
