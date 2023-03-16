import { search } from "../../../rest/search.js";

interface FunctionArguments {
    q: string
    type: string
}

// Type returns whether the query is an artist or album query
const searchQueries = {
    search: async( _:any, {q, type}:FunctionArguments, context:any) => {
        return await search(q, type);
    }
}

export default searchQueries;