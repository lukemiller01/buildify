import { useState, useRef, useEffect } from "react";

// Hericons
import { PlayIcon } from "@heroicons/react/24/outline";
import { PauseIcon } from "@heroicons/react/20/solid";

interface Track {
  name: string;
  artist: string;
  album: string;
  image: string;
  preview: string;
}

// TODO: multiple clicks on pause/play button highlights text. Temporary fix is to remove user selection from text. Still want users to be able to highlight items.

const Track = ({ name, artist, album, image, preview }: Track) => {
  const [audioAction, setAudioAction] = useState(true); // If the audio is playing or not
  const audioRef = useRef<HTMLAudioElement>(null); // Keep audio reference between renders

  const startAudio = () => {
    if (audioRef.current !== null) {
      audioRef.current.play();
    }
    setAudioAction(false);
  };

  const pauseAudio = () => {
    if (audioRef.current !== null) {
      audioRef.current.pause();
    }
    setAudioAction(true);
  };

  return (
    <div className=" flex flex-row gap-4">
      <div>
        <div
          className={`w-32 h-32 bg-cover bg-center`}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="h-full flex justify-center items-center backdrop-brightness-50 opacity-0 hover:opacity-100">
            <PlayIcon
              className="w-12 h-12 text-white"
              onClick={startAudio}
              style={audioAction ? { display: "block" } : { display: "none" }}
            />
            <PauseIcon
              className="w-12 h-12 text-white"
              onClick={pauseAudio}
              style={audioAction ? { display: "none" } : { display: "block" }}
            />
            <audio ref={audioRef} src={preview} loop />
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
