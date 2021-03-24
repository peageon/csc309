import React from "react";
import './styles.css';
import Header from "../Header";
import ProjectDetailDetail from "../ProjectDetailDetail";
import ProjectDetailPoster from "../ProjectDetailPoster";
import ProjectDetailContact from '../ProjectDetailContact';
import { getProjectDetails, updateProject } from "../../actions/project";
import {withRouter} from 'react-router-dom';
import { getUserProfile } from "../../actions/user";

/** The project detail screen. 
*/
class ProjectDetail extends React.Component {

    constructor(props) {
        super(props);
        this.extractProjectId = this.extractProjectId.bind(this);
        this.state = {
            projectDetails: {
                title: "",
                description: "",
                peopleDescription: "",
                additional: "",
                requiredSkills: [],
                // requiredCoureses: [],
                difficulty: "",
                poster: this.props.state.username
            },
            posterDetails: {
                username: ""
            }
        }
    }

    /**
     * Extract project id from the URL
     */
    extractProjectId() {
        return this.props.match.params.projectId;
    }

    componentDidMount() {
        const projectId = this.extractProjectId();
        const updatePoster = () => {
            getUserProfile(this.state.projectDetails.poster).then((poster) => {
                this.setState({posterDetails: poster})
            })
        }

        getProjectDetails(projectId, (projectDetails) => {
            this.setState({projectDetails: projectDetails}, updatePoster);
        }); // call to server
    }

    render() {
        const projectId = this.extractProjectId();
        const userIsOwner = this.state.projectDetails.poster === this.props.state.username || this.props.state.username === 'admin';
        const onUpdate = (details) => {
            updateProject(projectId, details) // call to server
        }

        return (
            <React.Fragment>
                <Header state={this.props.state} />
                <div>
                    <div className="projectdetail__left">
                        <ProjectDetailPoster poster={this.state.posterDetails} />
                    </div>
                    <div className="projectdetail__centre">
                        <ProjectDetailDetail projectDetails={this.state.projectDetails} projectId={projectId} editing={userIsOwner} onUpdate={onUpdate} />
                    </div>
                    <div className="projectdetail__right">
                        {!userIsOwner && <ProjectDetailContact poster={this.state.posterDetails} />}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(ProjectDetail);