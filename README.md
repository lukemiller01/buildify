# Buildify

Buildify finds playlists on Spotify with your favorite songs (work in progress).

## Features

- Search functionality for Spotify songs
- Browse Spotify playlists

## Roadmap

- Removing basic search functionality for artists/albums
- Ability to search for songs
- Autocomplete for songs on type (needs further research)
- Ability to add songs to search parameter
- Ability to find correct playlists

## Tech Stack

Due to the simplicity of the product, a rendering framework was not used and Buildify is a SPA (single-page application).

This project is built using [GraphQL](https://graphql.org/). GraphQL is a query language used to streamline front-end application data fetching and standardize data from the back-end application.

[Apollo](https://www.apollographql.com/) is an open-source set of GraphQL tools used both on the client and server in Buildify.


[Jest](https://jestjs.io/), a JavaScript testing framework, is currently being implemented in the project in order to unit test components on the front-end.

#### Other tech used:

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Tailwind UI](https://tailwindui.com/)

## Notes

#### Is this project complete?

Buildify is a work-in-progress and its main feature is still under construction. The project is being built incrementally. At any point in time, any published version should a basic search functionality.

#### Why did you choose to wrap Spotify's REST API in a GraphQL server?

The main purpose of this project is for myself to become familiar with GraphQL. This full-stack application is a perfect opportunity for two reasons. First, using Spotify's API is a great use case because GraphQL concepts like resolver chaining and fragments can be implemented. Second, no time is spent working with creating a database, which would detract from the main goal of learning how to use GraphQL in the full-stack.