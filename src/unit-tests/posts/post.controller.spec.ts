import type { Kysely } from "kysely"
import { HTTP_STATUS } from "../../api/common/types"
import { PostsController } from "../../api/posts/posts.controller"
import { PostsService } from "../../api/posts/posts.service"
import { Database } from "../../data/types"
import { Router } from "express"
import { mockPost } from "../mocks"

jest.mock("../../api/posts/posts.service")

describe("PostsController", () => {
  let controller: PostsController
  let mockService: jest.Mocked<PostsService>

  beforeAll(() => {
    mockService = new PostsService(
      {} as unknown as Kysely<Database>
    ) as jest.Mocked<PostsService>

    controller = new PostsController(Router(), mockService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("POST /posts/:userId", () => {
    it(`should return a status (${HTTP_STATUS.CREATED}) when successful`, async () => {
      mockService.createPost.mockResolvedValue(mockPost())

      await controller["createPost"](req, res)
      expect(res.body).toMatchInlineSnapshot()
    })
  })
})
