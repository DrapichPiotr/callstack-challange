import {
  LOAD_TRACKS,
  LOAD_TRACKS_SUCCESS,
  LOAD_TRACKS_ERROR,
  TOGGLE_SEARCH_LIST,
  ADD_TRACK_TO_PLAYLIST,
  UPVOTE_TRACK,
  DOWNVOTE_TRACK,
  PLAY_TRACK,
  STOP_TRACK,
  NEXT_TRACK,
  END_TRACK,
} from './constants';

export function loadSearchTracks(searchText) {
  return {
    type: LOAD_TRACKS,
    searchText,
  };
}

export function searchTracksLoaded(searchTracks) {
  return {
    type: LOAD_TRACKS_SUCCESS,
    searchTracks,
  };
}

export function searchTracksLoadingError(error) {
  return {
    type: LOAD_TRACKS_ERROR,
    error,
  };
}

export function toggleSearchList(isVisible) {
  return {
    type: TOGGLE_SEARCH_LIST,
    isVisible,
  };
}

export function addTrackToPlaylist(track) {
  return {
    type: ADD_TRACK_TO_PLAYLIST,
    track,
  };
}

export function upVoteTrack(index) {
  return {
    type: UPVOTE_TRACK,
    index,
  };
}

export function downVoteTrack(index) {
  return {
    type: DOWNVOTE_TRACK,
    index,
  };
}

export function playTrack() {
  return {
    type: PLAY_TRACK,
  };
}

export function stopTrack() {
  return {
    type: STOP_TRACK,
  };
}

export function nextTrack() {
  return {
    type: NEXT_TRACK,
  };
}

export function endTrack() {
  return {
    type: END_TRACK,
  };
}
