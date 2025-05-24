import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely"

export interface Database {
  post: PostTable
  user: UserTable
}

interface PostTable {
  id: Generated<number>
  author_id: number
  created_at: ColumnType<Date, never, never>
  content: string
  status: "draft" | "published"
  title: string
  updated_at: ColumnType<Date, never, Date>
}

interface UserTable {
  id: Generated<number>
  created_at: ColumnType<Date, never, never>
  name: string
  role: "user" | "admin"
}

export type Post = Selectable<PostTable>
export type NewPost = Insertable<PostTable>
export type UpdatePost = Updateable<PostTable>

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UpdateUser = Updateable<UserTable>
