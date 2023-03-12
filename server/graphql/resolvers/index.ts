const resolvers = {
    Query: {
        artists: () => ([
            {
                name: "Kanye West",
                popularity: 5,
                type: "Artist",
                id: "1",
            },
            {
                name: "Bon Iver",
                popularity: 10,
                type: "Artist",
                id: "2",
            }
        ])
    }
}

export default resolvers;