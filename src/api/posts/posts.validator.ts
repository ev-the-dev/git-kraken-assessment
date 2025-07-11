import { NewPost, UpdatePost } from "../../data/types"
import { BloggeurError, ValidationError } from "../common/errors"

export function validateCreatePostBody(post: NewPost): BloggeurError | void {
  if (!post || typeof post !== "object") {
    return new ValidationError(`Please provide a valid Post object`)
  }

  const { content, status, title } = post
  if (!content || typeof content !== "string") {
    return new ValidationError(
      `Expected (content) to be of type (string) but received (${typeof content})`
    )
  }

  if (!status || (status != "draft" && status != "published")) {
    return new ValidationError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Expected (status) to be of type ("draft" | "published") but received (${status})`
    )
  }

  if (!title || typeof title != "string") {
    return new ValidationError(
      `Expected (title) to be of type (string) but received (${typeof title})`
    )
  }
}

export function validateUpdatePostBody(post: UpdatePost): BloggeurError | void {
  if (!post || typeof post !== "object") {
    return new ValidationError(`Please provide a valid Post object`)
  }

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
