import { Query, Mutation, Resolver, Ctx, Arg } from "type-graphql";

import { Post } from "../../entities/post";
import {
  MyContext,
  PostUpdateInput,
  PostUpdateResponse,
  PostDeleteResponse,
} from "../../type";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  async post(
    @Arg("id", () => String) id: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => PostUpdateResponse)
  async updatePost(
    @Arg("options", () => PostUpdateInput) options: PostUpdateInput,
    @Ctx() { em }: MyContext
  ): Promise<PostUpdateResponse> {
    const post = await em.findOne(Post, { id: options.id });
    if (!post) {
      return {
        errors: [
          {
            field: "id",
            message: "post not found",
          },
        ],
      };
    }
    if (options.title) {
      post.title = options.title;
      await em.persistAndFlush(post);
    }
    return { post };
  }

  @Mutation(() => PostDeleteResponse)
  async deletePost(
    @Arg("id", () => String) id: string,
    @Ctx() { em }: MyContext
  ): Promise<PostDeleteResponse> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return {
        errors: [
          {
            field: "id",
            message: "post not found",
          },
        ],
      };
    }
    await em.removeAndFlush(post);
    return { result: true };
  }
}
