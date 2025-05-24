import { Kysely } from "kysely"
import { Database, Post, UpdatePost } from "src/data/types"

export class PostsService {
  public constructor(private readonly db: Kysely<Database>) {}

  public async getPostById(
    postId: string
  ): Promise<(Post & { author: string }) | null> {
    try {
      const dbPost = await this.db
        .selectFrom("post")
        .innerJoin("user", "post.author_id", "user.id")
        .selectAll("post")
        .select("user.name as author")
        .where("post.id", "=", Number(postId))
        .executeTakeFirst()

      if (!dbPost) return null

      return dbPost
    } catch (e) {
      const err = e as Error
      console.error(`posts: service: getPostById: ${err}\n`)
      return null
    }
  }

  public async getPublishedPosts(): Promise<Array<
    Post & { author: string }
  > | null> {
    try {
      // NOTE: Could use `leftJoin` to include posts from "deleted" users
      const dbPosts = await this.db
        .selectFrom("post")
        .innerJoin("user", "post.author_id", "user.id")
        .selectAll("post")
        .select("user.name as author")
        .where("post.status", "=", "published")
        .execute()

      return dbPosts
    } catch (e) {
      const err = e as Error
      console.error(`posts: service: getPublishedPosts: ${err}\n`)
      return null
    }
  }

  public async updatePost(
    postId: string,
    post: UpdatePost
  ): Promise<Post | null> {
    try {
      const postToUpdate: Partial<UpdatePost> = {
        updated_at: new Date(),
      }
      if (post.content) postToUpdate.content = post.content
      if (post.status) postToUpdate.status = post.status
      if (post.title) postToUpdate.title = post.title

      await this.db
        .updateTable("post")
        .set(postToUpdate)
        .where("id", "=", Number(postId))
        .executeTakeFirst()

      const updatedPost = await this.getPostById(postId)

      return updatedPost
    } catch (e) {
      const err = e as Error
      console.error(`posts: service: updatePost: ${err}\n`)
      return null
    }
  }
}
