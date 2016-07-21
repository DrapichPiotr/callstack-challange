import { take, call, put } from 'redux-saga/effects';
import { LOAD_TRACKS } from 'containers/App/constants';
import { searchTracksLoaded, searchTracksLoadingError } from 'containers/App/actions';

import request from 'utils/request';

export function* getTracks() {
  while (true) {
    const { searchText } = yield take(LOAD_TRACKS);
    const requestURL = `https://api.spotify.com/v1/search?q=track:${searchText}&type=track&limit=10`;

    const tracks = yield call(request, requestURL);
    if (!tracks.err) {
      yield put(searchTracksLoaded(tracks.data.tracks.items));
    } else {
      yield put(searchTracksLoadingError(tracks.err));
    }
  }
}

export default [
  getTracks,
];
