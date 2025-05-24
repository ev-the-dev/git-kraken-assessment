import { Router } from "express"
import { db } from "../data/database"
import { HealthController } from "./health/health.controller"
import { HealthService } from "./health/health.service"

export function RegisterControllers() {
  // Health
  const health = new HealthController(Router(), new HealthService(db))

  return {
    health: health.router,
  }
}
