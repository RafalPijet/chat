import React from 'react';
import styles from './UsersList.css';

const UsersList = props => (
    <div className={styles.Users}>
        <div className={styles.UsersOnline}>
            {props.users.length} people online
        </div>
        <p className={styles.UserItemMain}>{props.name}</p>
        <ul className={styles.UsersList}>
            {
                props.users.map((user) => {

                    if (user.name !== props.name) {
                        return (
                            <li key={user.id} className={styles.UserItem}>
                                {user.name}
                            </li>
                        )
                    }
                })
            }
        </ul>
    </div>
);

export default UsersList;