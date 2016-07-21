import React from 'react';
import styles from './styles.css';

export class SearchInput extends React.Component {

  renderSearchList(items) {
    const { searchItemClickHandler } = this.props;
    return (
      <ul>
        {
          items.map((item, index) => (
            <li
              key={index}
              onClick={() => searchItemClickHandler(item)}
            >
              {item.name} -
              {item.artists.map(({ name }) => ` ${name}${index < item.artists.length - 1 ? ',' : ''}`)}
            </li>
          ))
        }
      </ul>
    );
  }

  render() {
    const { searchTracks, searchInputHandler, showSearchList } = this.props;
    return (
      <div className={styles.inputnWrapper}>
        <input
          className={styles.searchInput}
          placeholder="Search track"
          onChange={({ target: { value } }) => searchInputHandler(value)}
        />
        {searchTracks && showSearchList && this.renderSearchList(searchTracks.toJS())}
      </div>
    );
  }
}

SearchInput.propTypes = {
  searchInputHandler: React.PropTypes.func,
  searchItemClickHandler: React.PropTypes.func,
  showSearchList: React.PropTypes.bool,
  searchTracks: React.PropTypes.object,
};

export default SearchInput;
