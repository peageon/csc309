import React from 'react';
import '../../App.css';
import './styles.css';
import {v4 as uid} from 'uuid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FilterListIcon from '@material-ui/icons/FilterList';
import { MenuItem, Input, Checkbox} from '@material-ui/core';
import { getAvailableSkills, getAvailableDifficulties, getAvailableCourses } from '../../actions/domainData';


/** The filters component for the project search screen.
 * props: onSubmit: a function to be called when the project applies their filters,
 *        which takes the new filter values as an argument
 */
class ProjectFilters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            difficulty: "Beginner",
            skills: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Source: React website tutorial.
     */
    handleChange(event) {
        const target = event.target;
        let value;
        if (target.type === 'checkbox') {
            value = target.checked;
        } else if (target.type === 'select-multiple') {
            value = Array.from(target.selectedOptions).map(option => option.value);
        } else {
            value = target.value;
        }
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
        console.log("Filters updated.");
    }

    render() {
        /*from material UI material-ui.com/components/text-fields/*/
        const useStyles = makeStyles(theme => ({
            root: {
                '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
                },
            },
        }));

        // TODO: get these from backend
        const availableSkills = getAvailableSkills();
        const availableDifficulties = getAvailableDifficulties();

        return (
            <div className="projectfilters">
                <h2>Filters</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="projectfilters__filter">
                        <label>
                            <span className="projectfilters__filterTitle" >Difficulty </span>
                            <Select name="difficulty" onChange={this.handleChange} value={this.state.difficulty}>
                                {availableDifficulties.map(difficulty => <MenuItem key={uid()} value={difficulty}>{difficulty}</MenuItem>)}
                            </Select>
                        </label>
                    </div>
                    <div className="projectfilters__filter">
                        <label>
                            <span className="projectfilters__filterTitle" >Skills </span>
                            <Select name="skills" size={3} multiple onChange={this.handleChange} value={this.state.skills}>
                                {availableSkills.map(skill => <MenuItem key={uid()} value={skill}>{skill}</MenuItem>)}
                            </Select>
                        </label>
                    </div>
                    {/* <div className="projectfilters__filter">
                        <label>
                            Courses
                            <select name="courses" size={3} multiple onChange={this.handleChange} value={this.state.courses}>
                                {availableCourses.map(course => <option key={uid()} value={course}>{course}</option>)}
                            </select>
                        </label>
                    </div> */}
                    <div className="projectfilters__filter__button">
                        <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<FilterListIcon />}
                        >
                        Apply Filters
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ProjectFilters;