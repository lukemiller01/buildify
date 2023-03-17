import React from "react";

interface Album {
  name: string;
  artist: string;
  image: string;
}

const Album = ({ name, artist, image }: Album) => {
  return (
    <div className=" flex flex-row gap-4">
      <div>
        <img src={image} className=" w-32 h-32 object-cover"></img>
      </div>
      <div className="flex flex-col">
        <h2>{name}</h2>
        <p>{artist}</p>
      </div>
    </div>
  );
};

export default Album;