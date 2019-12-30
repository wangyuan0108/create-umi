import React from 'react';
<% if (isStyle === 'css') {%> import styles from './index.css';<%}%>
<% if (isStyle === 'scss') {%> import styles from './index.scss';<%}%>
<% if (isStyle === 'less') {%> import styles from './index.less';<%}%>

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
