import { _fetch } from "./index.js";

export const search = async ( searchText:string, type:string ) => await _fetch(`https://api.spotify.com/v1/search?q=${searchText}&type=${type.toLowerCase()}`);