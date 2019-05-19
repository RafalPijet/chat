import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import io from 'socket.io-client';
import styles from './App.css';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('/');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            messages: [],
            text: '',
            name: '',
            check: true
        }
    }

    componentDidMount() {
        socket.on('message', message => this.messageReceive(message));
        socket.on('update', ({users}) => this.chatUpdate(users));
        socket.on('check', ({check}) => this.setState({check}));
    }

    messageReceive(message) {
        const messages = [message, ...this.state.messages];
        this.setState({messages});
    }

    chatUpdate(users) {
        this.setState({users});
    }

    handleMessageSubmit(message) {
        const messages = [message, ...this.state.messages];
        this.setState({messages});
        socket.emit('message', message);
    }

    handleUserSubmit(name) {
        socket.emit('ask');
        socket.on('answer', users => {

            if (users.length > 0) {
                users.map(user => {

                    if (user.name !== this.state.name && this.state.check && user.name === name) {
                        let newName = name + Math.floor(Math.random() * 1000);
                        this.setState({
                            name: newName,
                            check: false
                        });
                    } else if (this.state.check) {
                        this.setState({
                            name,
                            check: false
                        });
                    }
                });
            } else {
                this.setState({name});
            }
        });
        setTimeout(() => socket.emit('join', this.state.name), 1);
    }

    render() {
        return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
    }

    renderLayout() {
        return (
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppTitle}>
                        ChatApp
                    </div>
                    <div className={styles.AppRoom}>
                        App room
                    </div>
                </div>
                <div className={styles.AppBody}>
                    <UsersList name={this.state.name} users={this.state.users}/>
                    <div className={styles.MessageWrapper}>
                        <MessageList messages={this.state.messages}/>
                        <MessageForm onMessageSubmit={message => this.handleMessageSubmit(message)}
                                     name={this.state.name}/>
                    </div>
                </div>
            </div>
        )
    }

    renderUserForm() {
        return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)}/>)
    }
}

export default hot(module)(App);