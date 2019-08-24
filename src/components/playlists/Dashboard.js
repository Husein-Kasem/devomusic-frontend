import React, { Fragment } from "react";
import PlaylistForm from "./PlaylistForm";
import Playlists from "./Playlists";

export default function Dashboard() {
  return (
    <Fragment>
      <PlaylistForm />
      <Playlists />
    </Fragment>
  );
}
