import { useState, createContext, useContext } from "react";

export const SongContext = createContext();

export function useSong() {
  return useContext(SongContext);
}

export function SongContextProvider({ children }: any) {
  const [song, _setSong] = useState<HTMLAudioElement>();

  const setSong = (newSong: HTMLAudioElement) => {
    if(song) {
      song.pause();
    }
    newSong.play();
    _setSong(newSong);
  }

  const pauseSong = () => {
    if(song) {
      song.pause();
    }
  };

  return (
    <SongContext.Provider
      value={{ song, setSong, pauseSong}}
    >
      {children}
    </SongContext.Provider>
  );
}
