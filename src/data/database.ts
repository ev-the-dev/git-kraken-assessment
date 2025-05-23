import { Pool } from "pg"
import { Kysely, PostgresDialect } from "kysely"
import { Database } from "./types"

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env["DB_URL"],
  }),
})

export const db = new Kysely<Database>({
  dialect,
})
