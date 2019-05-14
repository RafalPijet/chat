import React from 'react';
import styles from './MessageList.css';

class Message extends React.Component {

    render() {
        return this.props.isRight ? this.MessageRight() : this.MessageLeft();
    }

    MessageLeft() {
        return (
            <div className={styles.MessageListLeft}>
                <div className={styles.Content}>
                    <p className={styles.UserLeft}>{this.props.from}</p>
                    <p className={styles.MessageLeft}>{this.props.text}</p>
                </div>
            </div>
        )
    }

    MessageRight() {
        return (
            <div className={styles.MessageListRight}>
                <div className={styles.Content}>
                    <p className={styles.MessageRight}>{this.props.text}</p>
                    <p className={styles.UserRight}>{this.props.from}</p>
                </div>
            </div>
        )
    }
}

export default Message;