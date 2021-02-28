import { Resolver, Query, Ctx, Arg, Int } from 'type-graphql';
import { Post } from '../entities/Post';
import { Mycontext } from '../types';
import { idText } from 'typescript';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() { em }: Mycontext): Promise<Post[]> {
        return em.find(Post, {});
    }

    @Query(() => Post, {nullable: true})
    post(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: Mycontext
    ): Promise<Post | null> {
        return em.findOne(Post, {id});
    }
}
