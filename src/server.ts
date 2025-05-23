import express from "express"
import { RegisterControllers } from "./controllers"

export function Run() {
  const app = express()

  app.use(express.json())
  app.disable("x-powered-by")

  const controllers = RegisterControllers()

  app.use("/health", controllers.health)

  app.listen(process.env["PORT"], () => {
    console.log("Server is connected on: ", process.env["PORT"])
  })
}
