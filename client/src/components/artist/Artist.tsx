import React from "react";

interface Artist {
  name: string;
  tracks: string[] | null;
  image: string;
}

const Artist = ({ name, tracks, image }: Artist) => {
  return (
    <div className=" flex flex-row gap-4">
      <div>
        <img src={image} className=" w-32 h-32 object-cover rounded-full"></img>
      </div>
      <div className="flex flex-col">
        <h2>{name}</h2>
        <ol type="1" className=" text-white pl-12" aria-label="mapped-tracks">
          {tracks
            ? tracks.map((track, index) => (
                <li key={track + index}>
                  <p>{track}</p>
                </li>
              ))
            : null}
        </ol>
      </div>
    </div>
  );
};

export default Artist;
