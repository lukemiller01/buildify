import path, { join } from "path";
import { readdirSync, readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers/index.js";

const getTypeDefs = () => {
    let typeDefs = '';
    const typeDefsDir = path.resolve(path.join('graphql', 'typedefs'));
    const gqlFiles = readdirSync(typeDefsDir);
    gqlFiles.forEach(file => {
        typeDefs += readFileSync(join(typeDefsDir, file), {
            encoding: 'utf-8',
        });
    });
    return typeDefs;
}

const schema = makeExecutableSchema({
    typeDefs: getTypeDefs(),
    resolvers: resolvers,
})

export default schema;