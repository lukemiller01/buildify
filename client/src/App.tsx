import './App.css';
import React, { useState } from 'react';

// GraphQL
import { gql, useQuery } from '@apollo/client';

function App() {

  const [ search , setSearch ] = useState('');

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const SEARCH = gql`
    query Query($q: String!, $type: SearchType!) {
      search(q: $q, type: $type) {
        ... on ArtistResponse {
          artists {
            items {
              name
              popularity
              id
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(SEARCH, {
    variables: {
      "q": "Kendrick",
      "type": "ARTIST"
    },
  });
  
  if(data) {
    console.log(data["search"]["artists"]['items'])
  }

  return (
    <>
    <div className='flex flex-col m-4'>
      <div className=' text-center'>
        <h1>Buildify</h1>
        <p>Generate Spotify playlists with your favorite songs</p>
      </div>
      <form className='border-2 border-emerald rounded-xl flex items-center flex-col p-4 gap-4' onSubmit={(e:React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <input type="text" placeholder='Seach for an artist' className=' p-1' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}></input>
        <button type="submit" value="Submit" className=' bg-emerald border-white border-2 rounded-md px-4 py-1'>Button</button>
      </form>
      <p>{data? JSON.stringify(data["search"]["artists"]['items']): ''}</p>
    </div>
    </>
  )
}

export default App
