import React from "react";
import '../../App.css';
import './styles.css';
import {getProfilePic, getUserProfile} from "../../actions/user";
import {Link} from 'react-router-dom';

class UserResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: 0,
            username: this.props.user.username,
            pey: false,
            skills: []
        }
    }

    componentDidMount() {
        getUserProfile(this.props.user.username).then((user) => {
            this.setState({
                year: user.year,
                pey: user.pey,
                skills: user.skills
            });
        });
    }

    render() {
        const profilePicPath = getProfilePic(this.props.username);

        const user = this.state;
        const yearText = (user.year || "unknown") + (user.pey ? " + PEY" : "");
        return (
            <li className="userresult">
                <div>
                    <Link to={`/users/${user.username}`}>
                        <img src={profilePicPath} className="userresult__pic" alt="profile-pic" />
                        <span className="userresult__username">{user.username}</span>
                        <span className="userresult__skills">{user.skills.join(", ")}</span>
                        <span className="userresult__year">Year {yearText}</span>
                    </Link>
                </div>
            </li>
        );
    }
}

export default UserResult;