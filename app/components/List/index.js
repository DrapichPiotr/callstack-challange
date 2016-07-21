import React from 'react';

import styles from './styles.css';

function List({
  ComponentToRender,
  items,
  upVoteHandler,
  downVoteHandler,
}) {
  return (
    <div className={styles.listWrapper}>
      <ul className={styles.list}>
        {items ?
          items.map((item, index) => (
            <ComponentToRender
              key={`item-${index}`}
              item={item.toJS()}
              downVoteHandler={() => downVoteHandler(index)}
              upVoteHandler={() => upVoteHandler(index)}
            />
          )) :
          <ComponentToRender />
        }
      </ul>
    </div>
  );
}

List.propTypes = {
  ComponentToRender: React.PropTypes.func.isRequired,
  items: React.PropTypes.object,
  upVoteHandler: React.PropTypes.func,
  downVoteHandler: React.PropTypes.func,
};

export default List;
