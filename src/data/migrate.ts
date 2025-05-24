import { promises as fs } from "node:fs"
import path from "node:path"
import { FileMigrationProvider, Migrator } from "kysely"
import { db } from "./database"

async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "migrations"),
    }),
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach(r => {
    if (r.status === "Success") {
      console.log(`migration (${r.migrationName}) was executed successfully!`)
    }
    if (r.status === "Error") {
      console.warn(`failed to migrate (${r.migrationName}).`)
    }
  })

  if (error) {
    console.error(`migrate: migrateToLatest: failed to migrate: `, error)
    process.exit(1)
  }

  await db.destroy()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
migrateToLatest()
