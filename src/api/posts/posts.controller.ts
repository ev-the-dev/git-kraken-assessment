import type { Request, Response, Router } from "express"
import { PostsService } from "./posts.service"
import { ControllerRequest, HTTP_STATUS } from "../common/types"
import {
  validateCreatePostBody,
  validateUpdatePostBody,
} from "./posts.validator"
import { NewPost, UpdatePost } from "../../data/types"

export class PostsController {
  public constructor(
    public readonly router: Router,
    private readonly service: PostsService
  ) {
    this.init()
  }

  protected async createPost(
    req: ControllerRequest<NewPost, CreatePostParams>,
    res: Response
  ) {
    const { userId } = req.params

    if (!userId) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Must pass in (userId) via params",
      })
      return
    }

    const err = validateCreatePostBody(req.body)
    if (err) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: err.message,
      })
      return
    }

    const serviceRes = await this.service.createPost(userId, req.body)

    res.status(HTTP_STATUS.CREATED).json(serviceRes)
  }

  protected async deletePost(
    req: ControllerRequest<void, DeletePostParams>,
    res: Response
  ) {
    const { id: authId, role } = req.user
    const { userId, postId } = req.params

    if (authId !== userId && role !== "admin") {
      res.status(HTTP_STATUS.AUTHZ).json({
        error: "Unauthorized",
      })
      return
    }

    if (!userId || !postId) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Must pass in both (userId) and (postId) via params",
      })
      return
    }

    const serviceRes = await this.service.deletePost(userId, postId)
    if (serviceRes === null) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        error: `Post with ID (${postId}) was not found`,
      })
      return
    }

    res.sendStatus(HTTP_STATUS.NO_CONTENT)
  }

  protected async getPublishedPosts(_: Request, res: Response) {
    const serviceRes = await this.service.getPublishedPosts()
    if (serviceRes == null) {
      res.sendStatus(HTTP_STATUS.INTERNAL)
      return
    }

    res.status(HTTP_STATUS.OK).json({
      posts: serviceRes,
    })
  }

  protected getPublishedPostsByUser(_: Request, res: Response) {
    res.sendStatus(HTTP_STATUS.NOT_IMPL)
  }

  protected async updatePost(
    req: ControllerRequest<UpdatePost, UpdatePostParams>,
    res: Response
  ) {
    const { id: authId, role } = req.user
    const { userId, postId } = req.params

    if (authId !== userId && role !== "admin") {
      res.status(HTTP_STATUS.AUTHZ).json({
        error: "Unauthorized",
      })
      return
    }

    if (!userId || !postId) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Must pass in both (userId) and (postId) via params",
      })
      return
    }

    const err = validateUpdatePostBody(req.body)
    if (err) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: err.message,
      })
      return
    }

    const serviceRes = await this.service.updatePost(userId, postId, req.body)
    if (serviceRes == null) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        error: `Post with ID (${postId}) was not found`,
      })
      return
    }

    res.status(HTTP_STATUS.OK).json(serviceRes)
  }

  protected init() {
    // @ts-expect-error the type foo is too much on this
    this.router.get("/published", this.getPublishedPosts.bind(this))
    // @ts-expect-error the type foo is too much on this
    this.router.post("/:userId", this.createPost.bind(this))
    // @ts-expect-error the type foo is too much on this
    this.router.put("/:userId/:postId", this.updatePost.bind(this))
    // @ts-expect-error the type foo is too much on this
    this.router.delete("/:userId/:postId", this.deletePost.bind(this))
  }
}

interface CreatePostParams {
  userId: string
}

interface DeletePostParams {
  postId: string
  userId: string
}

interface UpdatePostParams {
  postId: string
  userId: string
}
