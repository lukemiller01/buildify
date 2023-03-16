import fetch from "node-fetch";
import dotenv from 'dotenv';
dotenv.config();

// If the environment variable doesn't exist, use an empty string
const clientID: string = process.env.SPOTIFY_CLIENT_ID ?? '';
const clientSecret: string = process.env.SPOTIFY_CLIENT_SECRET ?? '';

const base64Encode = (s:string) => Buffer.from(s).toString('base64');

const fetchToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: encodeURIComponent('grant_type') + '=' + encodeURIComponent('client_credentials'),
        headers: {
            Authorization: `Basic ${base64Encode(clientID + ":" + clientSecret)}`,
            "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    })
    // TODO: change any
    const token = (await response.json() as unknown as any)
    return token;
}

let token = '';
const getResponse = async (url:string, token:any) => {
    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token['access_token']}`
        }
    });
    return response;
}

// If the token is valid, get the response with the existing token.
// If not, fetch a token from the Spotify API and get the response with the new token
export const _fetch = async (url:string) => {
    let response:any = {}; // TODO: change "any"
    if(token) {
        response = await getResponse(url,token);
    }
    if(!token || response.status === 401) {
        token = await fetchToken();
        response = await getResponse(url, token);
    }
    
    return response.json()
}