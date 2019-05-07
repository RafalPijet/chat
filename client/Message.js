import React from 'react';
import styles from './MessageList.css';

const Message = props => (
    <div className={styles.MessageList}>
        <strong>{props.from} :</strong>
        <span>{props.text}</span>
    </div>
);

export default Message;