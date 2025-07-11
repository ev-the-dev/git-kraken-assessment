import type { Request, Response, Router } from "express"
import type { HealthService } from "./health.service"

export class HealthController {
  public constructor(
    public readonly router: Router,
    private readonly service: HealthService
  ) {
    this.init()
  }

  protected async health(_: Request, res: Response) {
    const isHealthy = await this.service.Health()
    if (isHealthy) {
      res.json({
        db: "connected",
        status: "healthy",
      })
    } else {
      res.json({
        db: "disconnected",
        status: "unhealthy",
      })
    }
  }

  protected init() {
    // @ts-expect-error the type foo is too much on this
    this.router.get("/", this.health.bind(this))
  }
}
