import React from 'react';
import { connect } from 'react-redux';


import {
  selectSearchTracks,
  selectShowSearchList,
  selectPlaylist,
  selectTrackUrl,
  selectIsPlaying,
} from 'containers/App/selectors';

import {
  loadSearchTracks,
  toggleSearchList,
  addTrackToPlaylist,
  upVoteTrack,
  downVoteTrack,
  playTrack,
  stopTrack,
  nextTrack,
  endTrack,
 } from '../App/actions';

import SearchInput from 'components/SearchInput';
import List from 'components/List';
import ListItem from 'components/ListItem';
import Controls from 'components/PlayControls';

import styles from './styles.css';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      searchTracks,
      onChangeSearch,
      showSearchList,
      onAddTrackToPlaylist,
      playlist,
      upVoteHandler,
      downVoteHandler,
      handleClickPlay,
      trackUrl,
      isPlaying,
      handleClickStop,
      handleClickNext,
      onTrackEnded,
    } = this.props;
    return (
      <article>
        <div>
          <section className={styles.textSection}>
            <SearchInput
              searchInputHandler={onChangeSearch}
              searchItemClickHandler={onAddTrackToPlaylist}
              searchTracks={searchTracks}
              showSearchList={showSearchList}
            />
          </section>
          <section>
            <Controls
              handleClickPlay={handleClickPlay}
              trackUrl={trackUrl}
              isPlaying={isPlaying}
              handleClickStop={handleClickStop}
              handleClickNext={handleClickNext}
              onTrackEnded={onTrackEnded}
            />
          </section>
          <section>
            <List
              ComponentToRender={ListItem}
              items={playlist}
              downVoteHandler={downVoteHandler}
              upVoteHandler={upVoteHandler}
            />
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  searchTracks: React.PropTypes.object,
  onChangeSearch: React.PropTypes.func,
  showSearchList: React.PropTypes.bool,
  playlist: React.PropTypes.object,
  onAddTrackToPlaylist: React.PropTypes.func,
  upVoteHandler: React.PropTypes.func,
  downVoteHandler: React.PropTypes.func,
  handleClickPlay: React.PropTypes.func,
  handleClickStop: React.PropTypes.func,
  handleClickNext: React.PropTypes.func,
  trackUrl: React.PropTypes.string,
  isPlaying: React.PropTypes.bool,
  onTrackEnded: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeSearch: (evt) => {
      if (evt.length > 0) dispatch(loadSearchTracks(evt));
      else dispatch(toggleSearchList(false));
    },
    onAddTrackToPlaylist: (index) => {
      dispatch(addTrackToPlaylist(index));
    },
    upVoteHandler: (index) => {
      dispatch(upVoteTrack(index));
    },
    downVoteHandler: (index) => {
      dispatch(downVoteTrack(index));
    },
    handleClickPlay: () => {
      dispatch(playTrack());
    },
    handleClickStop: () => {
      dispatch(stopTrack());
    },
    handleClickNext: () => {
      dispatch(nextTrack());
    },
    onTrackEnded: () => {
      dispatch(endTrack());
    },
    dispatch,
  };
}

const mapStateToProps = (state) => ({
  searchTracks: selectSearchTracks(state),
  showSearchList: selectShowSearchList(state),
  playlist: selectPlaylist(state),
  trackUrl: selectTrackUrl(state),
  isPlaying: selectIsPlaying(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
