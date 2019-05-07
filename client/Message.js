import React from 'react';
import styles from './MessageList.css';

const Message = props => (
    <div className={styles.MessageList}>
        <div className={styles.Content}>
            <p className={styles.User}>{props.from}</p>
            <p className={styles.Message}>{props.text}</p>
        </div>
    </div>
);

export default Message;