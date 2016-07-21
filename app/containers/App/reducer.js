import {
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
import { fromJS, List, Record } from 'immutable';

const initialState = fromJS({
  searchTracks: new List([]),
  showSearchList: false,
  playlist: new List([]),
  isPlaying: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRACKS_SUCCESS:
      return state
        .set('searchTracks', new List(action.searchTracks))
        .set('showSearchList', true);
    case LOAD_TRACKS_ERROR:
      return state
        .set('showSearchList', false);
    case TOGGLE_SEARCH_LIST:
      return state
        .set('showSearchList', action.isVisible);
    case ADD_TRACK_TO_PLAYLIST:
      {
        const trackUrl = (state.get('playlist').toJS().length === 0) ?
           action.track.preview_url : state.get('trackUrl');
        return state
          .set('playlist', state.get('playlist').push(new (Record({ ...action.track, vote: 0 })))) // eslint-disable-line new-cap
          .set('showSearchList', false)
          .set('trackUrl', trackUrl);
      }
    case UPVOTE_TRACK:
      {
        const { index } = action;
        const vote = state.getIn(['playlist', index]).get('vote') + 1;
        return index !== 0 || !state.get('isPlaying') ?
          state
            .set('playlist', state.get('playlist')
            .set(index, state.getIn(['playlist', index]).set('vote', vote))
            .sortBy((val) => -val.vote)
            .toList()) :
          state;
      }
    case DOWNVOTE_TRACK:
      {
        const { index } = action;
        const vote = state.getIn(['playlist', index]).get('vote') - 1;
        return index !== 0 || !state.get('isPlaying') ?
          state
            .set('playlist', state.get('playlist')
            .set(index, state.getIn(['playlist', index]).set('vote', vote))
            .sortBy((val) => -val.vote)
            .toList()) :
          state;
      }
    case PLAY_TRACK:
      return state.get('trackUrl') ?
        state
          .set('isPlaying', true) :
        state;
    case STOP_TRACK:
      return state
        .set('isPlaying', false);
    case NEXT_TRACK:
      {
        if (state.get('playlist').toJS().length > 1) {
          const trackUrl = state.get('playlist').toJS()[1].preview_url;
          return state
            .set('trackUrl', trackUrl)
            .set('playlist', state.get('playlist').delete(0));
        }
        return state
          .set('isPlaying', false);
      }
    case END_TRACK:
      {
        if (state.get('playlist').toJS().length > 1) {
          const trackUrl = state.get('playlist').toJS()[1].preview_url;
          return state
            .set('trackUrl', trackUrl)
            .set('playlist', state.get('playlist').delete(0));
        }
        return state
          .set('trackUrl', null)
          .set('playlist', state.get('playlist').delete(0))
          .set('isPlaying', false);
      }
    default:
      return state;
  }
}

export default appReducer;
