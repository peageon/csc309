import React from "react";
import './styles.css';
import Header from "../Header";
import ProjectDetailDetail from "../ProjectDetailDetail";
import { createProject } from "../../actions/project";
import {withRouter} from "react-router-dom";

/** The project detail screen. 
*/
class CreateProject extends React.Component {

    render() {

        return (
            <React.Fragment>
                <Header state={this.props.state} />
                <div>
                    <div className="projectdetail__left" />
                    <div className="projectdetail__centre">
                        <ProjectDetailDetail projectDetails={{}} 
                                                editing={true} 
                                                onUpdate={(deets) => createProject(deets, () => this.props.history.push('/projects'))}
                                                poster={this.props.state.username} />
                    </div>
                    <div className="projectdetail__right" />
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CreateProject);