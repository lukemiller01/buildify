import { useState, createContext, useContext } from "react";

// Sets type for SongContextProvider
interface ContextObject {
  song: HTMLAudioElement | undefined
  setSong: (newSong: HTMLAudioElement) => void
  pauseSong: () => void
}

// Creates new instance of SongCotnext
export const SongContext = createContext({} as ContextObject);

// useSong hook to use the context
export function useSong() {
  return useContext(SongContext);
}

// SongContextProvider contains set song, pause song
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
