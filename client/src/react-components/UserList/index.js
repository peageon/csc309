import React from "react";
import '../../App.css';
import './styles.css';
import UserResult from "../UserResult";

class UserList extends React.Component {

    render() {

        return (
            <ul className="userlist">
                {this.props.results.map(user => <UserResult key={user.username} user={user} />)}
            </ul>
        );
    }
}

export default UserList;