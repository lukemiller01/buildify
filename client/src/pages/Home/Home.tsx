import React, { useState, useEffect, Fragment } from "react";

// Apollo GraphQL Client
import { client } from "../../main";
import { CachePersistor } from 'apollo3-cache-persist';
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  ARTIST_SEARCH,
  ALBUM_SEARCH,
  TRACK_SEARCH,
} from "../../graphql/queries";

// Headless UI
import { Listbox, Transition } from "@headlessui/react";

// Heroicons
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// Compponents
import {
  Artist,
  LoadingArtist,
  Album,
  LoadingAlbum,
  Track,
  LoadingTrack,
} from "../../components";

const selections = [{ type: "artist" }, { type: "album" }, { type: "song" }];
const loadingList: Array<number> = new Array(10).fill(0);

const Home = () => {
  const [search, setSearch] = useState(""); // Sets the user's typed query
  const [selected, setSelected] = useState(selections[0]); // Sets the user's chosen search type
  const [dataShown, setDataShown] = useState(""); // Sets if the album or artist or track data should be shown
  const [cached, setCached] = useState<any>(null);

  // Lazy query (on button click).
  const [getArtist, artistResult] = useLazyQuery(ARTIST_SEARCH);
  const [getAlbum, albumResult] = useLazyQuery(ALBUM_SEARCH);
  const [getTrack, trackResult] = useLazyQuery(TRACK_SEARCH);

  const persistor = new CachePersistor({
    cache: client.cache,
    storage: window.localStorage,
  });

  useEffect(() => {
    // client.clearStore();
    // persistor.purge();

    // If the cache has an artist search
    if(Object.keys(client.cache.extract()).some(function(k){ return ~k.indexOf("Artist") })){
      // Turn the key/value object into an array of objects
      var dataArray = Object.keys(client.cache.extract()).map(function(k){return client.cache.extract()[k]});
      // Remove the root query entry
      dataArray.pop();
      setCached(dataArray);
      console.log(dataArray);
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    client.clearStore();
    persistor.purge();
    e.preventDefault();
    if (selected.type === "artist") {
      getArtist({ variables: { q: search, type: "ARTIST" } });
      setDataShown("artist");
    } else if (selected.type === "album") {
      getAlbum({ variables: { q: search, type: "ALBUM" } });
      setDataShown("album");
    } else if (selected.type === "song") {
      getTrack({ variables: { q: search, type: "TRACK" } });
      setDataShown("track");
    }
  }

  function selectedChoice(e: { type: string }) {
    setSelected(e);
  }

  return (
    <>
      <div className="flex flex-col m-4">
        <div className=" text-center mb-12">
          <h1>Buildify</h1>
          <p>Generate Spotify playlists with your favorite songs</p>
        </div>
        <form
          className="flex flex-col gap-4 items-center justify-center"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
        >
          <div className="flex flex-row gap-4 items-center">
            <p className=" whitespace-nowrap">I'm looking for an</p>
            <Listbox
              value={selected}
              onChange={(e: { type: string }) => selectedChoice(e)}
            >
              <div className="relative">
                <Listbox.Button className="relative w-[105px] cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left">
                  <span className="block truncate">{selected.type}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base">
                    {selections.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? " bg-emerald" : ""
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.type}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <p>named</p>
            <input
              type="text"
              placeholder={selected.type}
              className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-3 text-left focus:outline-none focus:ring-emerald focus:ring-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              value={search}
            ></input>
          </div>
          <button
            type="submit"
            value="Submit"
            className=" bg-emerald border-white border-2 rounded-md px-4 py-1 hover:bg-emerald-tint"
          >
            Go
          </button>
        </form>
        <div className="flex flex-col mx-12 gap-8 mt-8">
          {dataShown === "album"
            ? albumResult.data
              ? albumResult.data["search"]["albums"]["items"].map(
                  (album: any) => (
                    <Album
                      key={album["id"]}
                      name={album["name"]}
                      artist={album["artists"][0]["name"]}
                      image={
                        album["images"][0]
                          ? album["images"][0]["url"]
                          : "./user.svg"
                      }
                    />
                  )
                )
              : loadingList.map((number, index) => <LoadingAlbum key={index} />)
            : dataShown === "artist"
            ? artistResult.data
              ? artistResult.data["search"]["artists"]["items"].map(
                  (artist: any) => (
                    <Artist
                      key={artist["id"]}
                      name={artist["name"]}
                      tracks={
                        artist["top_tracks"].length > 2
                          ? [
                              artist["top_tracks"][0]["name"],
                              artist["top_tracks"][1]["name"],
                              artist["top_tracks"][2]["name"],
                            ]
                          : null
                      }
                      image={
                        artist["images"][0]
                          ? artist["images"][0]["url"]
                          : "./user.svg"
                      }
                    />
                  )
                )
              : loadingList.map((number, index) => <LoadingArtist key={index} />)
            : dataShown === "track"
            ? trackResult.data
              ? trackResult.data["search"]["tracks"]["items"].map(
                  (track: any) => (
                    <Track
                      key={track["id"]}
                      name={track["name"]}
                      artist={track["artists"][0]["name"]}
                      album={track["album"]["name"]}
                      image={
                        track["album"]["images"][0]
                          ? track["album"]["images"][0]["url"]
                          : "./user.svg"
                      }
                      preview={track["preview_url"]}
                    />
                  )
                )
              : loadingList.map((number, index) => <LoadingTrack key={index} />)
            : null}
            {cached? cached.map(
                  (artist: any) => (
                    <Artist
                      key={artist["id"]}
                      name={artist["name"]}
                      tracks={
                        artist["top_tracks"].length > 2
                          ? [
                              artist["top_tracks"][0]["name"],
                              artist["top_tracks"][1]["name"],
                              artist["top_tracks"][2]["name"],
                            ]
                          : null
                      }
                      image={
                        artist["images"][0]
                          ? artist["images"][0]["url"]
                          : "./user.svg"
                      }
                    />
                  )
                ) : null}
        </div>
      </div>
    </>
  );
};

export default Home;
