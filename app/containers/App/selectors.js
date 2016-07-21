import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectSearchTracks = createSelector(
  selectGlobal,
  (globalState) => globalState.get('searchTracks')
);

const selectShowSearchList = createSelector(
  selectGlobal,
  (globalState) => globalState.get('showSearchList')
);

const selectPlaylist = createSelector(
  selectGlobal,
  (globalState) => globalState.get('playlist')
);

const selectTrackUrl = createSelector(
  selectGlobal,
  (globalState) => globalState.get('trackUrl')
);

const selectIsPlaying = createSelector(
  selectGlobal,
  (globalState) => globalState.get('isPlaying')
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  selectSearchTracks,
  selectShowSearchList,
  selectLocationState,
  selectPlaylist,
  selectTrackUrl,
  selectIsPlaying,
};
