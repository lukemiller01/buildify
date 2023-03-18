import { gql } from "@apollo/client";

// This search returns:
// Top 20 artists
// 10 most popular songs from each artist
// 3 images (small, medium, large) for the artist
// ID, for adding keys to map functions
export const ARTIST_SEARCH = gql`
    query ARTIST_SEARCH($q: String!, $type: SearchType!) {
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
    query ALBUM_SEARCH($q: String!, $type: SearchType!) {
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

// This query returns:
// Top 20 tracks. For every track:
// Track ID
// Track name
// Track artist(s)
// Preview URL (30 second sound snippet)
// Album name
// Album image URL
export const TRACK_SEARCH = gql`
query TRACK_SEARCH($q: String!, $type: SearchType!) {
    search(q: $q, type: $type) {
      ... on TrackResponse {
        tracks {
          items {
            id
            name
            artists {
              name
            }
            preview_url
            album {
              name
              images {
                url
              }
            }
          }
        }
      }
    }
  }
`;