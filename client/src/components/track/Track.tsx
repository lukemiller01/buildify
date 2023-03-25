import { useState, useRef } from "react";

// Style
import './playStyle.css'

// Hericons
import { PlayIcon } from "@heroicons/react/24/outline";
import { PauseIcon } from "@heroicons/react/20/solid";
import { useSong } from "../../context/SongProvider";

interface Track {
  name: string;
  artist: string;
  album: string;
  image: string;
  preview: string;
}

// Sets type for SongContextProvider
interface ContextObject {
  song: HTMLAudioElement | undefined
  setSong: (newSong: HTMLAudioElement) => void
  pauseSong: () => void
}

// TODO: multiple clicks on pause/play button highlights text. Temporary fix is to remove user selection from text. Still want users to be able to highlight items.

const Track = ({ name, artist, album, image, preview }: Track) => {
  const [audioAction, setAudioAction] = useState(true); // If the audio is playing or not
  const audioRef = useRef<HTMLAudioElement>(null); // Keep audio reference between renders

  const { setSong, pauseSong }: ContextObject = useSong(); // Setting the song if user clicks play. Pausing song if user clicks pause.

  const startAudio = () => {
    if(audioRef.current) {
      audioRef.current.currentTime = 0; // Resets the time on eveery play
      setSong(audioRef.current); // Setting the song using context
      setAudioAction(false); // Show the pause button
    }
  };

  const pauseAudio = () => {
    pauseSong(); // Pause the song
    setAudioAction(true); // Show the play button
  };

  const reset = () => {
    setAudioAction(true); // Show the play button
  };

  return (
    <div className=" flex flex-row gap-4">
      <div>
        <div
          className={`w-32 h-32 bg-cover bg-center`}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className={`h-full flex justify-center items-center backdrop-brightness-50 opacity-0 hover:opacity-100 ${audioAction ? '' : 'track__playing'}`}>
            <PlayIcon
              className="w-12 h-12 text-white cursor-pointer"
              onClick={startAudio}
              style={audioAction ? { display: "block" } : { display: "none" }}
              aria-label="play-icon"
            />
            <PauseIcon
              className="w-12 h-12 text-white cursor-pointer"
              onClick={pauseAudio}
              style={audioAction ? { display: "none" } : { display: "block" }}
              aria-label="pause-icon"
            />
            <audio ref={audioRef} src={preview} loop onPause={() => reset()} aria-label="audio-element" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className=" select-none">{name}</h2>
        <p className=" select-none">{artist}</p>
        <p className=" select-none">{album}</p>
      </div>
    </div>
  );
};

export default Track;
