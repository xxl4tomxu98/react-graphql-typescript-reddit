import { Resolver, Query, Ctx } from 'type-graphql';
import { Post } from '../entities/Post';
import { Mycontext } from '../types';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() { em }: Mycontext): Promise<Post[]> {
        return em.find(Post, {});
    }
}
