import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from "./resolvers/post";

const main = async () => {

    //connect to db
    const orm = await MikroORM.init(mikroConfig);
    // auto migration when migration file exist
    await orm.getMigrator().up();
    // create app of express server
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    });

    apolloServer.applyMiddleware({ app });
    // example hello-world test on server
    app.get('/', (_, res) => {
        res.send("hello");
    })


    // run sql
    // const post = orm.em.create(Post, {title: 'my first post'});
    // await orm.em.persistAndFlush(post);

    // console.log('------sql 2--------') alternate
    // await orm.em.nativeInsert(Post, {title: 'my first post 2'});
    // const posts = await orm.em.find(Post, {});
    // console.log(posts)
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    })
};

main().catch(err => {
    console.error(err);
});
