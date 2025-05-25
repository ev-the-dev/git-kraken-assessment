import { db } from "./database"

async function seed() {
  // Users
  const users = await db
    .insertInto("user")
    .values([
      {
        name: "Mr. Milchick",
        role: "admin",
      },
      {
        name: "Mark S",
        role: "user",
      },
      {
        name: "Helly R",
        role: "user",
      },
      {
        name: "Dylan G",
        role: "user",
      },
      {
        name: "Irving B",
        role: "user",
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
        content:
          "Just say the word and I'll get you a coffee cozy literally right now, Dylan!",
        status: "draft",
        title: "To Dylan G",
      },
      {
        author_id: users[1]!.id,
        content: "Lumon is the best. The work is mysterious and important.",
        status: "published",
        title: "Hello World!",
      },
      {
        author_id: users[1]!.id,
        content:
          "They're hiding something, and I'm going to find out what it is!",
        status: "draft",
        title: "Lumon is actually the worst",
      },
      {
        author_id: users[2]!.id,
        content: "Yep, just earned one more waffle party.",
        status: "published",
        title: "Another One",
      },
      {
        author_id: users[3]!.id,
        content: "I need to somehow convince my outie to let me resign!",
        status: "draft",
        title: "I Quit",
      },
      {
        author_id: users[4]!.id,
        content: "What exquisite artwork!",
        status: "draft",
        title: "Burt...",
      },
    ])
    .execute()
}

seed()
  .catch(console.error)
  .finally(async () => {
    await db.destroy()
  })
