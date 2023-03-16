import { topTracks } from "../../rest/search.js";
import searchQueries from "./search/queries.js";

// TODO: define items object
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

interface Artist {
    name: string
    id: string
    popularity: number
    genres: [string]
    type: string
    uri: string
    href: string
    images: [string]
    top_tracks: [any]
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
    }, // Because we're using unions and fragments, SearchResponse resolves to an object ArtistResponse or AlbumResponse type
    Query: {
        ...searchQueries
    }, // Returns the result from Spotify's REST API
    Artist: {
        top_tracks: async (parent:Artist) => {
            return (await topTracks(parent.id)).tracks;
        }
    }, // Top tracks field for Artist type (resolver chaining)
}

export default resolvers;