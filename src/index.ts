import "reflect-metadata";

import express from "express";

import createApolloserver from "./server";

export const main = async () => {
  const port = 4000;
  const app = express();
  const apolloServer = await createApolloserver();
  apolloServer.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`server is listening on ${port}`);
  });
};

main();
