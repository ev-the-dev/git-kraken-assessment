import type { Request, Response, Router } from "express"
import { PostsService } from "./posts.service"
import { ControllerRequest, HTTP_STATUS } from "../common/types"
import { validateUpdatePostBody } from "./posts.validator"
import { UpdatePost } from "src/data/types"

export class PostsController {
  public constructor(
    public readonly router: Router,
    private readonly service: PostsService
  ) {
    this.init()
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

    const serviceRes = await this.service.updatePost(postId, req.body)
    if (serviceRes == null) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        error: `Post with ID (${postId}) was not found`,
      })
      return
    }

    return serviceRes
  }

  protected init() {
    this.router.get("/published", this.getPublishedPosts.bind(this))
    this.router.put("/:userId/:postId", this.updatePost.bind(this))
  }
}

interface UpdatePostParams {
  postId: string
  userId: string
}
