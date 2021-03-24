import React from "react";
import '../../App.css';
import './styles.css';
import ProjectResult from "../ProjectResult";

class ProjectList extends React.Component {

    render() {
        return (
            <ul className="projectlist">
                {this.props.results.map(project => <ProjectResult key={project._id} project={project} />)}
            </ul>
        );
    }
}

export default ProjectList;