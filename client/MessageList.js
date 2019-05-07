import React from 'react';
import styles from './MessageList.css';
import Message from './Message';

const MessageList = props => (
    <div className={styles.MessageList}>
        {
            props.messages.map((message, i) => {
                return (
                    <Message key={i} from={message.from} text={message.text}/>
                );
            })
        }
    </div>
);

export default MessageList;