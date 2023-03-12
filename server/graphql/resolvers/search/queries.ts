import { search } from "../../../rest/search.js";

// Resolver function is void
const artistQueries = {
    artists: async( _:any, {q}:any, context:any) => {
        return await search(q, 'ARTIST');
    }
}

export default artistQueries;