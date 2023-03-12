import artistQueries from "./search/queries.js";

// TODO: define item object
interface Object {
    artists: {
        href: string
        items: [any]
        limit: number
        next: string
        offset: number
        previous: number | null
        total: number
    }
    albums: {
        href: string
        items: [any]
        limit: number
        next: string
        offset: number
        previous: number | null
        total: number
    }
}

const resolvers = {
    SearchResponse: { // ! Currently, context and info isn't being used, so defining their types is unimportant.
        __resolveType(obj:Object,context:any,info:any) {
            if(obj.artists) {
                return "ArtistResponse"
            }
            else if (obj.albums) {
                return "AlbumResponse"
            }
        }
    },
    Query: {
        ...artistQueries
    },
}

export default resolvers;