import React from "react";
import './styles.css';
import { getProfilePic, getPosterData } from "../../actions/user";
import {Link} from 'react-router-dom';

/** Compnent with the details of who posted the project. 
 * Props: project id.
*/
class ProjectDetailPoster extends React.Component {

    render() {
        const username = this.props.poster.username;
        const profilePicPath = getProfilePic(username); // server call
        const posterData = this.props.poster; // server call
        return (
            <div className="projectdetailposter">
                <div className="projectdetailposter__title">Posted By</div>
                <Link to={`/users/${username}`} >
                    <div className="projectdetailposter__user">
                        <img src={profilePicPath} className="projectdetailposter__userimage" alt="profile-pic" />
                        <span className="projectdetailposter__username">{username}</span>
                    </div>
                </Link>
                <div className="projectdetailposter__item">
                    <div className="projectdetailposter__heading">Year:</div>
                    {posterData.year}{posterData.PEY && " + PEY"}
                </div>
                <div className="projectdetailposter__item">
                    <div className="projectdetailposter__heading">Skills:</div>
                    {posterData.skills}
                </div>
                <div className="projectdetailposter__item">
                    <div className="projectdetailposter__heading">Interests:</div>
                    {posterData.interests}
                </div>
            </div>
        );
    }
}

export default ProjectDetailPoster;