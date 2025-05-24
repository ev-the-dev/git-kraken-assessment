import { Kysely, sql } from "kysely"

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user")
    .addColumn("id", "serial", col => col.primaryKey())
    .addColumn("name", "varchar(255)", col => col.notNull())
    .addColumn("role", "varchar(50)", col => col.defaultTo("user"))
    .addColumn("created_at", "timestamp", col =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()

  await db.schema
    .createTable("post")
    .addColumn("id", "serial", col => col.primaryKey())
    .addColumn("title", "varchar(255)", col => col.notNull())
    .addColumn("content", "text")
    .addColumn("status", "varchar(50)", col => col.defaultTo("draft"))
    .addColumn("author_id", "integer", col =>
      col.references("user.id").notNull()
    )
    .addColumn("created_at", "timestamp", col =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("updated_at", "timestamp", col =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()
}
