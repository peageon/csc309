import React from "react";
import './styles.css';
import {Link} from 'react-router-dom';

/** The user search screen. */
class ProjectDetailContact extends React.Component {

    render() {
        
        const poster = this.props.poster;
        return (
            <div className="projectdetailcontact">
                Get in touch with <em>{poster.username}</em>
                <br />
                <Link to="/chat" className="projectdetailcontact__message">Message</Link>
            </div>
        );
    }
}

export default ProjectDetailContact;