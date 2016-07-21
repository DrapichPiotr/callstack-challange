import React from 'react';
import 'sanitize.css/sanitize.css';

import styles from './styles.css';

function App(props) {
  return (
    <div className={styles.wrapper}>
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
