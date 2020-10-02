import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { InputType, Field, ObjectType } from "type-graphql";

import { Post } from "./entities/post";

export class MyContext {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
}

@InputType()
export class PostUpdateInput {
  @Field()
  id: string;

  @Field()
  title: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class PostUpdateResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}

@ObjectType()
export class PostDeleteResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean, { nullable: true })
  result?: boolean;
}
