import { MikroORM } from "@mikro-orm/core";

import ConnectOptions from "./mikro-orm.config";

export const connect = async () => {
  const orm = await MikroORM.init(ConnectOptions);
  await orm.getMigrator().up();
  return orm;
};
