import { Router } from "express"
import { db } from "../data/database"
import { HealthController } from "./health/health.controller"
import { HealthService } from "./health/health.service"
import { PostsController } from "./posts/posts.controller"
import { PostsService } from "./posts/posts.service"

export function RegisterControllers() {
  // Health
  const health = new HealthController(Router(), new HealthService(db))

  // Posts
  const post = new PostsController(Router(), new PostsService(db))

  return {
    health: health.router,
    post: post.router,
  }
}
