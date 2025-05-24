import { Kysely } from "kysely"
import { Database, NewUser, User } from "../../data/types"

export class UsersService {
  public constructor(private readonly db: Kysely<Database>) {}

  public async createUser(user: NewUser): Promise<User | null> {
    try {
      const result = await this.db
        .insertInto("user")
        .values([
          {
            name: user.name,
            role: user.role,
          },
        ])
        .returning("id")
        .executeTakeFirst()

      if (result == undefined) return null

      const userFromDb = await this.db
        .selectFrom("user")
        .selectAll()
        .where("id", "=", result.id)
        .executeTakeFirst()

      if (userFromDb == undefined) return null

      return userFromDb
    } catch (e) {
      const err = e as Error
      console.error(`users: service: createUser: ${err}\n`)
      return null
    }
  }
}
