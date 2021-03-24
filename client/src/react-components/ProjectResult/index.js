import React from "react";
import '../../App.css';
import './styles.css';
import {getProfilePic} from "../../actions/user";
import {Link} from 'react-router-dom';

class ProjectResult extends React.Component {

    render() {
        const profilePicPath = getProfilePic(this.props.username); // this method makes a server call
        const projectId = this.props.project._id;
        const details = this.props.project
        return (
            <li className="projectresult">
                <div>
                <Link to={`/project/${projectId}`}>
                    <img src={profilePicPath} className="projectresult__pic" alt="profile-pic" />
                    <span className="projectresult__projectname">{details.title}</span>
                    <span className="projectresult__skills">{details.requiredSkills.join(", ")}</span>
                    <span className="projectresult__difficulty">{details.difficulty}</span>
                </Link>
                </div>
            </li>
        );
    }
}

export default ProjectResult;