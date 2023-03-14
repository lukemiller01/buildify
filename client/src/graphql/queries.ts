import { gql } from "@apollo/client";

// This search returns:
// Top 20 artists
// 10 most popular songs from each artist
// 3 images (small, medium, large) for the artist
// ID, for adding keys to map functions
export const ARTIST_SEARCH = gql`
    query Search($q: String!, $type: SearchType!) {
        search(q: $q, type: $type) {
            ... on ArtistResponse {
            artists {
                items {
                id
                name
                top_tracks {
                    name
                }
                images {
                    url
                }
                }
            }
            }
        }
    }
`;

// This search returns:
// Top 20 albums
// Artist name
// 3 images (small, medium, large) for the album
export const ALBUM_SEARCH = gql`
    query Query($q: String!, $type: SearchType!) {
    search(q: $q, type: $type) {
        ... on AlbumResponse {
        albums {
            items {
            id
            name
            artists {
                name
            }
            images {
                url
            }
            }
        }
        }
    }
    }
`;