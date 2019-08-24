import React, { Component } from "react";
import Player from "react-jinke-music-player";
import FaHeadphones from "react-icons/lib/fa/headphones";
import {
  playSong,
  playSongAndKeepQueue,
  stopSong,
  pauseSong
} from "../../actions/musicPlayer";
import { addSongToHistory } from "../../actions/history";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import "./styles/musicPlayer.css";
import { createMessage } from "../../actions/messages";
import { DEMO_PERIODE } from "../../constants";

const styles = theme => ({});

class MusicPlayer extends Component {
  state = {
    params: {},
    playlist: [],
    playingSong: {}
  };

  componentDidMount() {
    this.setState({
      params: {
        //audio lists model
        audioLists: [],
        //default play index of the audio player  [type `number` default `0`]
        defaultPlayIndex: 0,

        //if you want dynamic change current play audio you can change it [type `number` default `0`]
        // playIndex: 0,

        //color of the music player theme    [ type `string: 'light' or 'dark'  ` default 'dark' ]
        theme: "dark",

        // Specifies movement boundaries. Accepted values:
        // - `parent` restricts movement within the node's offsetParent
        //    (nearest node with position relative or absolute), or
        // - a selector, restricts movement within the targeted node
        // - An object with `left, top, right, and bottom` properties.
        //   These indicate how far in each direction the draggable
        //   can be moved.
        bounds: "body",

        //Whether to load audio immediately after the page loads.  [type `Boolean | String`, default `false`]
        //"auto|metadata|none" "true| false"
        preload: false,

        //Whether the player's background displays frosted glass effect  [type `Boolean`, default `false`]
        glassBg: false,

        //The next time you access the player, do you keep the last state  [type `Boolean` default `false`]
        remember: false,

        //The Audio Can be deleted  [type `Boolean`, default `true`]
        remove: true,

        //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
        defaultPosition: {
          top: 300,
          left: 120
        },

        // play mode text config of the audio player
        playModeText: {
          order: "order",
          orderLoop: "all loop",
          singleLoop: "single loop",
          shufflePlay: "shuffle"
        },

        //audio controller open text  [ type `String | ReactNode` default 'open']
        openText: "Expand",

        //audio controller close text  [ type `String | ReactNode` default 'close']
        closeText: "Minimize",

        //audio theme switch checkedText  [ type `String | ReactNode` default '-']
        checkedText: "D",

        //audio theme switch unCheckedText [ type `String | ReactNode` default '-']
        unCheckedText: "L",

        // audio list panel show text of the playlist has no songs [ type `String` | ReactNode  default 'no music']
        notContentText: "no music",

        panelTitle: "DevoMusic",

        defaultPlayMode: "order",

        //audio mode        mini | full          [type `String`  default `mini`]
        mode: "full",

        /**
         * [ type `Boolean` default 'false' ]
         * The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
         */
        once: false,

        //Whether the audio is played after loading is completed. [type `Boolean` default 'true']
        autoPlay: true,

        //Whether you can switch between two modes, full => mini  or mini => full   [type 'Boolean' default 'true']
        toggleMode: true,

        //audio cover is show of the "mini" mode [type `Boolean` default 'true']
        showMiniModeCover: true,

        //audio playing progress is show of the "mini"  mode
        showMiniProcessBar: false,

        //audio controller is can be drag of the "mini" mode     [type `Boolean` default `true`]
        drag: true,

        //drag the audio progress bar [type `Boolean` default `true`]
        seeked: true,

        //audio controller title [type `String | ReactNode`  default <FaHeadphones/>]
        controllerTitle: <FaHeadphones />,

        //Displays the audio load progress bar.  [type `Boolean` default `true`]
        showProgressLoadBar: true,

        //play button display of the audio player panel   [type `Boolean` default `true`]
        showPlay: true,

        //reload button display of the audio player panel   [type `Boolean` default `true`]
        showReload: false,

        //download button display of the audio player panel   [type `Boolean` default `true`]
        showDownload: true,

        //loop button display of the audio player panel   [type `Boolean` default `true`]
        showPlayMode: true,

        //theme toggle switch  display of the audio player panel   [type `Boolean` default `true`]
        showThemeSwitch: true,

        //Extensible custom content       [type 'Array' default '[]' ]
        extendsContent: [],

        //default volume of the audio player [type `Number` default `100` range `0-100`]
        defaultVolume: 70,

        //playModeText show time [type `Number(ms)` default `700`]
        playModeShowTime: 600,

        //Whether to try playing the next audio when the current audio playback fails [type `Boolean` default `true`]
        loadAudioErrorPlayNext: true,

        //Music is downloaded handle
        onAudioDownload(audioInfo) {
          //console.log("audio download", audioInfo);
        },

        //audio play handle
        onAudioPlay(audioInfo) {
          //console.log("audio playing", audioInfo); // <<<<<<<<<<<<<<<<<< needed
        },

        //audio pause handle
        onAudioPause(audioInfo) {
          //console.log("audio pause", audioInfo); // <<<<<<<<<<<<<<<<<< needed
        },

        //When the user has moved/jumped to a new location in audio
        onAudioSeeked(audioInfo) {
          //console.log("audio seeked", audioInfo);
        },

        //When the volume has changed  min = 0.0  max = 1.0
        onAudioVolumeChange(currentVolume) {
          console.log("audio volume change", currentVolume);
        },

        //The single song is ended handle
        onAudioEnded(audioInfo) {
          console.log("audio ended", audioInfo); // <<<<<<<<<<<<<<<<<< needed
        },

        //audio load abort The target event like {...,audioName:xx,audioSrc:xx,playMode:xx}
        onAudioAbort(e) {
          console.log("audio abort", e); // <<<<<<<<<<<<<<<<<< maybe needed
        },

        //audio play progress handle
        onAudioProgress(audioInfo) {
          //console.log("audio progress", audioInfo);
          // console.log(this);
        },

        //audio reload handle
        onAudioReload(audioInfo) {
          // console.log("audio reload:", audioInfo);
        },

        //audio load failed error handle
        onAudioLoadError(e) {
          // console.log("audio load err", e);
        },

        //theme change handle
        onThemeChange(theme) {
          // console.log("theme change:", theme);
        },

        onAudioListsChange(currentPlayId, audioLists, audioInfo) {
          // console.log("[currentPlayId] audio lists change:", currentPlayId);
          // console.log("[audioLists] audio lists change:", audioLists);
          // console.log("[audioInfo] audio lists change:", audioInfo);
        },

        onAudioPlayTrackChange(currentPlayId, audioLists, audioInfo) {
          // console.log(
          //   "audio play track change:",
          //   currentPlayId,
          //   audioLists,
          //   audioInfo
          // );
        },

        onPlayModeChange(playMode) {
          // console.log("play mode change:", playMode);
        },

        onModeChange(mode) {
          // console.log("mode change:", mode);
        },

        onAudioListsPanelChange(panelVisible) {
          // console.log("audio lists panel visible:", panelVisible);
        },

        onAudioListsDragEnd(fromIndex, endIndex) {
          // console.log("audio lists drag end:", fromIndex, endIndex);
        }
      }
    });
  }

