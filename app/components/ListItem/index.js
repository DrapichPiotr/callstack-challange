import React from 'react';

import styles from './styles.css';

function ListItem({
  className,
  item: { name, artists, album, vote },
  upVoteHandler,
  downVoteHandler,
}) {
  return (
    <li className={className || styles.item}>
      <div className={styles.itemContent}>
        <img src={album.images[2].url} alt={name} />
        <div>
          {name} -
          {artists ? artists.map((artist, index) =>
            <span key={index}>{`${artist.name}${index < artists.length - 1 ? ', ' : ''}`}</span>
            ) :
            <span>Unknown</span>
          }
        </div>
        <div>vote: {vote}</div>
        <div>
          <button onClick={() => upVoteHandler()}>UP</button>
          <button onClick={() => downVoteHandler()}>DOWN</button>
        </div>
      </div>
    </li>
  );
}

ListItem.propTypes = {
  className: React.PropTypes.string,
  item: React.PropTypes.object,
  upVoteHandler: React.PropTypes.func,
  downVoteHandler: React.PropTypes.func,
};

export default ListItem;
