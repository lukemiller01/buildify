import { Home } from "../src/pages";
import { render, fireEvent, renderHook, getAllByRole, waitFor, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { ALBUM_SEARCH } from "../src/graphql/queries";
import { SongContextProvider, useSong } from "../src/context/SongProvider";
import { Album, Artist, LoadingAlbum, LoadingArtist, LoadingTrack, Track } from "../src/components";
import { useState } from "react";
import App from "../src/App";
import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom";
import React from "react";

const mocks = [
  {
    request: {
      query: ALBUM_SEARCH,
      variables: {
        name: "DAMN",
      },
    },
    result: {
      data: {
        data: {
          search: {
            albums: {
              items: [
                {
                  name: "Being So Normal",
                },
                {
                  name: "Songs About Being Alone",
                },
              ],
            },
          },
        },
      },
    },
  },
];

// window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
// window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
// window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
// window.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ };

describe("Front End", () => {
  it("renders app", () => {
    render(
      <SongContextProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <App/>
        </MockedProvider>
      </SongContextProvider>
    );
  });

  it('Handles song playing/pausing', () => {
    const { getAllByLabelText } = render(
      <SongContextProvider>
        <Track name="alright" artist="kendrick lamar" image="https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1" preview="https://p.scdn.co/mp3-preview/4b5c9d0de5c6c7643ca1d7a488e8b1d8afec1b4e?cid=171cc7d9fcef4930b9190a47fae2c132" album="To Pimp A Butterfly"/>
        <Track name="alright" artist="kendrick lamar" image="https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1" preview="https://p.scdn.co/mp3-preview/4b5c9d0de5c6c7643ca1d7a488e8b1d8afec1b4e?cid=171cc7d9fcef4930b9190a47fae2c132" album="To Pimp A Butterfly"/>
      </SongContextProvider>
    );

    // Make sure the play button works
    expect(getAllByLabelText('play-icon')[0]).toBeTruthy();
    fireEvent.click(getAllByLabelText('play-icon')[0]);

    // Make sure the pause button works
    expect(getAllByLabelText('pause-icon')[0]).toBeTruthy();
    fireEvent.click(getAllByLabelText('pause-icon')[0]);

    // Make sure the audio element function works
    expect(getAllByLabelText('audio-element')[0]).toBeTruthy();
    fireEvent.pause(getAllByLabelText('audio-element')[0]);

    // Make sure the context provider handles song state
    expect(getAllByLabelText('play-icon')[0]).toBeTruthy();
    fireEvent.click(getAllByLabelText('play-icon')[0]);
    expect(getAllByLabelText('play-icon')[1]).toBeTruthy();
    fireEvent.click(getAllByLabelText('play-icon')[1]);
  });

  it("renders skeletons and data", () => {
    render(
      <>
      <LoadingAlbum/>
      <LoadingArtist/>
      <LoadingTrack/>
      <LoadingAlbum/>
      <Artist name="kendrick lamar" tracks={["Money Trees", "All The Stars (with SZA)", "family ties (with Kendrick Lamar)"]} image="https://i.scdn.co/image/ab6761610000e5eb437b9e2a82505b3d93ff1022" />
      <Album name="To Pimp A Butterfly" artist="Kendrick Lamar" image="https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1"/>
      </>
    );
  });

  it("can render an empty array", () => {
    const { getByLabelText, getAllByLabelText, getAllByRole } = render(
      <Artist name="kendrick lamar" tracks={null} image="https://i.scdn.co/image/ab6761610000e5eb437b9e2a82505b3d93ff1022" />
    );
  });
});
