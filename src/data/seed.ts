import { db } from "./database"

async function seed() {
  // Users
  const users = await db
    .insertInto("user")
    .values([
      {
        name: "Mark Scout",
        role: "user",
      },
      {
        name: "Mr. Milchick",
        role: "admin",
      },
    ])
    .returning("id")
    .execute()

  // Posts
  await db
    .insertInto("post")
    .values([
      {
        author_id: users[0]!.id,
        content: "Lumon is the best. The work is mysterious and important.",
        status: "published",
        title: "Hello World!",
      },
      {
        author_id: users[1]!.id,
        content:
          "Just say the word and I'll get you a coffee cozy literally right now, Dylan!",
        status: "draft",
        title: "To Dylan G",
      },
    ])
    .execute()
}

seed()
  .catch(console.error)
  .finally(async () => {
    await db.destroy()
  })
