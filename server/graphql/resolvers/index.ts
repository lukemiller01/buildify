import artistQueries from "./search/queries.js";

const resolvers = {
    Query: {
        ...artistQueries
    }
}

export default resolvers;