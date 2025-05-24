import express from "express"
import { RegisterControllers } from "./api/controllers"
import { auth } from "./api/middleware/auth.middleware"

export function Run() {
  const app = express()

  app.use(express.json())
  app.disable("x-powered-by")

  // @ts-expect-error - fiddling with types to long ,just ignoring this for now
  app.use(auth)

  const controllers = RegisterControllers()

  app.use("/health", controllers.health)

  app.listen(process.env["PORT"], () => {
    console.log("Server is connected on: ", process.env["PORT"])
  })
}
