import { Response, Router } from "express"
import { NewUser } from "../../data/types"
import { ControllerRequest, HTTP_STATUS } from "../common/types"
import { validateCreateUserBody } from "./users.validator"
import { UsersService } from "./users.service"

export class UsersController {
  public constructor(
    public readonly router: Router,
    private readonly service: UsersService
  ) {
    this.init()
  }

  protected async createUser(req: ControllerRequest<NewUser>, res: Response) {
    const err = validateCreateUserBody(req.body)
    if (err) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: err.message,
      })
      return
    }

    const serviceRes = await this.service.createUser(req.body)

    res.status(HTTP_STATUS.CREATED).json(serviceRes)
  }

  protected init() {
    // @ts-expect-error the type foo is too much on this
    this.router.post("/", this.createUser.bind(this))
  }
}
