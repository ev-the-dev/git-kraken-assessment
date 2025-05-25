import { PostWithAuthor } from "../data/types"

export function mockPost(): PostWithAuthor {
  return {
    id: 99,
    author: "author__MOCK",
    author_id: 1,
    content: "content__MOCK",
    created_at: new Date(),
    status: "published",
    title: "title__MOCK",
    updated_at: new Date(),
  }
}
