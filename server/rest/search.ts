import { _fetch } from "./index.js";

// For fetching album or artists by type and query
export const search = async ( searchText:string, type:string ) => await _fetch(`https://api.spotify.com/v1/search?q=${searchText}&type=${type.toLowerCase()}`);

// For resolver chaining top tracks onto artists
export const topTracks = async (artistId:string) => await _fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`);