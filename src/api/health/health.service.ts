import { Kysely, sql } from "kysely"
import { Database } from "../../data/types"

export class HealthService {
  public constructor(private readonly db: Kysely<Database>) {}

  public async Health(): Promise<boolean> {
    try {
      await sql`SELECT 1`.execute(this.db)
      return true
    } catch {
      return false
    }
  }
}
