import { Kysely } from "kysely"
import { Database } from "src/data/types"

export class HealthService {
  public constructor(private readonly db: Kysely<Database>) {}

  public async Health(): Promise<boolean> {
    try {
      await this.db.selectFrom("user").select("id").limit(1).execute()
      return true
    } catch {
      return false
    }
  }
}
