import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import AlbumIcon from "@material-ui/icons/Album";
import MusicIcon from "@material-ui/icons/LibraryMusic";
import PlaylistIcon from "@material-ui/icons/QueueMusic";
import RecommendedIcon from "@material-ui/icons/Favorite";
import FavoriteIcon from "@material-ui/icons/Star";
import HistoryIcon from "@material-ui/icons/History";
import GenreIcon from "@material-ui/icons/Category";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";

const homeLink = props => <RouterLink to="/" {...props} />;
const songsLink = props => <RouterLink to="/songs" {...props} />;
const artistsLink = props => <RouterLink to="/artists" {...props} />;
const albumsLink = props => <RouterLink to="/albums" {...props} />;
const playlistLink = props => <RouterLink to="/playlists" {...props} />;
const userPlaylistLink = props => (
  <RouterLink to={`/userplaylists`} {...props} />
);
const recommendedLink = props => <RouterLink to={`/recommended`} {...props} />;
const favoriteLink = props => <RouterLink to={`/favorite`} {...props} />;
const likedHistoryLink = props => <RouterLink to="/history" {...props} />;
const genresLink = props => <RouterLink to="/genres" {...props} />;

export const mainListItems = (
  <div>
    <Link component={homeLink} color="inherit">
      <Tooltip title="Home" placement="right">
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link component={albumsLink} color="inherit">
      <Tooltip title="Albums" placement="right">
        <ListItem button>
          <ListItemIcon>
            <AlbumIcon />
          </ListItemIcon>
          <ListItemText primary="Albums" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link component={playlistLink} color="inherit">
      <Tooltip title="Playlists" placement="right">
        <ListItem button>
          <ListItemIcon>
            <PlaylistIcon />
          </ListItemIcon>
          <ListItemText primary="Playlists" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link component={artistsLink} color="inherit">
      <Tooltip title="Artists" placement="right">
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Artists" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link component={songsLink} color="inherit">
      <Tooltip title="Songs" placement="right">
        <ListItem button>
          <ListItemIcon>
            <MusicIcon />
          </ListItemIcon>
          <ListItemText primary="Songs" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link component={genresLink} color="inherit">
      <Tooltip title="Genres" placement="right">
        <ListItem button>
          <ListItemIcon>
            <GenreIcon />
          </ListItemIcon>
          <ListItemText primary="Genres" />
        </ListItem>
      </Tooltip>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>
      <strong>For You</strong>
    </ListSubheader>
    <Link component={userPlaylistLink} color="inherit">
      <Tooltip title="Your playlists" placement="right">
        <ListItem button>
          <ListItemIcon>
            <PlaylistIcon />
          </ListItemIcon>

          <ListItemText primary="Your playlists" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link component={recommendedLink} color="inherit">
      <Tooltip title="Recommended" placement="right">
        <ListItem button>
          <ListItemIcon>
            <RecommendedIcon />
          </ListItemIcon>
          <ListItemText primary="Recommended" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link component={favoriteLink} color="inherit">
      <Tooltip title="Favorites" placement="right">
        <ListItem button>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Favorites" />
        </ListItem>
      </Tooltip>
    </Link>
    <Link component={likedHistoryLink} color="inherit">
      <Tooltip title="History" placement="right">
        <ListItem button>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
      </Tooltip>
    </Link>
  </div>
);
