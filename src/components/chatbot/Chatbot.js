import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Preloader from "../common/Preloader";
import { Link as RouterLink } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";

import {
  loadProfileSongCount,
  loadProfileAlbumCount
} from "../../actions/profile";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";

import React, { Component } from "react";
import ChatBot, { Loading } from "react-simple-chatbot";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: "",
      trigger: false
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, result } = this.state;
    const { steps } = this.props;
    const search = steps.search.value;

    return (
      <div>
        {<Redirect to={`/search/${search}`} />}
        {
          <div
            style={{
              textAlign: "center",
              marginTop: 20
            }}
          >
            {!trigger && (
              <button onClick={() => this.triggetNext()}>Search Again</button>
            )}
          </div>
        }
      </div>
    );
  }
}

//import Tooltip from "@material-ui/core/Tooltip"; // for later to have better affordance

// this could be placed in render so it can be chenged dynamically
//History component for the history page

const styles = theme => ({
  shiftForDrawerOpen: {
    marginLeft: SHIFT_WHEN_DRAWER_OPEN,
    width: `calc(100% - ${SHIFT_WHEN_DRAWER_OPEN}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  shiftForDrawerClosed: {
    marginLeft: SHIFT_WHEN_DRAWER_CLOSE,
    width: `calc(100% - ${SHIFT_WHEN_DRAWER_CLOSE}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 2}px 0`
  },
  bottom20: {
    bottom: "100px"
  }
});

const chatbotTheme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#1c54b2",
  headerFontColor: "#fff",
  headerFontSize: "15px"
  //botBubbleColor: "#EF6C00",
  //botFontColor: "#fff",
  //userBubbleColor: "#fff",
  //userFontColor: "#4a4a4a"
};
export class Chatbot extends React.Component {
  componentDidMount() {
    const user = this.props.user;
    if (user) {
      const userId = this.props.user.id;
      this.props.loadProfileSongCount(userId);
      this.props.loadProfileAlbumCount(userId);
    }
  }

  makeSearchResultLink(searchTerm) {
    const searchLink = props => (
      <RouterLink to={`/search/${searchTerm}`} {...props} />
    );
    return searchLink;
  }

  componentWillReceiveProps = nextProps => {
    const userId = this.props.userId;
    if (userId !== nextProps.userId) {
      this.props.loadProfileSongCount(userId);

      this.props.loadProfileAlbumCount(userId);
    }
  };

  render() {
    const {
      isAlbumCountLoading,
      isSongsLoading,
      classes,
      songCount,
      albumCount
    } = this.props;
    const steps = [
      {
        id: "1",
        message: "Hello, can I help you?",
        trigger: "2"
      },
      {
        id: "2",
        options: [
          {
            value: 1,
            label: "Yes",
            trigger: "4"
          },
          {
            value: 2,
            label: "No",
            trigger: "3"
          }
        ]
      },
      /*{
    id: "2",
    options: [
      {
        value: 1,
        label: "How many albums have I listened to?",
        trigger: "4"
      },
      {
        value: 2,
        label: "How many songs have I listened to?",
        trigger: "3"
      }
    ]
  } ,{
    id: "3",
    message: ` you have listened to ${songCount} song(s)`,
    trigger: "5"
  }*/
      {
        id: "3",
        message: "Alright! Thank you and have a nice day",
        end: true
      },
      {
        id: "4",
        message: "In which category do yo need help?",
        trigger: "6"
      },
      {
        id: "8",
        message: `you have listened to ${songCount} song(s)`,
        trigger: "1"
      },
      {
        id: "10",
        message: `you have listened to ${albumCount} song(s)`,
        trigger: "1"
      },

      {
        id: "13",
        message: "we have redirected you to the page with your search results"
      },
      {
        id: "9",
        options: [
          {
            value: 1,
            label: "How many albums did you discover ?",
            trigger: "10"
          },
          {
            value: 2,
            label: "Search an album!",
            trigger: "3"
          }
        ]
      },
      {
        id: "7",
        options: [
          {
            value: 1,
            label: "How many songs did you listen to?",
            trigger: "8"
          },
          {
            value: 2,
            label: "Search a song or artist!",
            trigger: "11"
          }
        ]
      },
      {
        id: "11",
        message: "Type something to search for. (Ex.: Damso)",
        trigger: "search"
      },
      {
        id: "search",
        user: true,
        trigger: "12"
      },
      {
        id: "12",
        component: <Search />,
        waitAction: true,
        trigger: "1"
      },
      {
        id: "6",
        options: [
          {
            value: 1,
            label: "song",
            trigger: "7"
          },
          {
            value: 2,
            label: "album",
            trigger: "9"
          }
        ]
      }
    ];

    if (isSongsLoading || isAlbumCountLoading) {
      return <Preloader />;
    } else {
      return (
        <ThemeProvider theme={chatbotTheme}>
          <ChatBot floating={true} steps={steps} style={{ bottom: "100px" }} />
        </ThemeProvider>
      );
    }
  }
}

Chatbot.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  songs: state.history.data,
  isSongsLoading: state.history.isLoading,
  isDrawerOpen: state.drawer.isDrawerOpen,
  user: state.auth.user,
  token: state.auth.token,
  songCount: state.profile.numberOfSongs,
  isCountLoading: state.profile.isCountLoading,
  albumCount: state.profile.numberOfAlbums,
  isAlbumCountLoading: state.profile.isAlbumCountLoading
});

export default connect(
  mapStateToProps,
  {
    loadProfileSongCount,
    loadProfileAlbumCount
  }
)(withStyles(styles, { withTheme: true })(Chatbot));
