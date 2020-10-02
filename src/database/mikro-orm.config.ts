import { MikroORM } from "@mikro-orm/core";
import path from "path";

import { Post } from "../entities/post";

export default {
  dbName: "graph-type",
  user: "postgres",
  password: "postgres",
  host: "localhost",
  type: "postgresql",
  debug: true,
  entities: [Post],
  migrations: {
    path: path.join(__dirname, "./migrations/"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Parameters<typeof MikroORM.init>[0];
