import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { connect } from "./database/connect";
import { PostResolver } from "./graphql/post/resolver";

export default async () => {
  const orm = await connect();
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false,
    }),
    context: () => ({
      em: orm.em,
    }),
  });
  return server;
};
