import { search } from "../../../rest/search.js";

interface FunctionArguments {
    q: string
    type: string
}

// Resolver function is void
const artistQueries = {
    search: async( _:any, {q, type}:FunctionArguments, context:any) => {
        return await search(q, type);
    }
}

export default artistQueries;