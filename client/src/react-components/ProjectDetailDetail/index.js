import React from "react";
import './styles.css';
import { flagProject } from "../../actions/project";
import {Button, Select, MenuItem} from '@material-ui/core';
import { getAvailableSkills, getAvailableDifficulties } from "../../actions/domainData";

/** Compnent with the main details of a project. 
 * Props: project id.
 * Editing: true iff the project is being edited
 * onUpdate: a callback that for when a user is finished editing.
 *          the function will be given an object {title, description, peopleDescription, additional}
*/
class ProjectDetailDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            title: "",
            description: "", 
            peopleDescription: "",
            additional: "",
            requiredSkills: [],
            difficulty: "",
            poster: this.props.poster,
            flagged: false
        }
        this.handleSave = this.handleSave.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleFlag = this.handleFlag.bind(this)
    }

    handleSave(event) {
        event.preventDefault();
        const newobj = 
        this.props.onUpdate && this.props.onUpdate(this.state);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    handleFlag() {
        const projectId = this.props.projectId;
        flagProject(projectId)
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            title: newProps.projectDetails.title,
            description: newProps.projectDetails.description, 
            peopleDescription: newProps.projectDetails.peopleDescription,
            additional: newProps.projectDetails.additional,
            requiredSkills: newProps.projectDetails.requiredSkills || [],
            difficulty: newProps.projectDetails.difficulty,
            poster: newProps.projectDetails.poster
        })
    }

    render() {

        const availableSkills = getAvailableSkills();
        const availableDifficulties = getAvailableDifficulties();
        const editing = !!this.props.editing

        return (
            <div className="projectdetaildetail">
                <div className="projectdetaildetail__title" >
                    {editing ? 
                        <input value={this.state.title} 
                                    onChange={this.handleChange} 
                                    placeholder="Title..." 
                                    name="title" />
                        :
                        <h1>{this.state.title}</h1>
                    }
                </div>
                <div className="projectdetaildetail__body">
                    <div className="projectdetaildetail__item">
                        <h3>Project Description (Required)</h3>
                        {editing ? 
                        <textarea value={this.state.description} 
                                    onChange={this.handleChange} 
                                    name="description" />
                        :
                        this.state.description
                        }
                    </div>
                    <div className="projectdetaildetail__item">
                        <h3>Who I'm Looking For (Required)</h3>
                        {editing ?
                            <textarea value={this.state.peopleDescription}
                                        onChange={this.handleChange}
                                        name="peopleDescription" />
                            :
                            this.state.peopleDescription
                        }
                    </div>
                    <div className="projectdetaildetail__item">
                        <h3>Required Skills</h3>
                        {editing ? 
                            <Select name="requiredSkills" multiple onChange={this.handleChange} value={this.state.requiredSkills}>
                                {availableSkills.map(skill => <MenuItem key={skill} value={skill}>{skill}</MenuItem>)}
                            </Select>
                            :
                            this.state.requiredSkills.join(', ')
                        }
                    </div>
                    <div className="projectdetaildetail__item">
                        <h3>Difficulty (Required)</h3>
                        {editing ? 
                            <Select required name="difficulty" size={3} onChange={this.handleChange} value={this.state.difficulty}>
                                {availableDifficulties.map(difficulty => <MenuItem key={difficulty} value={difficulty}>{difficulty}</MenuItem>)}
                            </Select>
                            :
                            this.state.difficulty
                        }
                    </div>
                    <div className="projectdetaildetail__item">
                        <h3>Additional Details</h3>
                        {editing ? 
                            <textarea value={this.state.additional} 
                                        onChange={this.handleChange} 
                                        name="additional" />
                            :
                            this.state.additional
                        }
                    </div>
                    <div>
                        {editing ? 
                            <Button 
                                onClick={this.handleSave}
                                type="submit"
                                variant="contained"
                                color="primary"
                                >
                                    Save
                                </Button>
                            :
                            <Button 
                                onClick={this.handleFlag}
                                type="submit"
                                variant="contained"
                                color="primary"
                                >
                                    Flag Project as Inappropriate
                                </Button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectDetailDetail;