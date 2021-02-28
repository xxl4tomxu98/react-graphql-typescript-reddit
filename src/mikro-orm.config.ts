import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        //regex below can handle ts and js files
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post],
    dbName: "lireddit",
    user: "lireddit_app",
    password: "password",
    debug: !__prod__,
    type: "postgresql",
} as Parameters<typeof MikroORM.init>[0];