  rerenderPlaylist(newAudioList) {
    console.log("rerendering the playlist");
    const newParams = {
      ...this.state.params,
      audioList: newAudioList
    };
    this.setState({
      params: newParams
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.playerQueue !== nextProps.playerQueue) {
  //     this.setState({
  //       playlist: nextProps.playerQueue
  //     });
  //     this.rerenderPlaylist(nextProps.playerQueue);
  //     this.forceUpdate();
  //   }
  // }

  render() {
    const { params } = this.state;
    params.audioLists = this.props.playerQueue;

    params.onAudioPause = () => {
      this.props.pauseSong();
    };

    params.onAudioPlay = () => {
      this.props.playSong(this.props.playingSong);
    };

    params.onAudioListsChange = (currentPlayId, audioLists, audioInfo) => {
      if (audioLists !== params.audioLists) {
        //console.log(audioLists);
        //this.props.stopSong();
        this.rerenderPlaylist(audioLists);
        //this.props.playSong(audioLists[0]);
      }
      params.defaultPlayIndex = audioLists[0].id;
    };

    params.onAudioProgress = audioInfo => {
      if (!this.props.isAuthenticated) {
        if (audioInfo.currentTime > DEMO_PERIODE) {
          this.props.stopSong();
          this.props.createMessage(
            "Please sign in to be able to listen to the full song"
          );
        }
      }
    };

    params.onAudioPlayTrackChange = (currentPlayId, audioLists, audioInfo) => {
      console.log("play track changed ");
      console.log(currentPlayId);
      console.log(
        "audio play track change:",
        currentPlayId,
        audioLists,
        audioInfo
      );
      params.defaultPlayIndex = audioLists[0].id;
    };

    return this.props.playingSong.musicSrc !== undefined ? (
      <div>
        <Player {...params} />
      </div>
    ) : (
      ""
    );
  }
}

MusicPlayer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isPlaying: state.musicPlayer.isPlaying,
  playingSong: state.musicPlayer.playingSong,
  playerQueue: state.musicPlayer.playerQueue,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    playSong,
    stopSong,
    pauseSong,
    createMessage,
    addSongToHistory,
    playSongAndKeepQueue
  }
)(withStyles(styles, { withTheme: true })(MusicPlayer));
