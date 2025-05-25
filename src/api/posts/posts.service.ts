import { Kysely } from "kysely"
import { Database, NewPost, PostWithAuthor, UpdatePost } from "../../data/types"

export class PostsService {
  public constructor(private readonly db: Kysely<Database>) {}

  public async createPost(
    userId: string,
    post: NewPost
  ): Promise<PostWithAuthor | null> {
    try {
      const result = await this.db
        .insertInto("post")
        .values([
          {
            author_id: Number(userId),
            content: post.content,
            status: post.status,
            title: post.title,
          },
        ])
        .returning("id")
        .executeTakeFirst()

      if (result == undefined) return null

      const postWithAuthor = await this.getPostById(result.id.toString())

      return postWithAuthor
    } catch (e) {
      const err = e as Error
      console.error("posts: service: createPost: ", err)
      return null
    }
  }

  public async deletePost(
    userId: string,
    postId: string
  ): Promise<void | null> {
    try {
      const result = await this.db
        .deleteFrom("post")
        .where(eb =>
          eb.and([
            eb("id", "=", Number(postId)),
            eb("author_id", "=", Number(userId)),
          ])
        )
        .executeTakeFirst()

      if (result.numDeletedRows === BigInt(0)) return null
    } catch (e) {
      const err = e as Error
      console.error("posts: service: deletePost: ", err)
      return null
    }
  }

  public async getPostById(postId: string): Promise<PostWithAuthor | null> {
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
      console.error("posts: service: getPostById: ", err)
      return null
    }
  }

  public async getPostsByUser(
    userId: string
  ): Promise<PostWithAuthor[] | null> {
    try {
      const dbPosts = await this.db
        .selectFrom("post")
        .innerJoin("user", "post.author_id", "user.id")
        .selectAll("post")
        .select("user.name as author")
        .where("post.author_id", "=", Number(userId))
        .execute()

      return dbPosts
    } catch (e) {
      const err = e as Error
      console.error("posts: service: getPostsByUser: ", err)
      return null
    }
  }

  public async getPublishedPosts(): Promise<PostWithAuthor[] | null> {
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
      console.error("posts: service: getPublishedPosts: ", err)
      return null
    }
  }

  public async updatePost(
    userId: string,
    postId: string,
    post: UpdatePost
  ): Promise<PostWithAuthor | null> {
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
        .where(eb =>
          eb.and([
            eb("id", "=", Number(postId)),
            eb("author_id", "=", Number(userId)),
          ])
        )
        .executeTakeFirst()

      const updatedPost = await this.getPostById(postId)

      return updatedPost
    } catch (e) {
      const err = e as Error
      console.error("posts: service: updatePost: ", err)
      return null
    }
  }
}
