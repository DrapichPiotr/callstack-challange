import React from 'react';


export class PlayControls extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.trackUrl !== this.props.trackUrl ||
    nextProps.isPlaying !== this.props.isPlaying;
  }

  componentDidUpdate(prevProps) {
    if (this.props.trackUrl && prevProps.isPlaying) {
      this.refs.player.play();
    }
    if (!this.props.isPlaying) {
      this.refs.player.pause();
    } else {
      this.refs.player.play();
    }
  }

  render() {
    const {
      trackUrl,
      handleClickPlay,
      handleClickStop,
      handleClickNext,
      onTrackEnded,
      isPlaying,
    } = this.props;

    return (
      <div>
        <button disabled={isPlaying} onClick={handleClickPlay} >START</button>
        <button disabled={!isPlaying} onClick={handleClickStop}>STOP</button>
        <button onClick={handleClickNext}>NEXT</button>
        <audio
          ref="player"
          src={trackUrl}
          onEnded={onTrackEnded}
        />
      </div>
    );
  }
}

PlayControls.propTypes = {
  trackUrl: React.PropTypes.string,
  handleClickPlay: React.PropTypes.func,
  handleClickStop: React.PropTypes.func,
  handleClickNext: React.PropTypes.func,
  onTrackEnded: React.PropTypes.func,
  isPlaying: React.PropTypes.bool,
};

export default PlayControls;
